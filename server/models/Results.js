import mongoose from "mongoose";

const ResultSchema = mongoose.Schema({
  user: {
    type: String,
    ref: "users",
  },
  result: {
    type: [Number],
  },
  average: {
    type: Number,
  },
  maxscore: {
    type: Number,
  },
});

export default mongoose.model("result", ResultSchema);
