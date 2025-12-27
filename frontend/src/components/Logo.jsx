import { Link } from "react-router-dom";

// This is custom logo component
export default function Logo({ className = "" }) {
  return (
    <div
      className={`text-2xl font-bold tracking-wider text-green-300 cursor-default ${className}`}
    >
      <Link to="/">Tasksly</Link>
    </div>
  );
}
