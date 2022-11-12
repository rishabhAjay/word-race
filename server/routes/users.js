//gamedata.js

import express from "express";
import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../constants.js";
const router = express.Router();

/*
route: wordrace/users
method: POST
description: register a user
access: public
*/

router.post("/", async (req, res) => {
  const { username, email } = req.body;
  try {
    let user = await User.findOne({ username: username });
    let user2 = await User.findOne({ email: email });
    if (user || user2) {
      res
        .status(400)
        .json({ msg: "User with that email or username already exists" });
    }

    user = new User({
      username: username,
      email: email,
    });
    await user.save();

    const payload = {
      user: {
        username: user.username,
      },
    };
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

export default router;
