import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black text-white text-center p-6">
      <h1 className="text-5xl font-bold mb-6">
        Connectify
      </h1>

      <p className="text-lg mb-8 max-w-xl">
        A platform that connects local brands with influencers
        for affordable marketing collaborations.
      </p>

      <div className="space-x-6">
        <button
          onClick={() => navigate("/brand-login")}
          className="bg-pink-600 px-6 py-3 rounded-lg hover:scale-105 transition"
        >
          I am a Brand
        </button>

        <button
          onClick={() => navigate("/influencer-login")}
          className="bg-yellow-500 px-6 py-3 rounded-lg hover:scale-105 transition"
        >
          I am an Influencer
        </button>
      </div>
    </div>
  );
}