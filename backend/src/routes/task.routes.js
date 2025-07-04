import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleStatus,
  updateTask,
} from "../controllers/task.controllers.js";

const router = Router();

router.route("/").post(createTask);
router.route("/").get(getTasks);
router.route("/:id/title").put(updateTask);
router.route("/:id/toggle").put(toggleStatus);
router.route("/:id").delete(deleteTask);

export default router;
