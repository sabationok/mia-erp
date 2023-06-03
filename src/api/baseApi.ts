import axios from 'axios';

// const mockApi = axios.create({
//   baseURL: 'https://635ec7b303d2d4d47af5fbcd.mockapi.io/',
// });
const PORT = 5000;

const BASE_URL_LOCALHOST = `http://localhost:${PORT}/api/`;
// const BASE_URL_RAILWAY = `https://web-production-c6e8.up.railway.app/api/`;
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

export const apiPermissionId = {
  set(permissionId?: string) {
    baseApi.defaults.baseURL = permissionId ? `${BASE_URL_LOCALHOST}/${permissionId}/` : BASE_URL_LOCALHOST;
  },

  unset() {},
};

export const baseURL = {
  setLocalhost(permissionId?: string) {
    baseApi.defaults.baseURL = permissionId ? `${BASE_URL_LOCALHOST}/${permissionId}/` : BASE_URL_LOCALHOST;
    return baseApi;
  },
  setRailWay(permissionId?: string) {
    baseApi.defaults.baseURL = ``;
    return baseApi;
  },
};

export default baseApi;
