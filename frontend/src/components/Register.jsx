import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Logo, LoadingSpinner } from "./index.js";
import { Lock, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { register, isLoading } = useAuthStore();

  const navigate = useNavigate();

  const validateForm = () => {
    const newError = {};

    if (!formData.fullName) {
      newError.fullName = "Full name is required";
    }

    if (!formData.email) {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newError.email = "Invalid email format";
    }

    if (!formData.password) {
      newError.password = "Password is required";
    } else if (formData.password.length < 6) {
      newError.password = "Password must be at least 6 characters";
    }

    setErrors(newError);

    console.log(newError);

    return Object.keys(newError).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      await register(formData);
      navigate("/login");
      window.location.reload();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[400px] h-fit">
        {/* Logo */}
        <Logo className="text-center mb-3" />
        <h1 className="text-xl mb-6 text-center font-semibold tracking-wider">
          Create an account
        </h1>

        {/* Signup Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4 mb-5">
          {/* Full Name Field */}
          <div className="flex flex-col gap-1">
            <Input
              label="Full Name"
              type="text"
              Icon={User}
              placeholder="Abc Da"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
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
                Signing up...
              </div>
            ) : (
              "Signup"
            )}
          </Button>
        </form>

        {/* This is for navigate to login */}
        <div>
          <p className="text-center text-sm tracking-wider text-zinc-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer focus:outline-none hover:underline text-black"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
