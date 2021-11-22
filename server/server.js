import express from "express";
//import routes
import User from "./routes/users.js";
import Auth from "./routes/auth.js";
import GameData from "./routes/gamedata.js";
import cors from "cors";
import connectDB from "./config/db.js";

//create the connection
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

//define routes
app.use("/wordrace/gamedata", GameData);
app.use("/wordrace/auth", Auth);
app.use("/wordrace/user", User);

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
