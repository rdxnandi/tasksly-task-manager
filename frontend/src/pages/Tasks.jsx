import { useEffect, useState } from "react";
import { Layout } from "../components";
import { Pencil, Plus, Trash } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore.js";
import { formatMessageDate, formatMessageTime } from "../lib/utils.js";

function Tasks() {
  const [expanded, setExpanded] = useState({});

  const [openTaskInput, setOpenTaskInput] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");

  const { tasks, addTask, deleteTask, fetchTasks, toggleStatus } =
    useTaskStore();

  const toggle = (id) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  const handleTask = () => {
    setOpenTaskInput(!openTaskInput);
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!newTask) {
    //   setError("Task title cannot be blank");
    //   return;
    // }
    addTask(formData);
    setFormData({ title: "", description: "" });
    setError("");
  };

  return (
    <Layout>
      <div className="p-4">
        <button
          type="button"
          onClick={handleTask}
          className="border border-green-500 text-green-500 px-5 py-2 rounded-md flex items-center gap-2 tracking-wider cursor-pointer focus:outline-none"
        >
          <Plus size={18} />
          Add New Task
        </button>

        {openTaskInput && (
          <div
            onClick={() => setOpenTaskInput(false)}
            className="fixed inset-0 bg-zinc-800/50 flex items-center justify-center z-100"
          >
            <form
              onSubmit={handleSubmit}
              onClick={(e) => e.stopPropagation()}
              className="flex lg:flex-col flex-col gap-3 justify-center mt-6 w-[400px] bg-white h-fit p-2 rounded-md"
            >
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (error) setError("");
                  }}
                  className="p-2 flex rounded border border-gray-400 lg:w-full focus:outline-green-500"
                  placeholder="Title"
                />
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (error) setError("");
                  }}
                  className="p-2 flex rounded border border-gray-400 lg:w-full focus:outline-green-500 resize-none"
                  rows={4}
                  placeholder="Description"
                />
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="px-5 py-2 ml-auto bg-green-400 hover:bg-green-500 text-white rounded cursor-pointer focus:outline-none"
              >
                Add
              </button>
            </form>
          </div>
        )}

        <ul className="mt-18 flex gap-4 flex-wrap">
          {tasks.map((task, i) => (
            <li key={i} className="bg-green-200 w-[250px] h-fit p-3 rounded-lg">
              <div className="flex flex-col gap-3">
                <p
                  className={`text-lg ${
                    task.status === "Completed"
                      ? "line-through text-gray-500"
                      : ""
                  }`}
                >
                  {task.title}
                </p>
                <p
                  onClick={() => toggle(task._id)}
                  className="text-zinc-700 text-sm"
                  title={
                    expanded[task._id] ? "Click to collapse" : "Click to expand"
                  }
                >
                  {expanded[task._id]
                    ? task.description
                    : task.description?.length > 50
                    ? task.description.slice(0, 50) + "..."
                    : task.description}
                </p>
              </div>
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
