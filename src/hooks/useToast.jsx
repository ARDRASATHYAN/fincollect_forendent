import { toast } from 'react-toastify';

export default function useToast() {
  const success = (message) => toast.success(message);
  const info = (message) => toast.info(message);
  const warning = (message) => toast.warn(message);

  const error = (err, fallbackMessage = 'Something went wrong') => {
    let message = fallbackMessage;

    if (err?.response?.data?.sqlMessage) {
      message =
        err.response.data.code === 'ER_DUP_ENTRY'
          ? 'Duplicate entry! The ID already exists.'
          : err.response.data.sqlMessage;
    } else if (err?.response?.data?.message) {
      message = err.response.data.message;
    } else if (err?.message) {
      message = err.message;
    }

    toast.error(message);
  };

  return { success, error, info, warning };
}
