// src/components/ToastProvider.tsx
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import Toast, { type ToastProps, type ToastType } from "./toast";
import { v4 as uuidv4 } from "uuid";

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration = 3000) => {
      const id = uuidv4();
      const toast: ToastProps = {
        id,
        message,
        type,
        duration,
        onClose: removeToast,
      };
      setToasts((prev) => [...prev, toast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 z-50 space-y-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
