//middleware code

import jwt from "jsonwebtoken";
import config from "config";
const auth = (req, res, next) => {
  //get the token out of the request header
  const token = req.header("x-auth-token");
  //check if the token exists
  if (!token) {
    //401 is auth denied
    return res.status(401).json({ msg: "Authorization denied" });
  }
  try {
    //verify whether the tokens are the same
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    //next allows to continue to the main route after the middleware
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default auth;
