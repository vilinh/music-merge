const MergeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SONG_TO_MERGE":
      return {
        ...state,
        mergeList: [action.payload, ...state.mergeList],
      };
    case "REMOVE_SONG_FROM_MERGE":
      return {
        ...state,
        mergeList: state.mergeList.filter((song) => song.id !== action.payload),
      };
    case "CLEAR_MERGE":
      return {
        ...state,
        mergeList: [],
      };
    default:
      return state;
  }
};

export default MergeReducer;
