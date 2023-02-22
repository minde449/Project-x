import { useState } from "react";
import { useQuestionsContext } from "../hooks/useQuestionContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router";

const QuestionForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useQuestionsContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author] = useState(user.email);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const question = { title, description, author };

    const response = await fetch("/api/questions", {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_QUESTION", payload: json });
      navigate("/");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Ask a question</h3>

      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Description</label>
      <input
        type="string"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <button>Create question</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default QuestionForm;
