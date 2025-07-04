import { useEffect, useState } from "react";
import { Layout } from "../components";
import { Pencil, Trash } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore.js";
import { formatMessageDate, formatMessageTime } from "../lib/utils.js";

function Tasks() {
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const { tasks, addTask, deleteTask, fetchTasks, toggleStatus } =
    useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask) {
      setError("Task title cannot be blank");
      return;
    }
    addTask(newTask);
    setNewTask("");
    setError("");
  };

  return (
    <Layout>
      <div className="p-4">
        <form
          onSubmit={handleSubmit}
          className="flex lg:flex-row flex-col gap-3 justify-center mt-6 lg:h-[40px]"
        >
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
                if (error) setError("");
              }}
              className="p-2 flex rounded border border-gray-400 lg:w-[400px] focus:outline-green-500"
              placeholder="Add a new task"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="lg:ml-2 px-5 py-2 lg:py-0 m-auto lg:m-0 bg-green-400 hover:bg-green-500 text-white rounded cursor-pointer focus:outline-none"
          >
            Add
          </button>
        </form>
        <ul className="mt-18 flex justify-center gap-4 flex-wrap">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-green-200 w-[250px] p-3 rounded-lg"
            >
              <span
                className={`text-lg ${
                  task.status === "Completed"
                    ? "line-through text-gray-500"
                    : ""
                }`}
              >
                {task.title}
              </span>
              <div className="flex justify-between my-4">
                <span className="text-sm text-[#414141]">
                  {formatMessageDate(task.createdAt)}
                </span>
                <span className="text-sm text-[#414141]">
                  {formatMessageTime(task.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => toggleStatus(task._id)}
                  className="focus:outline-none cursor-pointer text-sm"
                >
                  {task.status}
                </button>

                <div className="flex gap-2">
                  <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-white p-2 rounded-md focus:outline-none">
                    <Pencil size={15} />
                  </button>
                  <button
                    className="cursor-pointer bg-red-500 hover:bg-red-600 text-white p-2 rounded-md focus:outline-none"
                    onClick={() => deleteTask(task._id)}
                  >
                    <Trash size={15} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Tasks;
