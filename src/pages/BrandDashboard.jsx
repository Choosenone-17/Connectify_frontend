import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { DealContext } from "../context/DealContext";
import ProfilePreviewModal from "../components/ProfilePreviewModal";

export default function BrandDashboard() {
  const navigate = useNavigate();
  const { createDeal } = useContext(DealContext);

  const [influencers, setInfluencers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/influencer`||"http://localhost:5000/api/users/influencer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setInfluencers(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-10 text-white">
        Discover Influencers
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading influencers...</p>
      ) : influencers.length === 0 ? (
        <p className="text-gray-400">No influencers found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {influencers.map((inf) => (
            <motion.div
              key={inf._id}
              whileHover={{ y: -8 }}
              className="bg-[#1e293b] border border-gray-700 rounded-2xl shadow-xl overflow-hidden transition"
            >
              {/* PROFILE IMAGE */}
              <div
                onClick={() => setSelected(inf)}
                className="cursor-pointer"
              >
                <img
                  src={inf.profilePic || "/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="p-6">

                {/* NAME */}
                <h3 className="text-xl font-semibold text-white">
                  {inf.name}
                </h3>

                {/* STATS */}
                <div className="mt-4 space-y-2 text-sm text-gray-400">
                  <p>
                    Followers:{" "}
                    <span className="text-white font-medium">
                      {inf.followers || "N/A"}
                    </span>
                  </p>
                  <p>
                    Avg Reach:{" "}
                    <span className="text-white font-medium">
                      {inf.reach || "N/A"}
                    </span>
                  </p>
                  <p>
                    Per Reel:{" "}
                    <span className="text-purple-400 font-semibold">
                      ₹{inf.pricePerReel || "0"}
                    </span>
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() =>
                      navigate("/messages", {
                        state: { selectedUser: inf },
                      })
                    }
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
                  >
                    Message Influencer
                  </button>

                  <button
                    onClick={() => {
                      createDeal(inf);
                      navigate("/deal");
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 rounded-xl transition"
                  >
                    Make Deal
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ProfilePreviewModal
        data={selected}
        onClose={() => setSelected(null)}
        type="influencer"
      />
    </Layout>
  );
}