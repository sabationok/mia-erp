import { toast, ToastContent, ToastOptions } from 'react-toastify';

type ToastLoaderRemover = () => void;
// type ToastLoaderOpener = () => ToastLoaderRemover;
export default class ToastService {
  public static createToastLoader(message?: ToastContent, options?: ToastOptions): ToastLoaderRemover {
    const toastId = toast.loading(message, options);
    return () => toast.dismiss(toastId);
  }
  public static createLoader(message?: ToastContent, options?: ToastOptions): ToastLoaderRemover {
    const toastId = toast.loading(message, options);
    return () => toast.dismiss(toastId);
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
