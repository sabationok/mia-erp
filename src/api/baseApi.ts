import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { usePermissionsSelector } from '../hooks/usePermissionsService.hook';
import { useAuthSelector } from '../redux/selectors.store';
import { ConfigService } from '../services';

// const mockApi = axios.create({
//   baseURL: 'https://635ec7b303d2d4d47af5fbcd.mockapi.io/',
// });

const LOCALHOST_API_PORT = ConfigService.get('LOCALHOST_API_PORT') || 5000;
const BASE_URL_LOCALHOST = `http://localhost:${LOCALHOST_API_PORT}/api/`;

const BASE_URL_RAILWAY = `https://crm-nest-api-production.up.railway.app/api/`;
const isDevMode = ConfigService.isDevMode;

const baseApi = axios.create({
  baseURL: isDevMode ? BASE_URL_LOCALHOST : BASE_URL_RAILWAY,
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

  const tempToken = useMemo(() => {
    return permission_token || permission?.permission_token || permission?._id;
  }, [permission?._id, permission?.permission_token, permission_token]);

  useEffect(() => {
    if (tempToken) {
      permissionToken.set(tempToken);
      console.log('baseApi with permission_token token', '==//==', baseApi.defaults.headers);
    } else {
      permissionToken.unset();
      console.log('baseApi without permission_token token', '==//==', baseApi.defaults.headers);
    }
  }, [tempToken]);
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
