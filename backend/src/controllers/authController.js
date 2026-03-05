const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { getJwtConfig } = require("../config/jwt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email and password are required." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        phone: user.phone || "",
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to register user." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return res.json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        phone: user.phone || "",
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to log in." });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "refreshToken is required." });
    }

    const { refreshTokenSecret } = getJwtConfig();
    const payload = jwt.verify(token, refreshTokenSecret);
    const user = await User.findById(payload.sub);

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ message: "Invalid refresh token." });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    return res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired refresh token." });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "refreshToken is required." });
    }

    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = "";
      await user.save();
    }

    return res.json({ message: "Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to log out." });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
