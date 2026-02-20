import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { DealContext } from "../context/DealContext";
import ProfilePreviewModal from "../components/ProfilePreviewModal";
import { motion } from "framer-motion";

export default function InfluencerDashboard() {
  const navigate = useNavigate();
  const { createDeal } = useContext(DealContext);

  const [brands, setBrands] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch brands from DB
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/users/brand"||`${import.meta.env.VITE_API_URL}/users/brand`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setBrands(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Brand Collaboration Requests
      </h2>

      {loading ? (
        <p className="text-white">Loading brands...</p>
      ) : brands.length === 0 ? (
        <p className="text-white">No brands found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {brands.map((brand) => (
            <motion.div
              key={brand._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            >
              <div
                className="cursor-pointer"
                onClick={() => setSelected(brand)}
              >
                <h3 className="font-bold dark:text-white text-lg">
                  {brand.name}
                </h3>
                <p className="text-purple-500 text-sm capitalize">
                  {brand.role}
                </p>
                <p className="dark:text-gray-300 mt-2">
                  Email: {brand.email}
                </p>
              </div>

              {/* MESSAGE BUTTON */}
              <button
                onClick={() =>
                  navigate("/messages", {
                    state: { selectedUser: brand },
                  })
                }
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
              >
                Message Brand
              </button>

              {/* ACCEPT DEAL BUTTON */}
              <button
                onClick={() => {
                  createDeal(brand);
                  navigate("/deal");
                }}
                className="mt-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg"
              >
                Accept Deal
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <ProfilePreviewModal
        data={selected}
        onClose={() => setSelected(null)}
        type="brand"
      />
    </Layout>
  );
}