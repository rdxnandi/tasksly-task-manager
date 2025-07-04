import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";

const generatedId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

export const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
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
        const res = await axiosInstance.get("/");
        const tasks = res.data;
        const completedCount = tasks.filter(
          (t) => t.status === "Completed"
        ).length;
        const pendingCount = tasks.filter((t) => t.status === "Pending").length;
        set({ tasks, completedCount, pendingCount });
      },

      addTask: async (newTask) => {
        const res = await axiosInstance.post("/", {
          title: newTask,
        });
        set((state) => ({
          tasks: [...state.tasks, res.data],
          recentActivities: [
            { id: generatedId(), task: newTask, status: "added" },
            ...state.recentActivities,
          ],
        }));
        await get().fetchTasks();
      },

      deleteTask: async (taskId) => {
        const task = get().tasks.find(
          (t) => t.id === taskId || t._id === taskId
        );
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
          recentActivities: state.recentActivities.filter(
            (_, i) => i !== index
          ),
        }));
      },

      toggleStatus: async (id) => {
        await axiosInstance.put(`/${id}/toggle`);
        get().fetchTasks();
      },

      toggleSetting: (key) => {
        set((state) => ({
          settings: { ...state.settings, [key]: !state.settings[key] },
        }));
      },
    }),
    {
      name: "task-manager-storage",
      partialize: (state) => ({
        tasks: state.tasks,
        recentActivities: state.recentActivities,
      }),
    }
  )
);
