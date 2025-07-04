import { useEffect, useRef } from "react";
import { useTaskStore } from "../store/useTaskStore.js";

function Settings({ isOpen, onClose }) {
  const sidebarRef = useRef(null);

  const { toggleSetting, settings } = useTaskStore();

  useEffect(() => {
    function handleClickOutside(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-10 flex justify-end transition-opacity duration-300 select-none ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="absolute inset-0" onClick={onClose}></div>

      <div
        ref={sidebarRef}
        className={`relative w-72 h-full bg-white shadow-lg p-4 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } duration-300`}
      >
        <h3 className="font-bold text-xl">Settings</h3>
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => toggleSetting("notifications")}
            />
            <span>Enable Notifications</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={settings.autoDarkMode}
              onChange={() => toggleSetting("autoDarkMode")}
            />
            <span>Enable Auto Dark Mode</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={settings.soundAlerts}
              onChange={() => toggleSetting("soundAlerts")}
            />
            <span>Enable Sound Alerts</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={settings.emailReminders}
              onChange={() => toggleSetting("emailReminders")}
            />
            <span>Enable Email Reminders</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={settings.compactView}
              onChange={() => toggleSetting("compactView")}
            />
            <span>Enable Compact View</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings;
