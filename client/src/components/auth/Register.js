import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { clearErrors, registerUser } from "../../actions/authActions.js";
import { setAlert } from "../../actions/alertActions.js";

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
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const { isAuthenticated, clearErrors, error, registerUser, setAlert } = props;
  const { username, email } = user;
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error === "User with that email or username already exists") {
      setAlert(error, "error");
      setUser({ username: "", email: "" });
      clearErrors();
    }
  }, [isAuthenticated, error, props.history]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (username === "" || email === "") {
      console.log("Please enter details");
      setAlert("Please enter the details", "error");
    } else {
      const formData = {
        username,
        email,
      };
      registerUser(formData);
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
        REGISTER
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
                  value="Register"
                  size="small"
                >
                  Send
                </Button>
              </CardActions>
              <Link to="/login">
                <Typography
                  className={styles.authText}
                  variant="body2"
                  component="div"
                  gutterBottom
                >
                  Already Registered? Sign-in
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
  registerUser,
  setAlert,
  clearErrors,
})(Register);
