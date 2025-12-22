export default function Button({
  type = "button",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`bg-green-300 py-2 px-5 rounded-md mx-auto cursor-pointer text-green-950 font-medium tracking-wide focus:outline-none hover:brightness-105 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
