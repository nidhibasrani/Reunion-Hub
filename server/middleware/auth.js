const jwt = require("jsonwebtoken");

const auth = async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
  
    req.user = decoded; 

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
