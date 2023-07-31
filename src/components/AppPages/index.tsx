import { lazy } from 'react';

const PageNotFound = lazy(() => import('./PageNotFound'));
const PageError = lazy(() => import('./PageError'));
const PageTransactions = lazy(() => import('./PageTransactions'));
const PageProducts = lazy(() => import('./PageProducts'));
const PageSelectCompany = lazy(() => import('./PageSelectCompany'));
const PageHome = lazy(() => import('./PageHome'));
const PageAuth = lazy(() => import('./PageAuth'));
const PagePriceManagement = lazy(() => import('./PagePriceManagement'));
// const PageOrders = lazy(() => import('./PageOrders'));
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
  // PageOrders,
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
  // PageOrders,
};

export default AppPages;
