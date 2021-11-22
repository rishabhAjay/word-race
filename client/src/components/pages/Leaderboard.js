import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alertActions";
import { loadUser } from "../../actions/authActions";
import { getLeaderboard } from "../../actions/gameActions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";

import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";
import styles from "./Leaderboard.module.css";

const Leaderboard = (props) => {
  const { loadUser, getLeaderboard, leaderboard, error, setAlert } = props;

  useEffect(() => {
    getLeaderboard();
  }, []);

  useEffect(() => {
    if (error === "An error occured..") {
      setAlert(error, "danger");
    }
  }, [error]);

  return (
    <div>
      <Navbar />

      <div className={styles.leaderboardDiv}>
        <Typography
          style={{ marginTop: "2%", color: "white" }}
          variant="h4"
          component="div"
          gutterBottom
        >
          LEADERBOARD(TOP 10)
        </Typography>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={styles.tableCell} align="center">
                  Player Name
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Max Score
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Average of All Games
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Total Games Played
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((ele) => (
                <TableRow
                  key={ele._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    <strong>{ele.user}</strong>
                  </TableCell>
                  <TableCell align="center"> {ele.maxscore}</TableCell>
                  <TableCell align="center"> {ele.average}</TableCell>
                  <TableCell align="center"> {ele.result.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Link className={styles.homeLink} to="/">
          <Button className={styles.homeBtn}>Home</Button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  leaderboard: state.game.leaderboard,
  error: state.game.error,
});
export default connect(mapStateToProps, { getLeaderboard, loadUser, setAlert })(
  Leaderboard
);
