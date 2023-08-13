import { lazy } from 'react';

const PageNotFound = lazy(() => import('./PageNotFound'));
const PageError = lazy(() => import('./PageError'));
const PageTransactions = lazy(() => import('./PageTransactions'));
const PageProducts = lazy(() => import('./PageProducts'));
const PageSelectCompany = lazy(() => import('./PageSelectCompany'));
const PageHome = lazy(() => import('./PageHome'));
const PageAuth = lazy(() => import('./PageAuth'));
const PagePriceManagement = lazy(() => import('./PagePriceManagement'));
const PageWarehouses = lazy(() => import('./PageWarehouses'));
const PageWarehouseOverview = lazy(() => import('./PageWarehouseOverview'));
const PageOrders = lazy(() => import('./PageOrders'));
const PageRefunds = lazy(() => import('./PageRefunds'));
const AppGridPage = lazy(() => import('./AppGridPage'));

const AppPages = {
  AppGridPage,
  PageHome,
  PageSelectCompany,
  PageTransactions,
  PageProducts,
  PageNotFound,
  PageError,
  PageAuth,
  PagePriceManagement,
  PageOrders,
  PageRefunds,
  PageWarehouses,
  PageWarehouseOverview,
};

export {
  AppGridPage,
  PageNotFound,
  PagePriceManagement,
  PageError,
  PageTransactions,
  PageSelectCompany,
  PageHome,
  PageAuth,
  PageOrders,
  PageRefunds,
  PageWarehouses,
  PageWarehouseOverview,
};

export default AppPages;
