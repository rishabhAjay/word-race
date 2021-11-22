import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, loadUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar.js";
import Button from "@mui/material/Button";
import styles from "./Home.module.css";
import InstructionModal from "../layout/InstructionModal";

const Home = (props) => {
  const { loadUser } = props;

  return (
    <>
      <Navbar />
      <div className={styles.homepageDiv}>
        <InstructionModal />

        <Link
          className={styles.homepageLink}
          style={{ backgroundColor: "#18024a" }}
          to="/leaderboard"
        >
          <Button className={styles.homepageBtn} variant="contained">
            Leaderboard
          </Button>
        </Link>
      </div>
    </>
  );
};

export default connect(null, { logoutUser, loadUser })(Home);
