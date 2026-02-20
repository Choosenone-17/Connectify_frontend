import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePreviewModal({ data, onClose, type }) {
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-[90%] md:w-[500px] shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">
              {type === "influencer" ? "Influencer Profile" : "Brand Profile"}
            </h2>
            <button onClick={onClose} className="text-red-500">
              ✕
            </button>
          </div>

          {type === "influencer" ? (
            <>
              <img
                src={data.image}
                className="w-28 h-28 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-center dark:text-white">
                {data.name}
              </h3>
              <p className="text-center text-purple-500">{data.niche}</p>
              <p className="mt-4 dark:text-gray-300">
                Reach: {data.reach}
              </p>
              <p className="dark:text-gray-300">
                Charge: {data.charge}
              </p>
            </>
          ) : (
            <>
              <img
                src={data.logo}
                className="w-28 h-28 rounded-full mx-auto mb-4 bg-white p-3"
              />
              <h3 className="text-xl font-bold text-center dark:text-white">
                {data.name}
              </h3>
              <p className="text-center text-purple-500">
                {data.category}
              </p>
              <p className="mt-4 dark:text-gray-300">
                Budget: {data.budget}
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}