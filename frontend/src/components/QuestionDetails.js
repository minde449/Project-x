import { useQuestionsContext } from "../hooks/useQuestionContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { CiCircleRemove } from "react-icons/ci";
import { useNavigate } from "react-router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const QuestionDetails = ({ question }) => {
  let navigate = useNavigate();

  const { dispatch } = useQuestionsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    const response = await fetch("/api/questions/" + question._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_QUESTION", payload: json });
      window.location.reload();
    }
  };

  return (
    <div
      className="question-details"
      onClick={() => navigate("/questions/" + question._id)}
    >
      <h4 className="question-title">{question.title}</h4>
      <p className="question-description">{question.description}</p>
      <p className="question-created">
        Created by: {question.author}{" "}
        {formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}
      </p>
      {user && user.email === question.author && (
        <CiCircleRemove className="iconSize" onClick={handleClick} />
      )}

      {question.answers.length > 0 && (
        <p className="question-answers">
          {question.answers.length}{" "}
          {question.answers.length === 1 ? "answer" : "answers"}
        </p>
      )}
    </div>
  );
};

export default QuestionDetails;
