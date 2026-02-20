import { motion } from "framer-motion";

export default function GlassCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
      className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-6"
    >
      {children}
    </motion.div>
  );
}