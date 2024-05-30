import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import QuizQuestions from "./components/QuizQuestions";
import MainPage from "./components/MainPage";
import EditQuizPage from "./components/EditQuizPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="quiz/questions/:quizTitle" element={<QuizQuestions />} />
          <Route path="quiz/main-page" element={<MainPage />} />
          <Route path="quiz/edit-quiz/:quizTitle" element={<EditQuizPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
