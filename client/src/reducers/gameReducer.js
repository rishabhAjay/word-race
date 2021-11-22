import {
  SET_RESULTS,
  GET_LEADERBOARD,
  LEADERBOARD_ERROR,
  RESULT_ERROR,
} from "../actions/types.js";

//make the initial state here
const initialState = {
  leaderboard: [],
  score: 1,
  error: "",
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESULTS:
      return {
        ...state,
        score: action.payload,
      };
    case GET_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload,
      };
    case LEADERBOARD_ERROR:
    case RESULT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default gameReducer;
