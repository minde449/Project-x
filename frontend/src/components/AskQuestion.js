import { useNavigate } from "react-router";

const AskQuestion = ({}) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "ask";

    navigate(path);
  };

  return (
    <div className="ask-question-wrapper" onClick={routeChange}>
      <span>Ask Question</span>
    </div>
  );
};

export default AskQuestion;
