import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Input({
  label = "",
  Icon,
  type = "text",
  placeholder = "Enter something",
  value,
  eye = false,
  onChange,
  ...props
}) {
  const [showEye, setShowEye] = useState(false);

  const toggleHandleEye = (e) => {
    e.preventDefault();
    setShowEye(!showEye);
  };

  return (
    <div className="flex flex-col gap-2">
      <label>
        <span className="text-lg font-medium text-zinc-700">{label}</span>
      </label>

      <div className="border border-zinc-500 w-full h-[50px] rounded-md flex items-center focus-within:ring-4 focus-within:ring-green-300">
        <Icon className="size-6 mx-3 text-zinc-600" />
        <input
          type={type == "password" ? (showEye ? "text" : "password") : "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-full w-full text-lg tracking-wide placeholder:text-zinc-500 text-zinc-500 focus:outline-none"
          required
          {...props}
        />
        {eye && type === "password" && (
          <button
            type="button"
            className="mx-3 focus:outline-none cursor-pointer text-zinc-600"
            onClick={toggleHandleEye}
          >
            {!showEye ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
