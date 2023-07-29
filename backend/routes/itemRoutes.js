import express from "express";
import {
  getItem,
  deleteItem,
  createItem,
  updateItem,
  getAllItems,
} from "../controllers/itemController.js";
import { protect } from "../util/protectedRoute.js";
const router = express.Router();

router.route("/").post(protect, createItem).get(protect, getAllItems);
router
  .route("/:id")
  .get(protect, getItem)
  .patch(protect, updateItem)
  .delete(protect, deleteItem);

export default router;
