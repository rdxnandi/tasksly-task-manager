import { Task } from "../models/task.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({ title, description });

  res.status(201).json(new ApiResponse(201, task, "Task Create Successfully"));
});

const getTasks = asyncHandler(async (req, res) => {
  const task = await Task.find().sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, task, "Current Tasks Fetched Successfully"));
});

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

const toggleStatus = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.status === "Pending") {
    task.status = "Completed";
  } else {
    task.status = "Pending";
  }
  await task.save();
  res
    .status(200)
    .json(new ApiResponse(200, task, "Toggle Status Successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json(new ApiResponse(200, {}, "Task deleted"));
});

export { createTask, getTasks, updateTask, toggleStatus, deleteTask };
