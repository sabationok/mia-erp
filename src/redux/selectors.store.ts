import { RootState } from './store.store';
import { useSelector } from 'react-redux';
import { IAuthState } from './auth/auth.types';
import { ITransactionsState } from './transactions/transactions.slice';
import { ICustomRolesState } from './customRoles/customRoles.slice';
import { IUsersState } from './users/users.types';
import { IAppSettings } from './appSettings/appSettings.slice';

export const useAuthSelector = () => useSelector<RootState, IAuthState>((state: RootState) => state.auth);
export const useUsersSelector = () => useSelector<RootState, IUsersState>((state: RootState) => state.users);
export const useAppSettingsSelector = () =>
  useSelector<RootState, IAppSettings>((state: RootState) => state.appSettings);
export const useAppPageSettingsSelector = () => useSelector((state: RootState) => state.appPage);
export const useTransactionsSelector = () =>
  useSelector<RootState, ITransactionsState>((state: RootState) => state.transactions);
export const useCustomRolesSelector = () =>
  useSelector<RootState, ICustomRolesState>((state: RootState) => state.customRoles);
