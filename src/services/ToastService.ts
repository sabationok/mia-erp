import { toast } from 'react-toastify';

type ToastLoaderRemover = () => void;
type ToastLoaderOpener = () => ToastLoaderRemover;
export default class ToastService {
  public static createToastLoader(message: string): ToastLoaderRemover {
    const toastId = toast.loading(message);
    return () => toast.dismiss(toastId);
  }
}
