import { useState } from "react";
import { IAddQuize, IQuestion, IQuiz } from "../types";


const AddQuizForm = ({ addQuiz }: IAddQuize) => {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<IQuestion[]>([
    { question: "", correctAnswer: "", incorrectAnswers: [""] },
  ]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof IQuestion,
    value: string
  ) => {
    const newQuestions = [...questions];
    if (field === "incorrectAnswers") {
      newQuestions[index][field] = value.split(", ");
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", correctAnswer: "", incorrectAnswers: [""] },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    const updateQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updateQuestions);
  };

  const handleAddQuiz = () => {
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
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1>Add Quiz</h1>
        <div className="rounded-custom p-5 w-full">
          <input
            className="text-center p-2 border border-black rounded-custom mb-2 w-full"
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={handleTitleChange}
          />
          {questions.map((q, index) => (
            <div
              className="flex flex-col border rounded-sm p-5 mb-2 border-black inputQuiz"
              key={index}
            >
              <div className="flex items-center justify-between h-10 mb-1">
                <span className="">Question {index + 1}</span>
                <button onClick={() => handleRemoveQuestion(index)} className="h-8 pl-2 pr-2 rounded-md bg-red-500 text-white">
                  Remove
                </button>
              </div>
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(index, "correctAnswer", e.target.value)
                }
              />
              <input
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
