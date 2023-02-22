import { useQuestionsContext } from "../hooks/useQuestionContext";

const AnswerView = ({ answer }) => {
  const { question, dispatch } = useQuestionsContext();

  const removeAnswer = async () => {
    const response = await fetch(
      "/api/questions/" + question._id + "/answer/" + answer._id,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      dispatch({ type: "DELETE_ANSWER", payload: answer._id });
      window.location.reload();
    }
  };

  return (
    <div className="answer-details">
      <p className="answer-text">{answer.text}</p>
      <p className="answer-author">By: {answer.author}</p>
      <p className="answer-remove" onClick={removeAnswer}>
        Delete
      </p>
    </div>
  );
};

export default AnswerView;
