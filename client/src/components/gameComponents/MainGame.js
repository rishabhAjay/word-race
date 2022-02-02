import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import KeyboardLayout from "../layout/KeyboardLayout";
import ScoreLayout from "../layout/ScoreLayout";
import "react-simple-keyboard/build/css/index.css";

import { setResult } from "../../actions/gameActions";
import { loadUser } from "../../actions/authActions";
import randomWords from "random-words";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";
import styles from "./mainGame.module.css";
import "./keyboard.css";
import { setAlert } from "../../actions/alertActions";

const MainGame = (props) => {
  const { setResult, setAlert, loadUser } = props;

  const [input, setInput] = useState("");
  const [flag, setFlag] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [symbols, setSymbols] = useState(1);
  const [array2, setArray2] = useState([]);

  //navigation
  const navigate = useNavigate();

  //if the stack is full, end the game
  useEffect(() => {
    if (array2.length === 6) {
      setFlag(true);
      setInput("");
    }
  }, [array2]);

  //keep pushing elements into the array state every 2.5 seconds
  //keep pushing elements into the array state every 2.5 seconds
  useEffect(() => {
    //generate random words
    const array1 = randomWords({
      exactly: 1000,
      formatter: (word, index) => {
        return index === 0 ? word.slice(0, word.length) : word;
      },
    });

    array1.map((ele, i) => {
      setTimeout(() => {
        setArray2((oldEle) => [...oldEle, ele]);
      }, 2500 * (i + 1));
    });
  }, []);

  const saveResult = () => {
    const result = {
      score: Math.round((multiplier * symbols) / 2),
    };
    setResult(result);
    setAlert("Successfully saved", "success");
    navigate("/");
  };

  /*
  when the user types in the input box, compare the word that is pushed to the array and the input that is typed which is 
  converted to an array. Any subsequent matches in the string are removed from both the arrays. For every correct word 
  typed, the multiplier goes up by 1
  */
  const onChangeInput = (event) => {
    const input2 = event.target.value;
    setInput(input2);
    let input3 = input
      .concat(" ")
      .split(" ")
      .filter((ele) => ele !== "");

    for (let i = 0; i < input3.length; i++) {
      if (array2.includes(input3[i])) {
        for (let j = 1; j < input3[i].length; j++) {
          setSymbols(symbols + j + 1);
        }
        setInput(input.replace(input3[i], ""));
        setMultiplier(multiplier + 1);
      }
    }
    // symbolFunc();

    setArray2((oldEle) => oldEle.filter((ele) => !input3.includes(ele)));
  };
  const onKeyDown = (event) => {
    if (event.keyCode === 8) {
      event.preventDefault();
    } else if (event.keyCode === 32 && input === "") {
      event.preventDefault();
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.gameDiv}>
        <ScoreLayout multiplier={multiplier} symbols={symbols} />

        <div className={styles.arrayList}>
          {flag === false &&
            array2.map((ele, i) => {
              return <span key={i}>{ele.concat(" ")}</span>;
            })}
        </div>
        <input
          value={input}
          className={styles.inputString}
          placeholder={flag ? "GAME OVER" : "Click here and start typing.."}
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
          spellCheck={false}
          readOnly={flag}
        />
        <KeyboardLayout />

        {flag ? (
          <div className={styles.btnDiv}>
            <Button
              className={styles.btn}
              style={{ backgroundColor: "#1e7d06" }}
              onClick={saveResult}
            >
              Save Score
            </Button>{" "}
            <Link className={styles.homeLink} to="/">
              <Button
                className={styles.btn}
                style={{ backgroundColor: "#991f03" }}
              >
                Home
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default connect(null, { setResult, loadUser, setAlert })(MainGame);
