import { Task } from "../models/task.models.js";

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const task = await Task.find().sort({ createdAt: -1 });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title },
      {
        new: true,
      }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.status === "Pending") {
      task.status = "Completed";
    } else {
      task.status = "Pending";
    }
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTask, getTasks, updateTask, toggleStatus, deleteTask };
