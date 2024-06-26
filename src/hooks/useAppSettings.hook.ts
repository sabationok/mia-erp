import { toast } from 'react-toastify';
import { logOutUserThunk } from 'redux/auth/auth.thunks';
import { actionResetPageSettings } from 'redux/page/pageActions';
import { useAppDispatch } from 'redux/store.store';
import { AccentColorName } from 'theme/accentColors';
import {
  actionResetAppSettings,
  actionSelectAccentColor,
  actionToggleDarkMode,
} from '../redux/appSettings/appSettings.actions';
import { useMemo } from 'react';
import { defaultThunkPayload } from '../utils/fabrics';
import { getAppActionsThunk } from '../redux/appSettings/appSettings.thunks';
import { RoleActionType, ServiceDispatcherAsync } from '../redux/app-redux.types';

export interface AppSettingsService {
  toggleAppMode: () => void;
  selectAccentColor: (color: AccentColorName) => void;
  resetApp: ServiceDispatcherAsync;
  getAppActions: ServiceDispatcherAsync<any, Record<string, RoleActionType[]>>;
}

const useAppSettings = (): AppSettingsService => {
  const dispatch = useAppDispatch();

  return useMemo((): AppSettingsService => {
    return {
      toggleAppMode: () => dispatch(actionToggleDarkMode()),
      selectAccentColor: color => dispatch(actionSelectAccentColor(color)),
      getAppActions: async payload => dispatch(getAppActionsThunk(defaultThunkPayload(payload))),
      resetApp: async payload => {
        return dispatch(
          logOutUserThunk(
            defaultThunkPayload({
              onSuccess(d) {
                dispatch(actionResetPageSettings());
                dispatch(actionResetAppSettings());
                toast.success('Вдалого вам дня');
                payload?.onSuccess && payload.onSuccess(d);
              },
              onError(e) {
                payload?.onError && payload.onError(e);
                toast.error('Помилка при виході із системи');
              },
              onLoading: payload?.onLoading,
              data: payload?.data,
            })
          )
        );
      },
    };
  }, [dispatch]);
};

export default useAppSettings;
