import { lazy } from 'react';

export const PageNotFound = lazy(() => import('./PageNotFound'));
export const PageError = lazy(() => import('./PageError'));
// * BASE
export const PageSelectCompany = lazy(() => import('./PageSelectCompany'));
export const PageHome = lazy(() => import('./PageHome'));
export const PageAuth = lazy(() => import('./PageAuth'));

// * TRANSACTIONS
export const PageTransactions = lazy(() => import('./PageTransactions'));

// * PRODUCTS
export const PageProducts = lazy(() => import('./PageProducts'));
export const PageProductOverview = lazy(() => import('./PageProductOverview/PageProductOverview'));

// * PRICE MANAGEMENT
export const PagePriceManagement = lazy(() => import('./PagePriceManagement'));
export const PagePriceListOverview = lazy(() => import('./PagePriceListOverview'));

// * WAREHOUSING
export const PageWarehouses = lazy(() => import('./PageWarehouses'));
export const PageWarehouseOverview = lazy(() => import('./PageWarehouseOverview'));

// * ORDERS
export const PageOrders = lazy(() => import('./PageOrders'));
export const PageOrderOverview = lazy(() => import('./OrderPages/PageOrderOverview'));

// * REFUNDS
export const PageRefunds = lazy(() => import('./PageRefunds'));
export const AppGridPage = lazy(() => import('./AppGridPage'));
