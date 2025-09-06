import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import { Login, Register } from "./components";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes> */}
      <Login />
    </>
  );
}

export default App;
