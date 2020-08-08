import React, { useReducer } from "react";
import App from "./App";

const ACTION_TYPES = {
  CHANGE_NOTEBOOK: "CHANGE_NOTEBOOK",
  LOGOUT: "LOGOUT",
};

const initialState = {
  notebook: {},
};

const AppContext = React.createContext({ ...initialState });

function appReducer(state: any, action: any) {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_NOTEBOOK:
      let notebook = {
        name: action.payload.name,
        id: action.payload.id,
      };
      return {
        ...state,
        notebook,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function CustContextProvider(props: any) {
  const [state, dispatch] = useReducer(appReducer, { ...initialState });

  function setNotebook(notebook: any) {
    dispatch({ notebook: notebook, type: ACTION_TYPES.CHANGE_NOTEBOOK });
  }

  return (
    <AppContext.Provider
      value={{
        notebook: state.notebook,
        setNotebook,
      }}
      {...props}
    >
      <App />
    </AppContext.Provider>
  );
}

export { AppContext, CustContextProvider };
