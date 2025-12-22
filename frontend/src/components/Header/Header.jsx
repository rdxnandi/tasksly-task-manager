import { Bell, ChevronDown, ChevronUp, LogOut, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <header className="w-full h-[80px] bg-white rounded-2xl">
      <nav className="w-full h-full flex items-center gap-6 px-6">
        <div className="ml-auto relative">
          <div onClick={handleOpen} className="flex items-center gap-4">
            <User className="border-2 rounded-full size-5" />
            {!open ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronUp className="size-4" />
            )}
          </div>

          {open && (
            <div className="w-[120px] absolute top-10 -left-10 bg-zinc-300 rounded-md p-1">
              <button
                type="button"
                className="bg-green-100 tracking-wider w-full flex items-center gap-4 px-4 py-2 rounded-md cursor-pointer focus:outline-none"
              >
                Logout <LogOut className="size-4" />
              </button>
            </div>
          )}
        </div>

        {/* Notification */}
        <div className="relative hover:bg-zinc-100 p-2 rounded-full cursor-pointer">
          <Bell className="size-5" />
          <div className="bg-red-500 w-1.5 h-1.5 rounded-full absolute top-2 right-2" />
        </div>
      </nav>
    </header>
  );
}
