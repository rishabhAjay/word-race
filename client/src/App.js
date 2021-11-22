import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import MainGame from "./components/gameComponents/MainGame.js";
import Home from "./components/pages/Home";
import Leaderboard from "./components/pages/Leaderboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import Notif from "./components/layout/Notif";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/gamestart"
            element={
              <PrivateRoute>
                <MainGame />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <Leaderboard />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </Router>
      <Notif />
    </Provider>
  );
}

export default App;
