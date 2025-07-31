import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No hay datos disponibles", 
  description = "Aún no tienes información aquí",
  actionText,
  onAction,
  icon = "Package",
  className = "" 
}) => {
  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} className="w-8 h-8 text-surface-400" />
      </div>
      <h3 className="text-lg font-semibold text-surface-800 mb-2">
        {title}
      </h3>
      <p className="text-surface-600 mb-6 max-w-md">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-primary"
        >
          {actionText}
        </button>
      )}
    </motion.div>
  );
};

export default Empty;