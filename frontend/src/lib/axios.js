import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://tasksly-task-manager-backend.onrender.com/api",
  withCredentials: true,
});
