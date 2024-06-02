import axios from 'axios';

export function axiosErrorCheck<T = any>(error: T | unknown) {
  if (axios.isAxiosError(error)) {
    console.error('[Axios Error Check]', error);

    return {
      statusCode: error.status,
      message: error.response?.data?.message ?? 'Axios Error Check',
      error: error.response?.data ?? {},
      code: error?.code,
      ...(error.response?.data ?? {}),
    };
  }
  console.error('[Axios Error Check | Unknown error occurred]'.toUpperCase(), error);
  return {
    statusCode: 500,
    message: 'Unknown error occurred',
  };
}

export default axiosErrorCheck;
