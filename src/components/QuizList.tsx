import { ChangeEvent, useState } from "react";
import { IQuizzesItemProps } from "../types";
import QuizItem from "./QuizItem";

const QuizList = ({ quizzes, removeQuiz }: IQuizzesItemProps) => {
  const [searchQuiz, setSearchQuiz] = useState("");

  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuiz(e.target.value);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuiz.toLowerCase())
  );

  return (
    <>
      <input
        onChange={handlerInput}
        value={searchQuiz}
        placeholder="Input title quiz"
        className="w-2/3 border rounded-md p-2 pr-4 pl-4 mt-2 mb-2"
        type="text"
      />
      <ul className="flex flex-col items-center gap-3 mt-3">
        {filteredQuizzes.map((quiz) => (
          <QuizItem key={quiz.id} quiz={quiz} removeQuiz={removeQuiz} />
        ))}
      </ul>
    </>
  );
};

export default QuizList;
