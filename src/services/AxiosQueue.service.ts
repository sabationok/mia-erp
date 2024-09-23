import { ApiAxiosResponse } from 'api';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ClientLogger } from 'utils/logger';
import ConfigService from './ConfigService';

export class AxiosQueueService {
  private readonly _logger: ClientLogger;
  queue: {
    config: InternalAxiosRequestConfig;
    resolve: (value: ApiAxiosResponse) => void;
    reject: <Error = any>(error: AxiosError | Error) => void;
  }[] = [];
  isProcessing: boolean;

  constructor(
    private readonly client: AxiosInstance,
    configs: { name: string }
  ) {
    this.queue = [];
    this.isProcessing = false;
    this._logger = new ClientLogger([AxiosQueueService.name, configs.name].join('/'));
  }

  async processQueue() {
    if (this.isProcessing) {
      return;
    }

    ConfigService.isDevMode && this._logger.debug('Before run');

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (item) {
        const { config, resolve, reject } = item;
        try {
          const response: ApiAxiosResponse = await this.client(config);
          this._logger.debug(config.url, response);

          resolve(response);
        } catch (error) {
          reject(error);
        }
      }
    }
    ConfigService.isDevMode && this._logger.debug('After run');

    this.isProcessing = false;
    this.clear();
  }
  async processAll() {
    if (this.isProcessing) {
      return;
    }

    this.isProcessing = true;
    ConfigService.isDevMode && this._logger.debug('Before run all', this.queue);

    await Promise.all(
      this.queue.map(async ({ config, resolve, reject }) => {
        try {
          const response: ApiAxiosResponse = await axios(config);
          return resolve(response);
        } catch (error) {
          return reject(error);
        }
      })
    ).catch(reason => {
      ConfigService.isDevMode && this._logger.debug('Run all error', reason);
    });

    this.isProcessing = false;
    this.clear();
    ConfigService.isDevMode && this._logger.debug('After run all', this.queue);
  }

  addToQueue(config: InternalAxiosRequestConfig) {
    // проміс висть у повітрі поки ми його не вирішимо або не зарежджектимо після рефреш акшену
    return new Promise<ApiAxiosResponse>((resolve, reject) => {
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
