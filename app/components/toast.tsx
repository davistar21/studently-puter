// src/components/Toast.tsx
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";
import { cn } from "~/lib/utils"; // optional: for combining class names
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const icons = {
  success: <FiCheckCircle className="text-green-500" />,
  error: <FiXCircle className="text-red-500" />,
  info: <FiInfo className="text-blue-500" />,
  warning: <FiAlertTriangle className="text-yellow-500" />,
};

export default function Toast({
  id,
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "w-full max-w-sm rounded-lg shadow-lg p-4 flex items-start gap-3 transition-all bg-white dark:bg-gray-800 border-l-4",
        {
          "border-green-500": type === "success",
          "border-red-500": type === "error",
          "border-blue-500": type === "info",
          "border-yellow-500": type === "warning",
        }
      )}
    >
      <div className="text-xl">{icons[type]}</div>
      <div className="flex-1 text-sm text-gray-800 dark:text-white">
        {message}
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        ×
      </button>
    </motion.div>
  );
}
