import ToastService from './ToastService';

export default class StorageService {
  private static local = localStorage;
  private static session = sessionStorage;

  public static getFromLocal(key: string): string | null {
    try {
      const content = this.local.getItem(key);
      return content ? JSON.parse(content) : null;
    } catch (e) {
      ToastService.error(`Get item by key: ${key} error`);
      return null;
    }
  }

  public static setToLocal(key: string, content: any): boolean {
    try {
      const parsed = JSON.stringify(content);

      this.local.setItem(key, parsed);
      return true;
    } catch (e) {
      ToastService.error(`Get item by key: ${key} error`);
      return false;
    }
  }
  public static removeFromLocal(key: string): boolean {
    try {
      this.local.removeItem(key);
      return true;
    } catch (e) {
      ToastService.error(`Remove item by key: ${key} error`);
      return false;
    }
  }

  public static getFromSession(key: string): string | null {
    try {
      const content = this.session.getItem(key);
      return content ? JSON.parse(content) : null;
    } catch (e) {
      ToastService.error(`Get item by key: ${key} error`);
      return null;
    }
  }

  public static setToSession(key: string, content: any): void | null {
    try {
      const parsed = JSON.stringify(content);

      return this.session.setItem(key, parsed);
    } catch (e) {
      ToastService.error(`Get item by key: ${key} error`);
      return null;
    }
  }
}
