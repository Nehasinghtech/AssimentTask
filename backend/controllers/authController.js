const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const localStore = require("../utils/localStore");

const isMongoConnected = () => mongoose.connection.readyState === 1;

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const exists = isMongoConnected()
      ? await User.findOne({ email })
      : localStore.findUserByEmail(email);
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = isMongoConnected()
      ? await User.create({ email, password: hashed })
      : localStore.createUser({ email, password: hashed });
    return res.status(201).json({ userId: user._id, email: user.email });
  } catch (error) {
    return res.status(500).json({ msg: "Signup failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = isMongoConnected()
      ? await User.findOne({ email })
      : localStore.findUserByEmail(email);
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: "JWT_SECRET is missing in .env" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ token, userId: user._id, email: user.email });
  } catch (error) {
    return res.status(500).json({ msg: "Login failed", error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    const user = isMongoConnected()
      ? await User.findById(userId).select("-password")
      : localStore.findUserById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.json({
      _id: user._id,
      email: user.email,
      username: user.email.split("@")[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to fetch user", error: error.message });
  }
};
