import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IQuizResults } from "../types";

const QuizResults = ({ numOfQuestions, correctAnswers }: IQuizResults) => {
  const navigate = useNavigate();

  const mainPage = () => {
    navigate(`/quiz/`);
    localStorage.removeItem("score");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("timerSeconds");
  };
  return (
    <>
      <div className="h-full flex">
        <div className="h-3/5 below-md:w-4/5 below-sm:pr-0 below-sm:pl-0  pr-10 pl-10 gap-4 flex flex-col items-center justify-center border rounded-md w-2/5 m-auto bg-slate-300">
          <h2>Quiz Results</h2>
          <p>
            Correct Answers: {correctAnswers} of {numOfQuestions}
          </p>
          <p>
            If you want to return to the main page, click the "Back" button.
          </p>
          <button
            onClick={mainPage}
            className="flex p-2 pr-5 pl-5 rounded-md bg-blue-400 text-white"
          >
            Main page <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizResults;
