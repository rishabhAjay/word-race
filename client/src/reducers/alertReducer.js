import { SET_ALERT, SET_OPEN } from "../actions/types.js";
const initialState = {
  details: {},
  open: false,
};
const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    case SET_ALERT:
      //the state an array
      return {
        ...state,
        open: true,
        details: action.payload,
      };

    default:
      return state;
  }
};

export default alertReducer;
