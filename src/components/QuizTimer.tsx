import { useEffect, useState } from "react";
import { IQuizTimer } from "../types";

const QuizTimer = ({ timeLimit, onTimeExpired }: IQuizTimer) => {
  const [seconds, setSeconds] = useState(() => {
    const savedSeconds = localStorage.getItem("timerSeconds");
    return savedSeconds !== null ? parseInt(savedSeconds, 10) : timeLimit;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(timer);
        onTimeExpired();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onTimeExpired]);

  useEffect(() => {
    localStorage.setItem("timerSeconds", seconds.toString());
  }, [seconds]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return <h3>{formatTime(seconds)}</h3>;
};

export default QuizTimer;
