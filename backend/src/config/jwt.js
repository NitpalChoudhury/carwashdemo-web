const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

const getJwtConfig = () => {
  const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error("JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be configured.");
  }

  return {
    accessTokenSecret,
    refreshTokenSecret,
    accessTokenExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN,
  };
};

module.exports = {
  getJwtConfig,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
};
