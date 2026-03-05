const jwt = require("jsonwebtoken");
const { getJwtConfig } = require("../config/jwt");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: "Access token is required." });
    }

    const { accessTokenSecret } = getJwtConfig();
    const payload = jwt.verify(token, accessTokenSecret);
    const user = await User.findById(payload.sub).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid access token." });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};

module.exports = auth;
