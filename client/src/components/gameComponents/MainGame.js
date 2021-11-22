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

  //generate random words
  const array1 = randomWords({
    exactly: 500,
    formatter: (word, index) => {
      return index === 0 ? word.slice(0, word.length).concat(" ") : word;
    },
  });

  //if the stack is full, end the game
  useEffect(() => {
    if (array2.length === 6) {
      setFlag(true);
      setInput("");
    }
  }, [array2]);

  //keep pushing elements into the array state every 2.5 seconds
  useEffect(() => {
    array1.map((ele, i) => {
      setTimeout(() => {
        setArray2((oldEle) => [...oldEle, ele]);
      }, 2500 * (i + 1));
    });
  }, []);

  //

  const saveResult = () => {
    const result = {
      score: Math.round((multiplier * symbols) / 2),
    };
    setResult(result);
    setAlert("Successfully saved", "success");
    navigate("/");
  };

  let array3 = array2.join("").split("");

  /*
  when the user types in the input box, compare the word that is pushed to the array and the input that is typed which is 
  converted to an array. Any subsequent matches in the string are removed from both the arrays. For every correct word 
  typed, the multiplier goes up by 1
  */
  const onChangeInput = (event) => {
    const input2 = event.target.value;
    setInput(input2);
    console.log(input2);
    let input3 = input.concat(" ").split(" ");
    let array4 = array2.join("").split(" ");
    setArray2((oldEle) => oldEle.filter((ele, i) => array4[i] !== input3[i]));
    for (let i = 0; i < array4.length - 1; i++) {
      if (array4[i] === input3[i]) {
        setInput(input.replace(input3[i], ""));
        setMultiplier(multiplier + 1);
      }
    }
    symbolFunc();
  };
  const onKeyDown = (event) => {
    if (event.keyCode === 8) {
      event.preventDefault();
    } else if (event.keyCode === 32 && input === "") {
      event.preventDefault();
    }
  };
  /*
  this function increments the symbols variable if the characters match, else it decrements it.
  */
  const symbolFunc = () => {
    array3.map((ele, i) => {
      if (i < input.length) {
        if (ele === input.split("")[i]) {
          return setSymbols(symbols + 1);
        } else {
          return setSymbols(symbols > 1 ? symbols - 1 : 1);
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className={styles.gameDiv}>
        <ScoreLayout multiplier={multiplier} symbols={symbols} />

        <div className={styles.arrayList}>
          {flag === false &&
            array3.map((ele, i) => {
              let color;
              if (i < input.length) {
                if (ele === input.split("")[i]) {
                  color = "#8eff8a";
                } else {
                  color = "#ff7575";
                }
              }

              return (
                <span key={i} style={{ backgroundColor: color }}>
                  {ele}
                </span>
              );
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
