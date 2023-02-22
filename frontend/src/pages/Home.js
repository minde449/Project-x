import { useEffect } from "react";
import { useQuestionsContext } from "../hooks/useQuestionContext";
import { useAuthContext } from "../hooks/useAuthContext";

import QuestionDetails from "../components/QuestionDetails";
import AskQuestion from "../components/AskQuestion";

const Home = () => {
  const { questions, dispatch } = useQuestionsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/questions");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_QUESTIONS", payload: json });
      }
    };

    fetchQuestions();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="questions">
        {questions &&
          questions.map((question) => (
            <QuestionDetails key={question._id} question={question} />
          ))}
      </div>

      {user && <AskQuestion />}
    </div>
  );
};

export default Home;
