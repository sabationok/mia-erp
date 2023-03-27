import axios, { AxiosError } from 'axios';

function axiosErrorCheck<T extends Error | AxiosError>(error: T | unknown): T extends AxiosError ? AxiosError : string {
  if (axios.isAxiosError(error)) {
    console.error(error);
    return error as unknown as T extends AxiosError ? AxiosError : never;
  }
  console.error('Unknown error occurred', error);
  return 'Unknown error occurred' as T extends AxiosError ? never : string;
}

export default axiosErrorCheck;
