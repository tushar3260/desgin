import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ message: "Registered", user });
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ message: "Login success", token });
};

// LOGOUT (frontend handled)
export const logout = (req, res) => {
  res.json({ message: "Logout success (delete token on client)" });
};

// PROFILE
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// UPDATE
export const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json(user);
};

// DELETE
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: "User deleted" });
};

// ADMIN: GET ALL USERS
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
