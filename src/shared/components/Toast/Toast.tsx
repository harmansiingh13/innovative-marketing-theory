import { toast as sonnerToast } from "sonner";

export const Toast = {
  success(message: string) {
    sonnerToast.success(message);
  },

  error(message: string) {
    sonnerToast.error(message);
  },

  warning(message: string) {
    sonnerToast.warning(message);
  },

  info(message: string) {
    sonnerToast.info(message);
  },

  loading(message: string) {
    return sonnerToast.loading(message);
  },

  dismiss(id?: string | number) {
    sonnerToast.dismiss(id);
  },

  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
  ) {
    return sonnerToast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  },
};
