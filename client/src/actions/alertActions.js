import { SET_ALERT, SET_OPEN } from "../actions/types.js";
import { v4 as uuid } from "uuid";

export const setOpen = (alertFlag) => {
  return (dispatch) => {
    dispatch({ type: SET_OPEN, payload: alertFlag });
  };
};
export const setAlert = (msg, type) => {
  return (dispatch) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
  };
};
