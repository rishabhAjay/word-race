import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, loadUser } from "../../actions/authActions";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./layout.module.css";
const Navbar = (props) => {
  const { loadUser, user, logoutUser } = props;
  useEffect(() => {
    loadUser();
  }, []);
  const onLogout = () => {
    logoutUser();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={styles.appBar} position="static">
        <Toolbar>
          <Typography
            fontSize="large"
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bolder" }}
          >
            Word Race
          </Typography>
          <Typography
            style={{ margin: "0 13px 0 13px" }}
            variant="h6"
            sx={{ color: "white" }}
          >
            <strong>{user && user[0].username} &nbsp;</strong>
          </Typography>

          <Button onClick={onLogout}>
            <Typography
              variant="body"
              sx={{ backgroundColor: "white", color: "black" }}
            >
              &nbsp;Logout&nbsp;
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { logoutUser, loadUser })(Navbar);
