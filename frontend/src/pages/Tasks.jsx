import { useEffect, useState } from "react";
import { Layout, TaskCard } from "../components";
import { Plus } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

function Tasks() {
  const [openTaskInput, setOpenTaskInput] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const { userTasks, addTask, getTaskByUserId } = useTaskStore();

  const { authUser } = useAuthStore();

  const validateForm = () => {
    const newError = {};

    if (!formData.title) {
      newError.title = "Title is required";
    } else if (!formData.description) {
      newError.description = "Description is required";
    }

    setErrors(newError);

    return true;
  };

  const handleTask = () => {
    setOpenTaskInput(!openTaskInput);
  };

  useEffect(() => {
    if (authUser?.data?._id) {
      getTaskByUserId(authUser.data._id);
    }
  }, [authUser, getTaskByUserId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      addTask(authUser?.data?._id, formData);
    }

    setFormData({ title: "", description: "" });
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
                  }}
                  className="p-2 flex rounded border border-gray-400 lg:w-full focus:outline-green-500"
                  placeholder="Title"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                  }}
                  className="p-2 flex rounded border border-gray-400 lg:w-full focus:outline-green-500 resize-none"
                  rows={4}
                  placeholder="Description"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
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
          {Array.isArray(userTasks) &&
            userTasks.map((task, i) => (
              <TaskCard
                key={i}
                _id={task._id}
                title={task.title}
                description={task.description}
                createdAt={task.createdAt}
                status={task.status}
              />
            ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Tasks;
