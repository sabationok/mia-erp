import { iconId } from '../img/sprite/iconId.data';
import translate from '../lang';

export const statusName = {
  approved: 'Узгоджено',
  success: 'Успішно',
  failed: 'Не успішно',
  pending: 'Очікування',
  rejected: 'Відхилено',
  visible: 'Видимий',
  hidden: 'Прихований',
  available: 'У наявності',
  notAvailable: 'Відсутній',
  awaitingOnStock: 'Очікується',
  isCommission: 'Комісійний',
  isStandart: 'Стандарт',
  iban: 'IBAN',
  card: 'CARD',
  payAfter: 'Післяплата',
  payed: 'Оплачено',
  inWork: 'У роботі',
  new: 'Нове',
  inRoad: 'У дорозі',
  inProcess: 'У процесі',
  accepted: 'Прийнято',
  mixed: 'Змішано',
  express: 'Експрес',
  curier: "Кур'єр",
  standart: 'Стандарт',
  problem: 'Проблема',
  resolving: 'Вирішується',
  archived: 'Архів',
  default: 'Без статусу',
  INCOME: 'Дохід',
  EXPENSE: 'Витрата',
  TRANSFER: 'Переказ',
};
export const statusIconId = {
  success: 'success',
  approved: 'success',
  pending: 'time',
  rejected: 'error',
  visible: 'visibility-on',
  hidden: 'visibility-off',
  available: 'success',
  notAvailable: 'clear',
  awaitingOnStock: 'time',
  isCommission: 'success',
  isStandart: 'success',
  problem: 'error',
  resolving: 'warning',
  new: 'info',
  inWork: 'info',
  inRoad: 'info',
  inProcess: 'info',
  standart: 'info',
  accepted: 'success',
  mixed: 'error',
  hasChange: 'change',
  payed: 'success',
  iban: 'bank',
  card: 'card-ok',
  payAfter: 'time',
  express: 'info',
  curier: 'info',
  orderSuccess: 'success',
  archived: 'error',
  INCOME: 'info',
  EXPENSE: 'info',
  TRANSFER: 'info',
  default: 'info',
};

export const statusData = {
  name: statusName,
  iconId: statusIconId,
};
export const colors = {
  clrLight: '#fff',
  clrDark: '#121212',
  default: 'rgb(154, 154, 154)',
  defaultLight: '#E9E9E9',
  clrInfo: '#3498db',
  clrInfoLight: 'rgba(0, 117, 255, 0.24)',
  clrSuccess: '#07bc0c',
  clrSuccessLight: 'rgba(52, 199, 89, 0.16)',
  clrWarning: '#f1c40f',
  clrWarningLight: 'rgba(255, 245, 0, 0.24)',
  clrError: '#e74c3c',
  clrErrorLight: 'rgba(255, 59, 48, 0.16)',
  clrPrimary: '#cdcdcd',
  expense: '#FF3B30',
  income: '#30D158',
  transfer: '#5E5CE6',
  textPrimary: '#EFEFEF',
};

export interface StatusData {
  name: string;
  color?: string;
  backgroundColor?: string;
  label: string;
  iconId?: string;
  description?: string;
}

export const statusDataMap = {
  noStatus: {
    name: 'NO_STATUS',
    color: 'inherit',
    iconId: iconId.info,
    label: 'Без статусу',
    backgroundColor: colors.defaultLight,
  } as StatusData,
  error: {
    name: 'error',
    color: 'inherit',
    iconId: iconId.error,
    label: 'error',
    backgroundColor: colors.clrErrorLight,
    description: 'error',
  } as StatusData,
  success: {
    name: 'success',
    color: 'inherit',
    iconId: iconId.success,
    label: 'success',
    backgroundColor: colors.clrSuccessLight,
  } as StatusData,
  info: {
    name: 'info',
    color: 'inherit',
    iconId: iconId.info,
    label: 'info',
    backgroundColor: colors.clrInfoLight,
  } as StatusData,
  warning: {
    name: 'warning',
    color: 'inherit',
    iconId: iconId.warning,
    label: 'warning',
    backgroundColor: colors.clrWarningLight,
  } as StatusData,
  INCOME: {
    name: 'INCOME',
    color: colors.clrSuccess,
    label: 'ДОХІД',
    backgroundColor: colors.clrSuccess,
  } as StatusData,
  EXPENSE: {
    name: 'EXPENSE',
    color: colors.clrError,
    label: 'ДОХІД',
    backgroundColor: colors.clrError,
  } as StatusData,
  TRANSFER: {
    name: 'TRANSFER',
    color: colors.clrInfo,
    label: 'ПЕРЕКАЗ',
    backgroundColor: colors.clrInfo,
  } as StatusData,
  pending: {
    name: 'pending',
    label: translate('pending'),
    color: colors.clrLight,
    backgroundColor: colors.clrInfo,
  },
  fulfilled: {
    name: 'fulfilled',
    label: translate('fulfilled'),
    color: colors.clrLight,
    backgroundColor: colors.clrSuccess,
  },
  rejected: {
    name: 'rejected',
    label: translate('rejected'),
    color: colors.clrLight,
    backgroundColor: colors.clrError,
  },
};

export type StatusNames = keyof typeof statusDataMap;
