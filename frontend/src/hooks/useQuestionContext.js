import { QuestionsContext } from "../context/QuestionContext";
import { useContext } from "react";

export const useQuestionsContext = () => {
  const context = useContext(QuestionsContext);

  if (!context) {
    throw Error(
      "useQuestionsContext must be used inside an QuestionsContextProvider"
    );
  }

  return context;
};
