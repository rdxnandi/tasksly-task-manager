import express from "express";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "https://tasksly-task-manager.onrender.com",
    credentials: true,
  })
);

// routes
import taskRouter from "./routes/task.routes.js";
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/tasks", taskRouter);
app.use("/api/user", userRouter);

export { app };
