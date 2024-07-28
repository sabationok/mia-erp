import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse } from './api.types';
import { ClientLogger } from '../utils/logger';
import { ConfigService } from '../services';

export class AxiosQueue {
  private readonly _logger = new ClientLogger(AxiosQueue.name);
  queue: {
    config: InternalAxiosRequestConfig;
    resolve: (config: ApiResponse) => void;
    reject: <Error = any>(error: AxiosError | Error) => void;
  }[] = [];
  isProcessing: boolean;

  constructor(private readonly client: AxiosInstance) {
    this.queue = [];
    this.isProcessing = false;
  }

  async processQueue() {
    if (this.isProcessing) {
      return;
    }

    ConfigService.isDevMode() && this._logger.debug('Before run');

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (item) {
        const { config, resolve, reject } = item;
        try {
          const response: ApiResponse = await this.client(config);
          this._logger.debug(config.url, response);

          resolve(response);
        } catch (error) {
          reject(error);
        }
      }
    }
    ConfigService.isDevMode() && this._logger.debug('After run');

    this.isProcessing = false;
    this.clear();
  }
  async processAll() {
    if (this.isProcessing) {
      return;
    }

    this.isProcessing = true;
    ConfigService.isDevMode() && this._logger.debug('Before run all', this.queue);

    await Promise.all(
      this.queue.map(async ({ config, resolve, reject }) => {
        try {
          const response: ApiResponse = await axios(config);
          return resolve(response);
        } catch (error) {
          return reject(error);
        }
      })
    ).catch(reason => {
      ConfigService.isDevMode() && this._logger.debug('Run all error', reason);
    });

    this.isProcessing = false;
    this.clear();
    ConfigService.isDevMode() && this._logger.debug('After run all', this.queue);
  }

  addToQueue(config: InternalAxiosRequestConfig) {
    return new Promise<ApiResponse>((resolve, reject) => {
      this.queue.push({ config, resolve, reject });
      this._logger.log('this.queue', this.queue);
    });
  }
  clear() {
    this._logger.debug('Before clear', this.queue.length);
    this.queue.length = 0;
    this._logger.debug('After clear', this.queue);
  }
}
