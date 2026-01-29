import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  deleteUser,
  getAllUsers
} from "../controllers/userController.js";

import authMiddleware from "../middlewares/authMidlleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);
router.delete("/delete", authMiddleware, deleteUser);

// admin
router.get("/all", getAllUsers);

export default router;
