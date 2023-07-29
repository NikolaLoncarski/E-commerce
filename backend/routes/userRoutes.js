import express from "express";
import {
  getAllUsers,
  logoutUser,
  registerUser,
  signUp,
} from "../controllers/userController.js";
import { protect } from "../util/protectedRoute.js";
const router = express.Router();

router.route("/").post(registerUser).get(protect, getAllUsers);
router.route("/signUp").post(signUp);
router.route("/logout").post(logoutUser);

export default router;
