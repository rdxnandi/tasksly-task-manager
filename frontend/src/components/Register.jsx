import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Logo } from "./index.js";
import { Lock, Mail, User } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[400px] h-fit">
        <Logo className="text-center mb-3" />
        <h1 className="text-xl mb-6 text-center font-semibold tracking-wider">
          Create an account
        </h1>
        <form className="flex flex-col gap-4 mb-5">
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
          <Input
            label="Password"
            type="password"
            Icon={Lock}
            placeholder="********"
            eye={!!formData.password}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <Button type="submit">Create</Button>
        </form>
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
