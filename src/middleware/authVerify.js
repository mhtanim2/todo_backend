var jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  let Token = req.headers["token-key"];
  if (!Token) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
  
  jwt.verify(Token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ status: "unauthorized", error: err.message });
    } else {
      // Get User Name From Decoded Token & Add With Req Header
      let username = decoded["data"]["UserName"];
      req.headers.username = username;
      next();
    }
  });
};
