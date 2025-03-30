// src/components/ToastNotifier.tsx
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '@/hooks/hooks';
import { clearSuccessMessage, clearErrorMessage } from '@/redux/messagesSlice';

const ToastNotifier = () => {
  const dispatch = useAppDispatch();
  const { successMessage, errorMessage } = useAppSelector((state) => state.messages);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(clearSuccessMessage()); // Clear after showing
    }

    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(clearErrorMessage()); // Clear after showing
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default ToastNotifier;