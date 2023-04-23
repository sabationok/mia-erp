import axios from 'axios';

// const mockApi = axios.create({
//   baseURL: 'https://635ec7b303d2d4d47af5fbcd.mockapi.io/',
// });
const PORT = 5000;

const baseApi = axios.create({
  baseURL: `http://localhost:${PORT}/api/`,
  // baseURL: `https://web-production-c6e8.up.railway.app/api/`,
});
const companyApi = axios.create({
  baseURL: `http://localhost:${PORT}/api/`,
  // baseURL: `https://web-production-c6e8.up.railway.app/api/`,
});


export const token = {
  set(token: string) {
    baseApi.defaults.headers.Authorization = `Bearer ${token}`;
    companyApi.defaults.headers.Authorization = `Bearer ${token}`;
  },
  unset() {
    baseApi.defaults.headers.Authorization = ``;
    companyApi.defaults.headers.Authorization = ``;
  },
};

export const baseURL = {
  setLocalhost(companyId?: string) {
    baseApi.defaults.baseURL = `http://localhost:${PORT}/api/`;
    companyApi.defaults.baseURL = companyId ? `http://localhost:${PORT}/api/${companyId}/` : `http://localhost:${PORT}/api/`;
    return baseApi;
  },
  setRailWay(companyId?: string) {
    baseApi.defaults.baseURL = ``;
    companyApi.defaults.baseURL = companyId ? `${companyId}/` : ``;
    return baseApi;
  },
};

export default baseApi;
