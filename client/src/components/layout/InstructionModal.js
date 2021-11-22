import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./layout.module.css";
const InstructionModal = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        className={styles.instructionModal}
        onClick={handleOpen}
        variant="contained"
        size="large"
      >
        Start Game
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong>INSTRUCTIONS</strong>
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="1. Once you click START GAME, you will be redirected to the game and
            it begins immediately. A new word appears every 2.5 seconds."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="2. For every successful word typed, the word
                is removed from the stack."
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="3. Once the Stack is filled with 5 words, it is GAME OVER. Until then, you can keep clearing words off." />
            </ListItem>
            <ListItem>
              <ListItemText primary="4. You may then choose to submit the final score to the leaderboard." />
            </ListItem>
            <ListItem>
              <ListItemText primary="5. Your score is calculated based on the number of correct characters and words typed." />
            </ListItem>
            <Typography
              style={{ fontWeight: "bold" }}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              NOTE: SPACE acts as a seperator to the words. Do not use it
              unecessarily, lest you will have to restart the game.
            </Typography>
          </List>

          <br />
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/gamestart"
          >
            {" "}
            <Button variant="contained">START GAME</Button>
          </Link>
        </Box>
      </Modal>
    </div>
  );
};

export default InstructionModal;
