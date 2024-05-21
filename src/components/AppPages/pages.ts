import { lazy } from 'react';

export const PageNotFound = lazy(() => import('./PageNotFound'));
export const PageError = lazy(() => import('./PageError'));
// * BASE
export const PageSelectCompany = lazy(() => import('./PageSelectCompany'));
export const PageHome = lazy(() => import('./PageHome'));
export const PageAuth = lazy(() => import('./PageAuth'));

// * TRANSACTIONS
export const PageTransactions = lazy(() => import('./PageTransactions'));

// * ORDERS
export const PageOrders = lazy(() => import('./orders/PageOrders'));
export const PageOrderOverview = lazy(() => import('./orders/PageOrderOverview'));

// * OFFERS
export const PageOffers = lazy(() => import('./offers/PageOffers'));
export const PageOfferOverview = lazy(() => import('./offers/PageOfferOverview'));

// * PRICE MANAGEMENT
export const PagePriceManagement = lazy(() => import('./priceManagement/PagePriceManagement'));
export const PagePriceListOverview = lazy(() => import('./priceManagement/PagePriceListOverview'));

// * WAREHOUSING
export const PageWarehouses = lazy(() => import('./warehousing/PageWarehouses'));
export const PageWarehouseOverview = lazy(() => import('./warehousing/PageWarehouseOverview'));

// * CUSTOMERS
export const PageCustomers = lazy(() => import('./customers/PageCustomers'));
export const PageCustomerOverview = lazy(() => import('./customers/PageCustomerOverview'));
// * REFUNDS
export const PageRefunds = lazy(() => import('./refunds/PageRefunds'));
export const AppGridPage = lazy(() => import('./AppGridPage'));
