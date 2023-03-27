import { token } from 'api';
import { toast } from 'react-toastify';
import { logOutUserThunk } from 'redux/auth/auth.thunks';
import { actionResetPageSettings } from 'redux/page/pageActions';
import { useAppSettingsSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';
import { AccentColorNamesType } from 'theme/theme';
import { actionResetAppSettings, actionSelectAccentColor, actionToggleDarkMode } from './appSettings.actions';

const useAppSettings = () => {
  const dispatch = useAppDispatch();
  const appSettings = useAppSettingsSelector();

  return {
    toggleAppMode() {
      dispatch(actionToggleDarkMode());
    },
    selectAccentColor(colorName: AccentColorNamesType) {
      dispatch(actionSelectAccentColor(colorName));
    },
    reset() {
      token.unset();
      const payload = {
        onSuccess() {
          dispatch(actionResetPageSettings());
          dispatch(actionResetAppSettings());
          toast.success('Вдалого вам дня');
        },
        onError() {
          toast.error('Помилка при виході із системи');
        },
      };
      dispatch(logOutUserThunk(payload));
    },
    ...appSettings,
  };
};

export default useAppSettings;
