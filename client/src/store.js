import { createStore, applyMiddleware } from "redux";
//devtools to mainly get the extension working
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//contains the app level state
const initialState = {};

const middleWare = [thunk];

/*any kind of reducer file will be brought in here by the rootReducer
you are also passing the initial state and the devtools function*/
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
