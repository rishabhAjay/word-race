//gamedata.js

import express from "express";

import auth from "../middleware/auth.js";
import Result from "../models/Results.js";
const router = express.Router();

/*
route: wordrace/gamedata
method: GET
description: fetch game results
access: private
*/

router.post("/", auth, async (req, res) => {
  const { score } = req.body;
  let average;
  let total = 0;
  let maxscore;
  try {
    let user = await Result.findOne({ user: req.user.username });
    if (!user) {
      const newResult = new Result({
        user: req.user.username,
      });
      await newResult.save();
    }

    const finalResult = await Result.findOneAndUpdate(
      { user: req.user.username },
      { $push: { result: score } },
      { new: true }
    );

    maxscore = Math.max(...finalResult.result);
    finalResult.result.map((ele, i) => {
      total += ele;
    });
    average = Math.round(total / finalResult.result.length);

    const finalResult2 = await Result.findOneAndUpdate(
      { user: req.user.username },
      { average, maxscore },
      { new: true }
    );
    res.json(finalResult2);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/*
route: wordrace/gamedata
method: POST
description: store game results
access: private
*/

router.get("/", auth, async (req, res) => {
  try {
    const leaderboard = await Result.find()

      .sort({
        maxscore: -1,
      })
      .limit(10);

    res.json(leaderboard);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

export default router;
