import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { formatMessageDate, formatMessageTime } from "../lib/utils.js";
import { useTaskStore } from "../store/useTaskStore.js";

const avatars = [
  { text: "A", bg: "bg-zinc-500", border: "border-zinc-700" },
  { text: "E", bg: "bg-green-300", border: "border-green-700" },
  // { text: "P", bg: "bg-red-300", border: "border-red-700" },
  // { text: "B", bg: "bg-green-300", border: "border-green-700" },
  // { text: "C", bg: "bg-zinc-500", border: "border-zinc-700" },
  // { text: "D", bg: "bg-red-300", border: "border-red-700" },
  // { text: "K", bg: "bg-zinc-500", border: "border-zinc-700" },
  // { text: "L", bg: "bg-green-300", border: "border-green-700" },
  // { text: "R", bg: "bg-red-300", border: "border-red-700" },
];

// This is custom task card
export default function TaskCard({
  status,
  title,
  _id,
  description,
  createdAt,
}) {
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  const { deleteTask, toggleStatus } = useTaskStore();

  return (
    <li className="bg-green-200 w-[265px] h-fit p-3 rounded-lg">
      <div className="flex flex-col gap-3">
        <p
          className={`text-lg 
                      ${
                        status === "Completed"
                          ? "line-through text-gray-500"
                          : ""
                      }
                  `}
        >
          {title}
        </p>
        <p
          onClick={() => toggle(_id)}
          className="text-zinc-700 text-sm"
          title={expanded[_id] ? "Click to collapse" : "Click to expand"}
        >
          {expanded[_id]
            ? description
            : description?.length > 50
            ? description.slice(0, 50) + "..."
            : description}
        </p>
      </div>
      <div className="flex justify-between my-4">
        <span className="text-sm text-[#414141]">
          {formatMessageDate(createdAt)}
        </span>
        <span className="text-sm text-[#414141]">
          {formatMessageTime(createdAt)}
        </span>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => toggleStatus(_id)}
          className={`focus:outline-none cursor-pointer text-sm px-4 rounded-md text-white ${
            status === "Completed"
              ? "bg-green-500"
              : status === "In Progress"
              ? "bg-yellow-500"
              : "bg-orange-500"
          }`}
        >
          {status}
        </button>

        <div
          className="flex -space-x-3 items-center"
          style={{ justifyContent: "flex-end", display: "flex" }}
        >
          {avatars.map((avatar, i) => (
            <div
              key={i}
              className={`${avatar.bg} w-7 h-7 border ${avatar.border} flex items-center justify-center text-white rounded-full`}
            >
              {avatar.text}
            </div>
          ))}
          <div className="bg-blue-200 w-7 h-7 border flex items-center justify-center text-white rounded-full">
            <Plus className="size-3" /> 5
          </div>
        </div>

        <div className="flex gap-2">
          <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-white p-2 rounded-md focus:outline-none">
            <Pencil size={15} />
          </button>
          <button
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white p-2 rounded-md focus:outline-none"
            onClick={() => deleteTask(_id)}
          >
            <Trash size={15} />
          </button>
        </div>
      </div>
    </li>
  );
}
