const jwt = require("jsonwebtoken");
const { getJwtConfig } = require("../config/jwt");

const generateAccessToken = (user) => {
  const { accessTokenSecret, accessTokenExpiresIn } = getJwtConfig();

  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
    },
    accessTokenSecret,
    { expiresIn: accessTokenExpiresIn }
  );
};

const generateRefreshToken = (user) => {
  const { refreshTokenSecret, refreshTokenExpiresIn } = getJwtConfig();

  return jwt.sign(
    {
      sub: user._id.toString(),
    },
    refreshTokenSecret,
    { expiresIn: refreshTokenExpiresIn }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
