import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setUser(stored);
  }, []);

  const dashboardPath =
    user?.role === "brand"
      ? "/brand-dashboard"
      : "/influencer-dashboard";

  if (!user) return null;

  return (
    <div className="w-full flex justify-center mt-6 px-4">
      <div className="bg-black/80 backdrop-blur-lg border border-gray-700 shadow-2xl rounded-full px-6 py-3 flex items-center justify-between w-full max-w-3xl">

        {/* Logo */}
        <h1
          onClick={() => navigate(dashboardPath)}
          className="text-lg font-bold cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Connectify
        </h1>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-300 text-sm">
          <button onClick={() => navigate(dashboardPath)} className="hover:text-white transition">
            Dashboard
          </button>
          <button onClick={() => navigate("/messages")} className="hover:text-white transition">
            Messages
          </button>
          <button onClick={() => navigate("/subscription")} className="hover:text-white transition">
            Subscription
          </button>
          <button onClick={() => navigate("/profile")} className="hover:text-white transition">
            Profile
          </button>
        </div>

        {/* Profile */}
        <div
          onClick={() => navigate("/profile")}
          className="cursor-pointer"
        >
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-9 h-9 rounded-full border-2 border-purple-500 object-cover"
          />
        </div>
      </div>
    </div>
  );
}