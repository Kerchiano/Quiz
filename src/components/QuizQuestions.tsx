import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import QuizResults from "./QuizResults";
import { useNavigate, useParams } from "react-router-dom";
import QuizTimer from "./QuizTimer";
import { IQuiz } from "../types";

const QuizQuestions = () => {
  const { quizTitle } = useParams();
  const storedData: string | null = localStorage.getItem("storedData");
  const QuizQuestionsData: Array<IQuiz> = storedData
    ? JSON.parse(storedData)
    : [];
  const index = QuizQuestionsData.findIndex((quiz) => quiz.title === quizTitle);
  const questionsData = QuizQuestionsData[index].questions;
  const navigate = useNavigate();

  const mainPage = () => {
    navigate(`/main-page`);
    localStorage.removeItem("score");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("timerSeconds");
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    () => {
      const savedIndex = localStorage.getItem("currentQuestionIndex");
      return savedIndex !== null ? parseInt(savedIndex) : 0;
    }
  );

  const [score, setScore] = useState<number>(() => {
    const savedScore = localStorage.getItem("score");
    return savedScore !== null ? parseInt(savedScore) : 0;
  });

  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    if (currentQuestionIndex < questionsData.length) {
      shuffleOptions();
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    localStorage.setItem(
      "currentQuestionIndex",
      currentQuestionIndex.toString()
    );
  }, [currentQuestionIndex]);

  useEffect(() => {
    localStorage.setItem("score", score.toString());
  }, [score]);

  const shuffleOptions = () => {
    const currentQuestion = questionsData[currentQuestionIndex];
    const options: string[] = [
      ...currentQuestion.incorrectAnswers,
      currentQuestion.correctAnswer,
    ];
    for (let i = options.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
    setSelectedOption("");
  };

  const handleNextQuestion = () => {
    if (selectedOption === questionsData[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleTimeExpired = () => {
    setQuizCompleted(true);
  };

  return (
    <>
      {currentQuestionIndex !== questionsData.length && !quizCompleted ? (
        <div className="flex flex-col items-start m-auto w-2/4 gap-5">
          <h2>Quiz 1</h2>
          <div className="flex justify-between w-full">
            <h3>{`Question ${currentQuestionIndex + 1} of ${
              questionsData.length
            }`}</h3>
            <QuizTimer timeLimit={30} onTimeExpired={handleTimeExpired} />
          </div>
          <p>{questionsData[currentQuestionIndex].question}</p>
          <ul className="w-full">
            {shuffledOptions.map((option, index) => (
              <li
                className={`bg-slate-200 border-b w-full border-white flex items-center gap-2 p-2 ${
                  option === selectedOption ? "bg-blue-500" : ""
                }`}
                key={index}
              >
                <input
                  className="cursor-pointer"
                  type="radio"
                  name={`option-${currentQuestionIndex}`}
                  id={`option-${index}`}
                  checked={option === selectedOption}
                  onChange={() => handleOptionChange(option)}
                />
                <span>{option}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between w-full">
            <button
              className="bg-green-600 rounded-custom p-2 pr-4 pl-4 text-white flex items-center justify-center"
              onClick={handleNextQuestion}
            >
              <span>Next</span>
              <ChevronRight />
            </button>
            <button
              onClick={mainPage}
              className="p-2 pr-4 pl-4 text-white bg-blue-400 rounded-custom"
            >
              Main Page
            </button>
          </div>
        </div>
      ) : (
        <QuizResults
          numOfQuestions={currentQuestionIndex}
          correctAnswers={score}
        />
      )}
    </>
  );
};

export default QuizQuestions;
