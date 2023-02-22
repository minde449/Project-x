import { useState } from "react";
import { useQuestionsContext } from "../hooks/useQuestionContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const AnswerQuestionForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useQuestionsContext();
  const [text, setAnswerText] = useState("");
  const [error, setError] = useState(null);
  const [author] = useState(user.email);
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const answer = {
      answers: [
        {
          text,
          author,
        },
      ],
    };

    const response = await fetch("/api/questions/" + params.id + "/answer", {
      method: "POST",
      body: JSON.stringify(answer),

      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setAnswerText("");
      setError(null);
      dispatch({ type: "SET_ANSWER", payload: json });
    }
  };

  return (
    <form className="answer-question" onSubmit={handleSubmit}>
      <h3>Answer a question</h3>

      <input
        type="string"
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder="Type in your answer"
        value={text}
      />

      <button>Send answer</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AnswerQuestionForm;
