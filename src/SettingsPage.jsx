
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    currency: "₹",
    theme: "light",
  });

  // Load saved settings + user info
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("settings"));
    const savedUser = JSON.parse(localStorage.getItem("finsyncUser"));
    setSettings({
      name: savedSettings?.name || savedUser?.name || "",
      email: savedSettings?.email || savedUser?.email || "",
      currency: savedSettings?.currency || "₹",
      theme: savedSettings?.theme || "light",
    });
  }, []);

  const saveSettings = (updated) => {
    setSettings(updated);
    localStorage.setItem("settings", JSON.stringify(updated));
    const updatedUser = { name: updated.name, email: updated.email };
    localStorage.setItem("finsyncUser", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("userUpdated"));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f3f4f9]">
      {/* Sidebar */}
      <div className="w-full lg:w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
<div className="flex-1 p-5 md:p-10 bg-[#f5f6fa] mt-16 md:mt-0">

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Settings
        </h1>

        {/* Settings Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Profile Settings
          </h2>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl font-bold text-purple-700">
              {settings.name ? settings.name[0].toUpperCase() : "U"}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {settings.name || "User"}
              </p>
              <p className="text-sm text-gray-500">
                {settings.email || "No email saved"}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) =>
                  saveSettings({ ...settings, name: e.target.value })
                }
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  saveSettings({ ...settings, email: e.target.value })
                }
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition"
              />
            </div>

            {/* Currency */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) =>
                  saveSettings({ ...settings, currency: e.target.value })
                }
                className="w-full p-3 border rounded-xl bg-gray-50"
              >
                <option value="₹">₹ INR</option>
                <option value="$">$ USD</option>
                <option value="€">€ EUR</option>
                <option value="£">£ GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
