import { Task } from "../models/task.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

/* create task */
const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.params;

  const task = await Task.create({ title, description, userId });

  res.status(201).json(new ApiResponse(201, task, "Task Create Successfully"));
});

/* get all tasks */
const getTasks = asyncHandler(async (req, res) => {
  const task = await Task.find().sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, task, "Current Tasks Fetched Successfully"));
});

/* get all tasks by user id */
const getTasksByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

  if (tasks.length === 0) {
    throw new ApiError(404, "No tasks found for this user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully by user id"));
});

/* update task */
const updateTask = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title },
    {
      new: true,
    }
  );
  res.status(200).json(new ApiResponse(200, task, "Updated Task Successfully"));
});

/* toggle status */
const toggleStatus = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.status === "Pending") {
    task.status = "In Progress";
  } else if (task.status === "In Progress") {
    task.status = "Completed";
  } else {
    task.status = "Pending";
  }
  await task.save();
  res
    .status(200)
    .json(new ApiResponse(200, task, "Toggle Status Successfully"));
});

/* delete task */
const deleteTask = asyncHandler(async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json(new ApiResponse(200, {}, "Task deleted"));
});

export {
  createTask,
  getTasks,
  getTasksByUserId,
  updateTask,
  toggleStatus,
  deleteTask,
};
