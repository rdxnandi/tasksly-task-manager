export default function Input({
  type = "text",
  placeholder = "Enter something",
  className = "",
  value,
  onChange,
  props,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-zinc-400 py-2 pl-2 rounded-md bg-green-100 placeholder:text-zinc-600 focus:outline-none focus:ring-4 focus:ring-green-200 ${className}`}
      required
      {...props}
    />
  );
}
