import React from "react";
import { cn } from "@/utils/cn";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white text-surface-900 placeholder-surface-500 resize-vertical min-h-[120px]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;