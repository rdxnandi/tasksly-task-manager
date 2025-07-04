export function formatMessageDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleString("default", { month: "long" });
  const day = String(d.getDate()).padStart(2, "0");
  return `${month} ${day}, ${year}`;
}

export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
