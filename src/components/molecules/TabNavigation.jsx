import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TabNavigation = ({ tabs, activeTab, onTabChange, className = "" }) => {
  return (
    <div className={cn("bg-surface-100 p-2 rounded-2xl", className)}>
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative flex-1 flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              activeTab === tab.id
                ? "text-white"
                : "text-surface-600 hover:text-surface-800"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-md"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className="relative flex items-center space-x-2">
              <ApperIcon name={tab.icon} className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;