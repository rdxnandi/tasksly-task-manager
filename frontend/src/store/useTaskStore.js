import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";

const generatedId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

export const useTaskStore = create(
  persist((set, get) => ({
    tasks: [],
    userTasks: [],
    recentActivities: [],
    completedCount: 0,
    pendingCount: 0,
    settings: {
      notifications: false,
      autoDarkMode: false,
      soundAlerts: true,
      emailReminders: false,
      compactView: false,
    },

    fetchTasks: async () => {
      try {
        const res = await axiosInstance.get("/tasks/");

        set({ tasks: res.data.data });
      } catch (error) {
        console.log(error.message);
      }
    },

    addTask: async (userId, formData) => {
      try {
        const res = await axiosInstance.post(`tasks/${userId}`, formData);

        set({ tasks: res.data, recentActivities: res.data });
      } catch (error) {
        console.log(error.message);
      }
    },

    getTaskByUserId: async (userId) => {
      try {
        const res = await axiosInstance.get(`tasks/${userId}`);

        set({ userTasks: res.data.data });
      } catch (error) {
        console.log(error.message);
      }
    },

    deleteTask: async (taskId) => {
      const task = get().tasks.find((t) => t.id === taskId || t._id === taskId);
      await axiosInstance.delete(`/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => (task.id || task._id) !== taskId),
        recentActivities: task
          ? [{ id: generatedId(), task: task.title, status: "deleted" }]
          : state.recentActivities,
      }));
      await get().fetchTasks();
    },

    deleteRecentActivity: (index) => {
      set((state) => ({
        recentActivities: state.recentActivities.filter((_, i) => i !== index),
      }));
    },

    toggleStatus: async (taskId) => {
      try {
        const res = await axiosInstance.put(`/tasks/${taskId}/toggle`);

        set({
          tasks: res.data.data,
          userTasks: res.data.data,
          recentActivities: res.data.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    },

    toggleSetting: (key) => {
      set((state) => ({
        settings: { ...state.settings, [key]: !state.settings[key] },
      }));
    },
  }))
);
