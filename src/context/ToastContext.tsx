// src/context/ToastContext.tsx
import { Alert } from 'antd';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';

type AlertType = 'success' | 'info' | 'warning' | 'error';

interface ToastContextProps {
  toast: (type: AlertType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<
    { id: number; type: AlertType; message: string }[]
  >([]);

  const toast = (type: AlertType, message: string, duration = 3) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration * 1000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
    {children}
    {ReactDOM.createPortal(
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        {toasts?.map((toast) => (
          <div key={toast.id} style={{ marginBottom: 8, pointerEvents: 'auto' }}>
            <Alert
              message={toast.message}
              type={toast.type}
              showIcon
              closable
              onClose={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
            />
          </div>
        ))}
      </div>,
      document.body
    )}
  </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
