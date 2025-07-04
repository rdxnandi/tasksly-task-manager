import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </>
  );
}

export default App;
