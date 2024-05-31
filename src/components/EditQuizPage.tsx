import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IQuestion, IQuiz } from "../types";

const EditQuizPage = () => {
  const { quizTitle } = useParams<{ quizTitle: string }>();
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const navigate = useNavigate();
  const mainPage = () => {
    navigate(`/quiz/`);
  };

  useEffect(() => {
    const storedData: string | null = localStorage.getItem("storedData");
    const quizzes: IQuiz[] = storedData ? JSON.parse(storedData) : [];
    const quizToEdit = quizzes.find((q) => q.title === quizTitle);
    setQuiz(quizToEdit || null);
  }, [quizTitle]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuiz((prevQuiz) =>
      prevQuiz ? { ...prevQuiz, title: e.target.value } : prevQuiz
    );
  };

  const handleQuestionChange = (
    index: number,
    field: keyof IQuestion,
    value: string
  ) => {
    setQuiz((prevQuiz) => {
      if (!prevQuiz) return prevQuiz;
      const updatedQuestions = [...prevQuiz.questions];
      if (field === "incorrectAnswers") {
        updatedQuestions[index][field] = value.split(", ");
      } else {
        updatedQuestions[index][field] = value;
      }
      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  const handleAddQuestion = () => {
    setQuiz((prevQuiz) => {
      if (!prevQuiz) return prevQuiz;
      const newQuestion: IQuestion = {
        question: "",
        correctAnswer: "",
        incorrectAnswers: [""],
      };
      return { ...prevQuiz, questions: [...prevQuiz.questions, newQuestion] };
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuiz((prevQuiz) => {
      if (!prevQuiz) return prevQuiz;
      const updatedQuestions = prevQuiz.questions.filter(
        (_, qIndex) => qIndex !== index
      );
      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  const handleSaveQuiz = () => {
    const storedData: string | null = localStorage.getItem("storedData");
    const quizzes: IQuiz[] = storedData ? JSON.parse(storedData) : [];
    const updatedQuizzes = quizzes.map((q) => (q.id === quiz?.id ? quiz : q));
    localStorage.setItem("storedData", JSON.stringify(updatedQuizzes));
    mainPage();
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-2/4 below-md:w-full below-lg:w-4/5 items-center justify-center m-auto">
      <h1>Edit Quiz</h1>
      <div className="rounded-custom p-5 w-full">
        <input
          className="text-center p-2 border border-black rounded-custom mb-2 w-full"
          type="text"
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={handleTitleChange}
        />
        {quiz.questions.map((q, index) => (
          <div
            className="flex flex-col border rounded-sm p-5 mb-2 border-black inputQuiz"
            key={index}
          >
            <div className="flex items-center justify-between h-10 mb-1">
              <span className="">Question {index + 1}</span>
              <button
                onClick={() => handleRemoveQuestion(index)}
                className="h-8 pl-2 pr-2 rounded-md bg-red-500 text-white"
              >
                Remove
              </button>
            </div>
            <input className="mb-2 p-2 border border-black rounded"
              type="text"
              placeholder="Question"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
            />
            <input className="mb-2 p-2 border border-black rounded"
              type="text"
              placeholder="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswer", e.target.value)
              }
            />
            <input className="mb-2 p-2 border border-black rounded"
              type="text"
              placeholder="Incorrect Answers (comma separated)"
              value={q.incorrectAnswers.join(", ")}
              onChange={(e) =>
                handleQuestionChange(index, "incorrectAnswers", e.target.value)
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
          onClick={handleSaveQuiz}
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default EditQuizPage;
