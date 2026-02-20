import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageCircle,
  CreditCard,
  User,
  LogOut,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const stored = JSON.parse(localStorage.getItem("user"));
      setUser(stored);
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  const dashboardPath =
    user.role === "brand"
      ? "/brand-dashboard"
      : "/influencer-dashboard";

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: dashboardPath,
    },
    {
      name: "Messages",
      icon: <MessageCircle size={18} />,
      path: "/messages",
    },
    {
      name: "Subscription",
      icon: <CreditCard size={18} />,
      path: "/subscription",
    },
    {
      name: "Edit Profile",
      icon: <User size={18} />,
      path: "/profile",
    },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white/10 text-white shadow-lg"
      : "text-gray-300 hover:bg-white/10 hover:text-white";

  return (
    <>
      {/* MOBILE BUTTON */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className="bg-black/40 backdrop-blur-md p-2 rounded-lg text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex fixed top-6 left-6 h-[92vh] w-72 
        bg-white/10 backdrop-blur-xl 
        border border-white/20 
        rounded-3xl 
        shadow-2xl 
        text-white 
        flex-col justify-between 
        p-6 z-40">

        <SidebarContent
          user={user}
          navigate={navigate}
          navItems={navItems}
          isActive={isActive}
          handleLogout={handleLogout}
        />
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="fixed top-0 left-0 h-screen w-72 
                bg-black/70 backdrop-blur-xl 
                text-white p-6 z-50 
                flex flex-col justify-between"
            >
              <SidebarContent
                user={user}
                navigate={(path) => {
                  navigate(path);
                  setOpen(false);
                }}
                navItems={navItems}
                isActive={isActive}
                handleLogout={handleLogout}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({
  user,
  navigate,
  navItems,
  isActive,
  handleLogout,
}) {
  return (
    <>
      {/* TOP */}
      <div>
        <h1
          onClick={() => navigate(navItems[0].path)}
          className="text-2xl font-bold mb-10 cursor-pointer 
          bg-gradient-to-r from-purple-400 to-pink-500 
          bg-clip-text text-transparent"
        >
          Connectify
        </h1>

        <nav className="space-y-3">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${isActive(
                item.path
              )}`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* USER SECTION */}
      <div className="pt-6 border-t border-white/20">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={user.profilePic || "/default-avatar.png"}
            className="w-10 h-10 rounded-full object-cover border border-white/30"
            alt="Profile"
          />
          <div>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-gray-300 capitalize">
              {user.role}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 
          bg-white/10 hover:bg-red-500/30 
          py-2 rounded-xl text-sm transition"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}