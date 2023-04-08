import { iconId } from '../img/sprite/iconId.data';

export const appPages = {
  home: { title: 'Головна', path: 'home', iconId: iconId.bank },
  transactions: { title: 'Рух коштів', path: 'transactions', iconId: iconId.cashFlow },
  sales: { title: 'Повернення', path: 'sales', iconId: iconId.assignmentBackOutlined },
  refunds: { title: 'Повернення', path: 'refunds', iconId: iconId.refund },
  supliment: { title: 'Постачання', path: 'suppliment', iconId: iconId.addtoCart },
  storage: { title: 'Склад', path: 'storage', iconId: iconId.storage },
};

export const pages = [
  appPages.home,
  appPages.transactions,
  appPages.sales,
  appPages.refunds,
  appPages.supliment,
  appPages.storage,
];
