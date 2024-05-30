import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { IQuizItemProps } from "../types";

const QuizItem = ({ quiz, removeQuiz }: IQuizItemProps) => {
  const navigate = useNavigate();

  const startQuiz = (e: MouseEvent<HTMLLIElement>) => {
    if ((e.target as HTMLElement).tagName === "BUTTON") {
      e.stopPropagation();
      return;
    }

    navigate(`/questions/${quiz.title}`);
  };

  const editQuiz = () => {
    navigate(`/edit-quiz/${quiz.title}`);
  };
  return (
    <>
      <li
        onClick={startQuiz}
        className="h-14 flex pl-5 pr-5 cursor-pointer text-white items-center justify-between bg-slate-400 rounded-md w-2/3"
      >
        <span className="text-lg">{quiz.title}</span>
        <div className="flex gap-4">
          <button
            onClick={editQuiz}
            className="bg-blue-400 p-4 pt-2 pb-2 text-white rounded-lg"
          >
            Edit
          </button>
          <button
            className="p-4 pt-2 pb-2 rounded-md bg-red-500 text-white"
            onClick={() => removeQuiz(quiz.id)}
          >
            Remove
          </button>
        </div>
      </li>
    </>
  );
};

export default QuizItem;
