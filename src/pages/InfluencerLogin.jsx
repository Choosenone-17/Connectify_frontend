import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";

export default function InfluencerLogin() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || (isRegister && !name)) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isRegister
        ? `${import.meta.env.VITE_API_URL}/auth/register`||"http://localhost:5000/api/auth/register"
        : `${import.meta.env.VITE_API_URL}/auth/login`||"http://localhost:5000/api/auth/login";

      const bodyData = isRegister
        ? { name, email, password, role: "influencer" }
        : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      // If registering → switch to login
      if (isRegister) {
        alert("Registration successful! Please login.");
        setIsRegister(false);
        setLoading(false);
        return;
      }

      // Save auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userType", data.user.role);

      // Ensure influencer login only
      if (data.user.role !== "influencer") {
        alert("This account is not registered as an influencer.");
        localStorage.clear();
        setLoading(false);
        return;
      }

      navigate("/influencer-dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <GlassCard>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-white text-center mb-6"
        >
          {isRegister ? "Influencer Register" : "Influencer Login"}
        </motion.h2>

        {/* NAME FIELD (REGISTER ONLY) */}
        {isRegister && (
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-white/30 text-white placeholder-white outline-none"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-white/30 text-white placeholder-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded bg-white/30 text-white placeholder-white outline-none"
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : isRegister
            ? "Register"
            : "Login"}
        </motion.button>

        {/* TOGGLE */}
        <p className="text-white text-center mt-6 text-sm">
          {isRegister
            ? "Already have an account?"
            : "New here?"}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="ml-2 text-pink-400 cursor-pointer hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </GlassCard>
    </div>
  );
}