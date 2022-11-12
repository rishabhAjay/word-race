import express from "express";
import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import { jwtSecret } from "../constants.js";
const router = express.Router();

/*
route: api/auth
method: GET
description: get logged user
access: private
*/

router.get("/", auth, async (req, res) => {
  try {
    //return the registered user details but without the password
    const user = await User.find({ username: req.user.username }).select(
      "-email"
    );
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

/*
route: api/auth
method: POST
description: login the user
access: public
*/

router.post("/", async (req, res) => {
  const { username, email } = req.body;

  try {
    let user = await User.findOne({ username, email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        username: user.username,
      },
    };

    jwt.sign(
      payload,
      //pass the secret
      jwtSecret,
      {
        //in minutes
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

export default router;
