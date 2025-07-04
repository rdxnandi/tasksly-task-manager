import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
