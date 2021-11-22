import React from "react";
import styles from "./layout.module.css";

const ScoreLayout = ({ multiplier, symbols }) => {
  return (
    <div className={styles.scoreDiv}>
      <p className={styles.scores}>Multiplier: {symbols}</p>
      <p className={styles.scores}>
        Score: {Math.round((multiplier * symbols) / 2)}
      </p>
    </div>
  );
};

export default ScoreLayout;
