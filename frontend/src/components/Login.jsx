import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Logo, LoadingSpinner } from "./index.js";
import { Lock, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const { login, isLoading } = useAuthStore();

  const navigate = useNavigate();

  const validateForm = () => {
    const newError = {};

    if (!formData.email) {
      newError.username = "Email is required";
    } else if (!formData.password) {
      newError.password = "Password is required";
    } else if (formData.password.length < 6) {
      newError.password = "Password must be at least 6 characters";
    }

    setErrors(newError);

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      await login(formData);
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[400px] h-fit">
        {/* Logo */}
        <Logo className="text-center mb-3" />
        <h1 className="text-xl mb-6 text-center font-semibold tracking-wider">
          Login
        </h1>

        {/* Form of login */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-5">
          <div className="flex flex-col gap-1">
            {/* Email Field */}
            <Input
              label="Email"
              type="email"
              Icon={Mail}
              placeholder="abc@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <Input
              label="Password"
              type="password"
              Icon={Lock}
              placeholder="******"
              eye={!!formData.password}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" disable={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-4">
                <LoadingSpinner />
                Logged In...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* This is for navigate to register */}
        <div>
          <p className="text-center text-sm tracking-wider text-zinc-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="cursor-pointer focus:outline-none hover:underline text-black"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
