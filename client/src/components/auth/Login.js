import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { clearErrors, loginUser } from "../../actions/authActions.js";
import { setAlert, setOpen } from "../../actions/alertActions.js";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

const Login = (props) => {
  const { isAuthenticated, clearErrors, error, loginUser, setAlert, setOpen } =
    props;
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const { username, email } = user;
  let navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      //this is how you redirect in react
      navigate("/");
    }
    if (error === "Invalid credentials") {
      setAlert(error, "error");
      setUser({ username: "", email: "" });
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || username === "") {
      setAlert("Please enter the details", "danger");
    } else {
      const formData = {
        username,
        email,
      };
      loginUser(formData);
    }
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.authContainer}>
      <Avatar
        className={styles.logo}
        alt="logo"
        src="images/logo.webp"
        sx={{ width: 230, height: 230 }}
      />
      <Typography className={styles.authHeader} variant="h4" gutterBottom>
        LOGIN
      </Typography>
      <div className={styles.authCard}>
        <Card
          sx={{
            maxWidth: 330,
            backgroundColor: "#dedede",
          }}
        >
          <CardContent>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              autoComplete="off"
              onSubmit={onSubmit}
            >
              <TextField
                type="text"
                label="Userame"
                variant="outlined"
                name="username"
                value={username}
                onChange={onChange}
                required
              />
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />

              <CardActions>
                <Button
                  className={styles.btn}
                  type="submit"
                  value="Login"
                  size="small"
                >
                  Send
                </Button>
              </CardActions>
              <Link to="/register">
                <Typography
                  className={styles.authText}
                  variant="body2"
                  component="div"
                  gutterBottom
                >
                  Not Registered? Sign-up
                </Typography>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,

  error: state.auth.error,
  clearErrors: state.auth.clearErrors,
});
export default connect(mapStateToProps, {
  loginUser,
  setAlert,
  clearErrors,
  setOpen,
})(Login);
//loginUser, error, clearErrors, isAuthenticated
