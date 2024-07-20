import { HttpStatusCode } from 'axios';

export interface WsResponse<
  Data = any,
  Query = Record<string, string>,
  Cookies = Record<string, string>,
  Headers = Record<string, string>,
> {
  statusCode: HttpStatusCode;
  message: string;
  description?: string;
  data: Data;
  headers?: Headers;
  cookies?: Cookies;
  query?: Query;
}

export * from './WsClient.ws';
export * from './Chat.ws';
