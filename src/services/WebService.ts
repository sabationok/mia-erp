import ToastService from './ToastService';

export class WebService {
  public static async copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);

      ToastService.info(`Дані скопійовано до буферу обміну`);
    } catch (e) {
      ToastService.error(`Помилка при копіюванні даних`);
    }
  }
  public static async getText() {
    try {
      return navigator.clipboard.readText();
    } catch (e) {}
  }
  public static async shareContent(data: ShareData) {
    try {
      await navigator.share(data);
    } catch (err) {
      console.log(err);
      ToastService.error(`Помилка: ${err}`);
    }
  }
}
