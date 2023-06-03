import axios from 'axios';
import { useEffect } from 'react';

// const mockApi = axios.create({
//   baseURL: 'https://635ec7b303d2d4d47af5fbcd.mockapi.io/',
// });
const PORT = 5000;

const BASE_URL_LOCALHOST = `http://localhost:${PORT}/api/`;
const BASE_URL_RAILWAY = `https://web-production-c6e8.up.railway.app/api/`;
const baseApi = axios.create({
  baseURL: BASE_URL_LOCALHOST,
});

export const token = {
  set(token: string) {
    baseApi.defaults.headers.Authorization = `Bearer ${token}`;
  },
  unset() {
    baseApi.defaults.headers.Authorization = ``;
  },
};

export const baseURL = {
  setLocalhost(permissionId?: string) {
    baseApi.defaults.baseURL = permissionId ? `${BASE_URL_LOCALHOST}${permissionId}/` : BASE_URL_LOCALHOST;
    return baseApi;
  },
  setRailWay(permissionId?: string) {
    baseApi.defaults.baseURL = permissionId ? `${BASE_URL_RAILWAY}${permissionId}/` : BASE_URL_RAILWAY;
    return baseApi;
  },
};

export function useBaseURLWithPermission(permissionId?: string) {
  const isLocalhost = window.location.hostname === 'localhost';

  useEffect(() => {
    if (!isLocalhost) return;
    if (permissionId) {
      baseURL.setLocalhost(permissionId);
      console.log('BaseURLWithPermission', baseApi.defaults.baseURL);
      return;
    }
    if (!permissionId) {
      baseURL.setLocalhost();
      console.log('BaseURLWithoutPermission', baseApi.defaults.baseURL);
      return;
    }
  }, [isLocalhost, permissionId]);

  useEffect(() => {
    if (isLocalhost) return;

    if (permissionId) {
      baseURL.setRailWay(permissionId);
      console.log('BaseURLWithPermission', baseApi.defaults.baseURL);
      return;
    }
    if (!permissionId) {
      baseURL.setRailWay();
      console.log('BaseURLWithoutPermission', baseApi.defaults.baseURL);
      return;
    }
  }, [isLocalhost, permissionId]);
}

export default baseApi;
