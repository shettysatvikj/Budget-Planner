import React, { useEffect, useState, useRef } from "react";
import { Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("finsyncUser")) || {
      name: "Guest User",
      email: "",
    }
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const updatedUser =
        JSON.parse(localStorage.getItem("finsyncUser")) || {
          name: "Guest User",
          email: "",
        };
      setUser(updatedUser);
    };

    window.addEventListener("userUpdated", updateUser);
    return () => window.removeEventListener("userUpdated", updateUser);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarLetter = user.name ? user.name.charAt(0).toUpperCase() : "G";

  return (
    <header className="w-full px-6 py-4">
     <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-wrap sm:flex-nowrap">

        {/* LEFT */}
        <div>
          <h1 className="text-3xl font-semibold">Welcome back, {user.name}!</h1>
          <p className="text-gray-400 mt-1">
            It’s the best time to manage your finances
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          {/* <button
            aria-label="search"
            className="p-3 rounded-full border border-gray-200 bg-white/60 hover:shadow-sm"
          >
            <Search size={18} />
          </button>

          <button
            aria-label="notifications"
            className="p-3 rounded-full border border-gray-200 bg-white/60 hover:shadow-sm"
          >
            <Bell size={18} />
          </button> */}

          {/* USER BOX */}
          <div
            className="flex items-center gap-3 p-2.5 rounded-2xl border border-gray-200 bg-white/60 cursor-pointer relative"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            ref={dropdownRef}
          >
            {/* Avatar */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#7E62E6] text-white font-bold text-lg">
              {avatarLetter}
            </div>

            {/* Name + email */}
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-400 truncate">{user.email}</div>
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/settings"); // go to settings page
                  }}
                >
                  Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
