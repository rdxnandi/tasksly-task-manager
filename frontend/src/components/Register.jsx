import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "./index.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[400px] h-fit">
        <h1 className="text-xl mb-6 text-center font-semibold tracking-wider">
          Create an account
        </h1>
        <form className="flex flex-col gap-4 mb-5">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </form>
        <div>
          <p className="text-center text-sm tracking-wider">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer focus:outline-none hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
