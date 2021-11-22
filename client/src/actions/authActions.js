import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../actions/types.js";
import setAuthToken from "../utils/SetAuthToken.js";
import axios from "axios";
export const loadUser = () => {
  return async (dispatch) => {
    //add the token header if it exists
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      //load the logged in user details from the token
      const res = await axios.get(
        "https://word-race2.herokuapp.com/wordrace/auth"
      );

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };
};

//register user

export const registerUser = (formData) => {
  return async (dispatch) => {
    //add content type header for the api
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //put the html form data
      const res = await axios.post(
        "https://word-race2.herokuapp.com/wordrace/user",
        formData,
        config
      );
      //payload is the token
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      //you want to login the user after registering
      loadUser();
    } catch (err) {
      //err message from the backend
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };
};

//login user
export const loginUser = (formData) => {
  return async (dispatch) => {
    //add content type header for the api
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //put the html form data
      const res = await axios.post(
        "https://word-race2.herokuapp.com/wordrace/auth",
        formData,
        config
      );
      //payload is the token
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      //you want to login the user after registering
      loadUser();
    } catch (err) {
      //err message from the backend
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };
};

//logout
export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};
//clear errors
export const clearErrors = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
};
