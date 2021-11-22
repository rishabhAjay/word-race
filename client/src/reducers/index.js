import { combineReducers } from "redux";
import gameReducer from "./gameReducer.js";
import authReducer from "./authReducer.js";
import alertReducer from "./alertReducer.js";
//combine the reducers and pass it to the store
export default combineReducers({
  game: gameReducer,
  auth: authReducer,
  alerts: alertReducer,
});
