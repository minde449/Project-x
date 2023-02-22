import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuestionsContext } from "../hooks/useQuestionContext";
import AnswerView from "../components/Answer";
import AnswerQuestionForm from "../components/AnswerQuestion";

const QuestionAnswers = () => {
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
        {question && question?.answers.length > 0 && <h3>Answers</h3>}

        {question &&
          question.answers.length > 0 &&
          question.answers.map((answer) => {
            return <AnswerView key={answer._id} answer={answer} />;
          })}

        <AnswerQuestionForm />
      </div>
    </div>
  );
};

export default QuestionAnswers;
