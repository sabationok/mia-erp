import { lazy } from 'react';

const PageNotFound = lazy(() => import('./PageNotFound'));
const PageError = lazy(() => import('./PageError'));
const PageTransactions = lazy(() => import('./PageTransactions'));
const PageHome = lazy(() => import('./PageHome'));
const AppGridPage = lazy(() => import('./AppGridPage'));

const AppPages = { AppGridPage, PageTransactions, PageNotFound, PageError, PageHome };

export default AppPages;
