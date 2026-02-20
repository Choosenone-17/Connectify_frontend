import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login("dummy-jwt-token", role);
    navigate(role === "brand" ? "/brand" : "/influencer");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-2">Connectify</h1>
      <p className="mb-8">Where Brands meet Influencers</p>

      <div className="flex gap-4">
        <button
          onClick={() => handleLogin("brand")}
          className="px-6 py-3 bg-black/40 rounded-xl"
        >
          Login as Brand
        </button>

        <button
          onClick={() => handleLogin("influencer")}
          className="px-6 py-3 bg-black/40 rounded-xl"
        >
          Login as Influencer
        </button>
      </div>
    </div>
  );
}
