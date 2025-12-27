import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  getTasksByUserId,
  toggleStatus,
  updateTask,
} from "../controllers/task.controllers.js";

const router = Router();

router.route("/:userId").post(createTask);
router.route("/").get(getTasks);
router.route("/:userId").get(getTasksByUserId);

router.route("/:id/title").put(updateTask);
router.route("/:id/toggle").put(toggleStatus);
router.route("/:id").delete(deleteTask);

export default router;
