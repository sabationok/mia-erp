import axios from 'axios';
import { useEffect } from 'react';
import { usePermissionsSelector } from '../redux/permissions/usePermissionsService.hook';

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

export function useBaseURLWithPermission(id?: string) {
  const isLocalhost = window.location.hostname === 'localhost';
  const { permissionToken, permission } = usePermissionsSelector();
  const permissionId = permission?._id;

  useEffect(() => {
    if (!isLocalhost) return;
    if (permissionId || id) {
      baseURL.setLocalhost(permissionId || id);
      console.log('BaseURL WITH Permission', baseApi.defaults.baseURL);
      return;
    }
    if (!permissionId || id) {
      baseURL.setLocalhost();
      console.log('BaseURL WITHOUT Permission', baseApi.defaults.baseURL);
      return;
    }
  }, [isLocalhost, permissionId, id]);

  useEffect(() => {
    if (isLocalhost) return;

    if (permissionId || id) {
      baseURL.setRailWay(permissionId || id);
      console.log('BaseURLWithPermission', baseApi.defaults.baseURL);
      return;
    }
    if (!permissionId || id) {
      baseURL.setRailWay();
      console.log('BaseURLWithoutPermission', baseApi.defaults.baseURL);
      return;
    }
  }, [isLocalhost, permissionId, id]);
}

export default baseApi;
