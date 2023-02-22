import { createContext, useReducer } from "react";

export const QuestionsContext = createContext();

export const questionsReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        questions: action.payload,
      };
    case "SET_QUESTION":
      return {
        question: action.payload,
      };
    case "CREATE_QUESTION":
      return {
        questions: [action.payload, ...state.questions],
      };
    case "SET_ANSWER":
      return {
        question: { ...action.payload },
      };
    case "DELETE_QUESTION":
      return {
        questions: state.questions.filter((w) => w._id !== action.payload._id),
      };

    case "DELETE_ANSWER":
      return {
        question: {
          ...state.payload,
          answers: state.payload?.answers.filter(
            (w) => w._id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export const QuestionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionsReducer, {
    questions: null,
  });

  return (
    <QuestionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuestionsContext.Provider>
  );
};
