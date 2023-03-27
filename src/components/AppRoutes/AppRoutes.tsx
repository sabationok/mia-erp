import { Routes, Route, Navigate } from 'react-router-dom';
import AppPages from 'components/AppPages';
import { appPages } from 'data';
import { useAuthSelector } from 'redux/selectors.store';
import { memo } from 'react';
import EmptyPageTitle from 'components/AppPages/EmptyPageTitle';

const { PageNotFound } = AppPages;

const AppRoutes: React.FC = () => {
  const authState = useAuthSelector();

  console.log('AppRoutes', 'authState', authState.isLoggedIn);

  return (
    <Routes>
      <Route index element={<Navigate to={appPages.home.path} />} errorElement={<PageNotFound />} />
      <Route
        path="/"
        element={<AppPages.AppGridPage path={appPages.transactions.path} />}
        errorElement={<PageNotFound />}
      >
        <Route index element={<AppPages.PageTransactions />} errorElement={<PageNotFound />} />
        <Route
          path={appPages.transactions.path}
          element={<AppPages.PageTransactions />}
          errorElement={<PageNotFound />}
        />
        <Route path={appPages.home.path} element={<AppPages.PageHome />} errorElement={<PageNotFound />}>
          <Route index element={<EmptyPageTitle>Особиста інформація</EmptyPageTitle>} errorElement={<PageNotFound />} />
          <Route
            path={'personalInfo'}
            element={<EmptyPageTitle>Особиста інформація</EmptyPageTitle>}
            errorElement={<PageNotFound />}
          />
          <Route
            path={'companies'}
            element={<EmptyPageTitle>Компанії</EmptyPageTitle>}
            errorElement={<PageNotFound />}
          />
          <Route
            path={'directories'}
            element={<EmptyPageTitle>Довідники</EmptyPageTitle>}
            errorElement={<PageNotFound />}
          />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} errorElement={<PageNotFound />} />
    </Routes>
  );
};

export default memo(AppRoutes);
