import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { usePermissionsSelector } from '../redux/permissions/usePermissionsService.hook';
import { useAuthSelector } from '../redux/selectors.store';

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
export const permissionToken = {
  set(token: string) {
    baseApi.defaults.headers.Permission = `${token}`;
  },
  unset() {
    baseApi.defaults.headers.Permission = ``;
  },
};

export const baseURL = {
  setLocalhost(permissionId?: string) {
    baseApi.defaults.baseURL = permissionId ? `${BASE_URL_LOCALHOST}${permissionId}/` : BASE_URL_LOCALHOST;
    baseApi.defaults.headers.Permission = permissionId || '';
    return baseApi;
  },
  setRailWay(permissionId?: string) {
    baseApi.defaults.baseURL = permissionId ? `${BASE_URL_RAILWAY}${permissionId}/` : BASE_URL_RAILWAY;
    baseApi.defaults.headers.Permission = permissionId || '';
    return baseApi;
  },
};
export const useBaseApiWithAccessToken = () => {
  const { access_token } = useAuthSelector();

  useEffect(() => {
    if (access_token) {
      token.set(access_token);
    }
  }, [access_token]);
  useEffect(() => {
    if (!access_token) {
      token.unset();
    }
  }, [access_token]);
};
export const useBaseApiWithPermissionToken = () => {
  const { permission_token, permission } = usePermissionsSelector();
  if (permission_token) console.log('permission_token', permission_token);
  useEffect(() => {
    if (permission._id) {
      permissionToken.set(permission._id);
      console.log('baseApi with permission_token token', '==//==', baseApi.defaults.headers);
    }
  }, [permission._id]);
  useEffect(() => {
    if (!permission._id) {
      permissionToken.unset();
      console.log('baseApi without permission_token token', '==//==', baseApi.defaults.headers);
    }
  }, [permission._id]);
};

export function useBaseURLWithPermission(id?: string) {
  const { permission_token, permission } = usePermissionsSelector();

  const permissionId = permission_token || permission?._id;

  const isLocalhost = useMemo(() => {
    return window.location.hostname === 'localhost';
    // eslint-disable-next-line
  }, [window.location.hostname]);

  useEffect(() => {
    if (!isLocalhost) return;
    if (permissionId) {
      baseURL.setLocalhost(permissionId || id);
      // console.log('BaseURL WITH Permission', baseApi.defaults.headers);
      return;
    }
    if (!permissionId) {
      baseURL.setLocalhost();
      // console.log('BaseURL WITHOUT Permission', baseApi.defaults.headers);
      return;
    }
  }, [isLocalhost, permissionId, id, permission_token]);

  useEffect(() => {
    if (isLocalhost) return;

    if (permissionId || id) {
      baseURL.setRailWay(permissionId || id);
      // console.log('BaseURLWithPermission', baseApi.defaults.baseURL);
      return;
    }
    if (!permissionId || id) {
      baseURL.setRailWay();
      // console.log('BaseURLWithoutPermission', baseApi.defaults.baseURL);
      return;
    }
  }, [isLocalhost, permissionId, id, permission_token]);
}

export default baseApi;
