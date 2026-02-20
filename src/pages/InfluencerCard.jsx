export default function InfluencerCard({ influencer }) {
  return (
    <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg hover:shadow-purple-500/10 transition duration-300">

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={influencer.profilePic || "/default-avatar.png"}
          className="w-24 h-24 rounded-xl object-cover"
        />
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold text-center">
        {influencer.name}
      </h3>

      {/* Followers */}
      <p className="text-sm text-gray-400 text-center mt-1">
        {influencer.followers || "—"} Followers
      </p>

      {/* Rate */}
      <p className="text-sm text-gray-400 text-center">
        ₹ {influencer.ratePerReel || "—"} / Reel
      </p>

      {/* Bio */}
      <p className="text-xs text-gray-500 text-center mt-3 line-clamp-2">
        {influencer.bio}
      </p>

      {/* Buttons */}
      <div className="mt-5 space-y-3">
        <button className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg font-medium">
          Message
        </button>

        <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-medium">
          Make Deal
        </button>
      </div>
    </div>
  );
}