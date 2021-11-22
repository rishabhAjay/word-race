import {
  GET_LEADERBOARD,
  SET_RESULTS,
  LEADERBOARD_ERROR,
  RESULT_ERROR,
} from "../actions/types.js";
import axios from "axios";


export const getLeaderboard = () => {
  //in order to specify and dispatch actions, create a function within the action. This will be async since we are handling with the API
  return async (dispatch) => {
    try {
      //setLoading sets the loading state to true
      const res = await axios.get("/wordrace/gamedata");
      dispatch({
        type: GET_LEADERBOARD,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LEADERBOARD_ERROR,
        payload: "An error occured..",
      });
    }
  };
};

export const setResult = (score) => {
  //in order to specify and dispatch actions, create a function within the action. This will be async since we are handling with the API
  return async (dispatch) => {
    try {
      //setLoading sets the loading state to true

      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/wordrace/gamedata", score, config);
      dispatch({
        type: SET_RESULTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: RESULT_ERROR,
        payload: "An error occured..",
      });
    }
  };
};
