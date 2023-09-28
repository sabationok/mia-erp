import { toast, ToastContent, ToastOptions } from 'react-toastify';

type ToastLoaderRemover = () => void;
type ToastLoaderHandler = {
  open: (params?: {
    beforeClose?: [content?: ToastContent, options?: ToastOptions];
    afterClose?: [content?: ToastContent, options?: ToastOptions];
  }) => { close: ToastLoaderRemover; toastId: string | number };
};
export default class ToastService {
  public static createToastLoader(content?: ToastContent, options?: ToastOptions): ToastLoaderRemover {
    const toastId = toast.loading(content, options);
    return () => toast.dismiss(toastId);
  }
  public static createLoader(content?: ToastContent, options?: ToastOptions): ToastLoaderHandler {
    return {
      open: params => {
        const toastId = toast.loading(content, options);
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
  public static success(content: ToastContent, options?: ToastOptions): ToastLoaderRemover {
    const toastId = toast.success(content, options);
    return () => toast.dismiss(toastId);
  }
  public static error(content: ToastContent, options?: ToastOptions): ToastLoaderRemover {
    const toastId = toast.error(content, options);
    console.log(toastId, content);
    return () => toast.dismiss(toastId);
  }
}
