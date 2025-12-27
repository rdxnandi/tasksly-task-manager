import { useState } from "react";
import { Bell, ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.js";
import Logo from "../Logo.jsx";

export default function Header() {
  const [open, setOpen] = useState(false);

  const { authUser, logout } = useAuthStore();

  // console.log(authUser.data.fullName);

  const handleOpen = () => {
    setOpen(!open);
  };

  // Functionality of logout
  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
    window.location.reload();
  };

  return (
    <header className="w-full h-[80px] bg-white rounded-2xl">
      <nav className="w-full h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        <div className="flex items-center gap-6">
          {/*  */}
          <div className="relative">
            <div
              onClick={handleOpen}
              className="flex items-center gap-4 cursor-pointer"
            >
              <p className="border-2 font-medium bg-green-200 size-7 flex items-center justify-center rounded-full">
                {authUser?.data?.fullName.charAt(0).toUpperCase()}
              </p>
              {!open ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronUp className="size-4" />
              )}
            </div>

            {/* Logout Button */}
            {open && (
              <div className="w-[120px] absolute top-10 -left-10 bg-zinc-300 rounded-md p-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-green-100 tracking-wider w-full flex items-center gap-4 px-4 py-2 rounded-md cursor-pointer focus:outline-none"
                >
                  Logout <LogOut className="size-4" />
                </button>
              </div>
            )}
          </div>

          {/* Notification Button */}
          <div className="relative hover:bg-zinc-100 p-2 rounded-full cursor-pointer">
            <Bell className="size-5" />
            <div className="bg-red-500 w-1.5 h-1.5 rounded-full absolute top-2 right-2" />
          </div>
        </div>
      </nav>
    </header>
  );
}
