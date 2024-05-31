import { useState } from "react";
import { IAddQuize, IQuestion, IQuiz } from "../types";

const AddQuizForm = ({ addQuiz }: IAddQuize) => {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<IQuestion[]>([
    { question: "", correctAnswer: "", incorrectAnswers: [""] },
  ]);
  const [titleError, setTitleError] = useState<string>("");
  const [questionErrors, setQuestionErrors] = useState<
    Array<{ question: string; correctAnswer: string; incorrectAnswers: string }>
  >([{ question: "", correctAnswer: "", incorrectAnswers: "" }]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value) setTitleError("");
  };

  const handleQuestionChange = (
    index: number,
    field: keyof IQuestion,
    value: string
  ) => {
    const newQuestions = [...questions];
    const newErrors = [...questionErrors];

    if (field === "incorrectAnswers") {
      newQuestions[index][field] = value.split(", ");
    } else {
      newQuestions[index][field] = value;
    }

    if (value) {
      newErrors[index][field] = "";
    }

    setQuestions(newQuestions);
    setQuestionErrors(newErrors);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", correctAnswer: "", incorrectAnswers: [""] },
    ]);
    setQuestionErrors([
      ...questionErrors,
      { question: "", correctAnswer: "", incorrectAnswers: "" },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (index === 0) return; // не позволяем удалить первый вопрос
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    const updatedErrors = questionErrors.filter((_, eIndex) => eIndex !== index);
    setQuestions(updatedQuestions);
    setQuestionErrors(updatedErrors);
  };

  const handleAddQuiz = () => {
    let hasError = false;

    if (!title) {
      setTitleError("Please fill in the quiz title.");
      hasError = true;
    }

    const newErrors = questions.map((question) => ({
      question: !question.question ? "Please fill in the question." : "",
      correctAnswer: !question.correctAnswer
        ? "Please fill in the correct answer."
        : "",
      incorrectAnswers: question.incorrectAnswers.some((ia) => !ia)
        ? "Please fill in all incorrect answers."
        : "",
    }));

    if (
      newErrors.some(
        (error) =>
          error.question || error.correctAnswer || error.incorrectAnswers
      )
    ) {
      setQuestionErrors(newErrors);
      hasError = true;
    }

    if (hasError) return;

    const newQuiz = {
      id: Date.now(),
      title,
      questions,
    };
    addQuiz(newQuiz);
    const storedData: string | null = localStorage.getItem("storedData");
    const getStoredData: Array<IQuiz> = storedData
      ? JSON.parse(storedData)
      : [];
    getStoredData.push(newQuiz);
    localStorage.setItem("storedData", JSON.stringify(getStoredData));
    setTitle("");
    setQuestions([{ question: "", correctAnswer: "", incorrectAnswers: [""] }]);
    setQuestionErrors([
      { question: "", correctAnswer: "", incorrectAnswers: "" },
    ]);
    setTitleError("");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1>Add Quiz</h1>
        <div className="rounded-custom p-5 below-sm:pl-0 below-sm:pr-0 w-full">
          <input
            className={`text-center p-2 border ${
              titleError ? "border-red-500" : "border-black"
            } rounded-custom mb-2 w-full`}
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <div className="text-red-500 mb-2">{titleError}</div>}
          {questions.map((q, index) => (
            <div
              className="flex flex-col border rounded-sm p-5 mb-2 border-black"
              key={index}
            >
              <div className="flex items-center justify-between h-10 mb-1">
                <span className="">Question {index + 1}</span>
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveQuestion(index)}
                    className="h-8 pl-2 pr-2 rounded-md bg-red-500 text-white"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                className={`mb-2 p-2 border ${
                  questionErrors[index].question
                    ? "border-red-500"
                    : "border-black"
                } rounded`}
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
              />
              {questionErrors[index].question && (
                <div className="text-red-500 mb-2">
                  {questionErrors[index].question}
                </div>
              )}
              <input
                className={`mb-2 p-2 border ${
                  questionErrors[index].correctAnswer
                    ? "border-red-500"
                    : "border-black"
                } rounded`}
                type="text"
                placeholder="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(index, "correctAnswer", e.target.value)
                }
              />
              {questionErrors[index].correctAnswer && (
                <div className="text-red-500 mb-2">
                  {questionErrors[index].correctAnswer}
                </div>
              )}
              <input
                className={`mb-2 p-2 border ${
                  questionErrors[index].incorrectAnswers
                    ? "border-red-500"
                    : "border-black"
                } rounded`}
                type="text"
                placeholder="Incorrect Answers (comma separated)"
                value={q.incorrectAnswers.join(", ")}
                onChange={(e) =>
                  handleQuestionChange(
                    index,
                    "incorrectAnswers",
                    e.target.value
                  )
                }
              />
              {questionErrors[index].incorrectAnswers && (
                <div className="text-red-500 mb-2">
                  {questionErrors[index].incorrectAnswers}
                </div>
              )}
            </div>
          ))}
          <button
            className="border w-full block mb-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
          <button
            className="border w-full block px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleAddQuiz}
          >
            Add Quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default AddQuizForm;
