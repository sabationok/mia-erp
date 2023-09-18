import { toast, ToastContent, ToastOptions } from 'react-toastify';

type ToastLoaderRemover = () => void;
type ToastLoaderHandler = {
  open: (params?: {
    beforeClose?: [message?: ToastContent, options?: ToastOptions];
    afterClose?: [message?: ToastContent, options?: ToastOptions];
  }) => { close: ToastLoaderRemover; toastId: string | number };
};
export default class ToastService {
  public static createToastLoader(message?: ToastContent, options?: ToastOptions): ToastLoaderRemover {
    const toastId = toast.loading(message, options);
    return () => toast.dismiss(toastId);
  }
  public static createLoader(message?: ToastContent, options?: ToastOptions): ToastLoaderHandler {
    return {
      open: params => {
        const toastId = toast.loading(message, options);
        return {
          toastId,
          close: () => {
            // controls?.beforeClose && controls?.beforeClose();
            params?.afterClose && toast(...params?.afterClose);

            toast.dismiss(toastId);

            params?.beforeClose && toast(...params?.beforeClose);
            // controls?.afterClose && controls?.afterClose();
          },
        };
      },
    };
  }
  public static success(message: ToastContent, options?: ToastOptions): ToastLoaderRemover {
    const toastId = toast.success(message, options);
    return () => toast.dismiss(toastId);
  }
  public static error(message: ToastContent, options?: ToastOptions): ToastLoaderRemover {
    const toastId = toast.error(message, options);
    return () => toast.dismiss(toastId);
  }
}
