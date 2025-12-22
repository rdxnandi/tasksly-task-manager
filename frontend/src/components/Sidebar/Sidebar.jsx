import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Settings from "../../pages/Settings";
import { MenuIcon } from "lucide-react";
import { Logo } from "../index.js";

export default function Sidebar() {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="lg:hidden fixed top-0 bg-white w-full left-0 p-2 z-[100]">
        <button onClick={() => setIsMenuOpen(true)} className="cursor-pointer">
          <MenuIcon size={24} />
        </button>
      </div>

      <aside
        ref={menuRef}
        // className="bg-white p-10 mr-5 rounded-2xl w-[300px] hidden lg:flex flex-col justify-between"
        className={`bg-white p-10 fixed top-0 left-0 min-h-screen z-[100] lg:rounded-2xl lg:mr-5 rounded-r-2xl w-[300px] transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:static lg:flex lg:flex-col justify-between`}
      >
        <nav className="flex flex-col gap-5">
          <Logo className="mb-7 pb-5 border-b border-gray-300" />

          <ul>
            <li className="mb-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-lg px-4 py-2 rounded-md ${
                    isActive ? "bg-green-100" : ""
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `text-lg px-4 py-2 rounded-md ${
                    isActive ? "bg-green-100" : ""
                  }`
                }
              >
                Task
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          onClick={() => setIsSettingOpen(true)}
          className="text-lg tracking-wide cursor-pointer text-left hover:bg-green-100 focus:bg-green-100 w-fit py-2 px-4 rounded-md"
        >
          Settings
        </button>
      </aside>

      <Settings
        isOpen={isSettingOpen}
        onClose={() => setIsSettingOpen(false)}
      />
    </>
  );
}
