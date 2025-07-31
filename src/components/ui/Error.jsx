import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Ha ocurrido un error", onRetry, className = "" }) => {
  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-surface-800 mb-2">
        ¡Ups! Algo salió mal
      </h3>
      <p className="text-surface-600 mb-6 max-w-md">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Intentar de nuevo
        </button>
      )}
    </motion.div>
  );
};

export default Error;