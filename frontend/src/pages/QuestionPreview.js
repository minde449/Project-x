import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuestionsContext } from "../hooks/useQuestionContext";
import QuestionDetails from "../components/QuestionDetails";
import QuestionAnswers from "../components/QuestionAnswers";

const QuestionPreview = () => {
  const params = useParams();

  const { question, dispatch } = useQuestionsContext();
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/questions/" + params.id);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_QUESTION", payload: json });
      }
    };

    fetchQuestions();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="questions">
        <h3>Question</h3>
        {question && <QuestionDetails key={question._id} question={question} />}
        <QuestionAnswers question={question} />
      </div>
    </div>
  );
};

export default QuestionPreview;
