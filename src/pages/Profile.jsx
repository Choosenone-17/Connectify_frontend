import { useState } from "react";
import Layout from "../components/Layout";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [name, setName] = useState(storedUser.name);
  const [bio, setBio] = useState(storedUser.bio || "");
  const [role, setRole] = useState(storedUser.role);
  const [profilePic, setProfilePic] = useState(storedUser.profilePic || "");
  const [imageFile, setImageFile] = useState(null);

  // 🔥 Influencer fields
  const [followers, setFollowers] = useState(storedUser.followers || 0);
  const [reach, setReach] = useState(storedUser.reach || 0);
  const [pricePerReel, setPricePerReel] = useState(
    storedUser.pricePerReel || 0
  );
  const [instagram, setInstagram] = useState(storedUser.instagram || "");
  const [category, setCategory] = useState(storedUser.category || "");
  const [engagementRate, setEngagementRate] = useState(
    storedUser.engagementRate || 0
  );

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("role", role);

      // Influencer extra fields
      if (role === "influencer") {
        formData.append("followers", followers);
        formData.append("reach", reach);
        formData.append("pricePerReel", pricePerReel);
        formData.append("instagram", instagram);
        formData.append("category", category);
        formData.append("engagementRate", engagementRate);
      }

      if (imageFile) {
        formData.append("profilePic", imageFile);
      }

      const res = await fetch(
        "http://localhost:5000/api/users/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setProfilePic(data.profilePic); // ✅ FIXED FIELD
        alert("Profile updated successfully 🚀");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          Edit Profile
        </h2>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profilePic || "/default-profile.png"}
            className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-500"
            alt="Profile"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full p-2 rounded border"
          />
        </div>

        {/* BASIC INFO */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded border"
          />

          <textarea
            placeholder="About / Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 rounded border"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded border"
          >
            <option value="brand">Brand</option>
            <option value="influencer">Influencer</option>
          </select>
        </div>

        {/* 🔥 INFLUENCER SECTION */}
        {role === "influencer" && (
          <div className="bg-gray-800 p-6 rounded-2xl mt-6 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Influencer Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">
                  Followers
                </label>
                <input
                  type="number"
                  value={followers}
                  onChange={(e) => setFollowers(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Average Reach
                </label>
                <input
                  type="number"
                  value={reach}
                  onChange={(e) => setReach(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Price Per Reel (₹)
                </label>
                <input
                  type="number"
                  value={pricePerReel}
                  onChange={(e) => setPricePerReel(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Engagement Rate (%)
                </label>
                <input
                  type="number"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(e.target.value)}
                  className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Instagram Link
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </Layout>
  );
}