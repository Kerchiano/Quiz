import { useState } from "react";
import QuizList from "./QuizList";
import AddQuizForm from "./AddQuizForm";
import questionsJsonData from "../questions.json";
import { IQuiz } from "../types";

const MainPage = () => {
  const storedData: string | null = localStorage.getItem("storedData");
  let checkStoredData = storedData ? JSON.parse(storedData) : null;
  if (checkStoredData === null) {
    localStorage.setItem("storedData", JSON.stringify(questionsJsonData));
    checkStoredData = storedData ? JSON.parse(storedData) : null;
  }
  const [quizzes, setQuizzes] = useState<IQuiz[]>(checkStoredData);

  const addQuiz = (newQuiz: IQuiz) => {
    setQuizzes([...quizzes, newQuiz]);
  };

  const removeQuiz = (id: number) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    localStorage.setItem("storedData", JSON.stringify(updatedQuizzes));
    setQuizzes(updatedQuizzes);
  };
  return (
    <>
      <div className="flex flex-row-reverse flex-wrap justify-between w-full">
        <div className="flex-1 xs:min-w-100">
          <h1>Quizzes</h1>
          <QuizList quizzes={quizzes} removeQuiz={removeQuiz} />
        </div>
        <div className="flex-1 xs:min-w-100">
          <AddQuizForm addQuiz={addQuiz} />
        </div>
      </div>
    </>
  );
};

export default MainPage;
