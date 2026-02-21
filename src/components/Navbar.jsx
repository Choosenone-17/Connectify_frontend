import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const stored = JSON.parse(localStorage.getItem("user"));
      setUser(stored);
    };

    loadUser();

    // 🔥 Update instantly when profile changes
    window.addEventListener("storage", loadUser);
    window.addEventListener("userUpdated", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userUpdated", loadUser);
    };
  }, []);

  if (!user) return null;

  const dashboardPath =
    user.role === "brand"
      ? "/brand-dashboard"
      : "/influencer-dashboard";

  const isActive = (path) =>
    location.pathname === path
      ? "text-white"
      : "text-gray-300 hover:text-white";

  return (
    <div className="w-full flex justify-center mt-6 px-4">
      <div
        className="bg-white/5 backdrop-blur-2xl 
        border border-white/20 
        shadow-2xl 
        rounded-full 
        px-6 py-3 
        flex items-center justify-between 
        w-full max-w-4xl"
      >
        {/* LOGO */}
        <h1
          onClick={() => navigate(dashboardPath)}
          className="text-lg font-bold cursor-pointer 
          bg-gradient-to-r from-purple-400 to-pink-500 
          bg-clip-text text-transparent"
        >
          Connectify
        </h1>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <button
            onClick={() => navigate(dashboardPath)}
            className={`transition ${isActive(dashboardPath)}`}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/messages")}
            className={`transition ${isActive("/messages")}`}
          >
            Messages
          </button>

          <button
            onClick={() => navigate("/subscription")}
            className={`transition ${isActive("/subscription")}`}
          >
            Subscription
          </button>

          <button
            onClick={() => navigate("/profile")}
            className={`transition ${isActive("/profile")}`}
          >
            Profile
          </button>
        </div>

        {/* PROFILE IMAGE */}
        <div
          onClick={() => navigate("/profile")}
          className="cursor-pointer"
        >
          <img
            src={
              user.profilePic
                ? user.profilePic
                : "/default-avatar.png"
            }
            alt="Profile"
            className="w-9 h-9 rounded-full border-2 border-purple-500 object-cover hover:scale-105 transition"
          />
        </div>
      </div>
    </div>
  );
}