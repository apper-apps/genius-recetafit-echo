import { motion } from "framer-motion";

const Loading = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <motion.div
        className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p 
        className="mt-4 text-surface-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Generando tu receta personalizada...
      </motion.p>
    </div>
  );
};

export default Loading;