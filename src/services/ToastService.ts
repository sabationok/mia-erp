import { toast } from 'react-toastify';

type ToastLoaderRemover = () => void;
// type ToastLoaderOpener = () => ToastLoaderRemover;
export default class ToastService {
  public static createToastLoader(message: string): ToastLoaderRemover {
    const toastId = toast.loading(message);
    return () => toast.dismiss(toastId);
  }
  public static success(message: string): ToastLoaderRemover {
    const toastId = toast.success(message);
    return () => toast.dismiss(toastId);
  }
  public static error(message: string): ToastLoaderRemover {
    const toastId = toast.error(message);
    return () => toast.dismiss(toastId);
  }
}
