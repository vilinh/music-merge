import React, { createContext, useReducer, useEffect } from "react";
import MergeReducer from "./MergeReducer";

const initialState = {
  mergeList: localStorage.getItem("mergeList")
    ? JSON.parse(localStorage.getItem("mergeList"))
    : [],
};

export const MergeContext = createContext(initialState);

export const MergeProvider = (props) => {
  const [state, dispatch] = useReducer(MergeReducer, initialState);

  useEffect(() => {
    localStorage.setItem("mergeList", JSON.stringify(state.mergeList));
  }, [state]);

  const addSongtoMerge = (song) => {
    dispatch({ type: "ADD_SONG_TO_MERGE", payload: song });
  };

  const removeSongFromMerge = (id) => {
    dispatch({ type: "REMOVE_SONG_FROM_MERGE", payload: id });
  };

  const clearMerge = () => {
    dispatch({ type: "CLEAR_MERGE" });
  };

  return (
    <MergeContext.Provider
      value={{
        mergeList: state.mergeList,
        addSongtoMerge,
        removeSongFromMerge,
        clearMerge
      }}
    >
      {props.children}
    </MergeContext.Provider>
  );
};
