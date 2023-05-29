import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppPages from 'components/AppPages';
import { memo, useMemo } from 'react';
import { useAuthSelector } from '../../redux/selectors.store';
import CompanyControl from '../AppPages/CompanyControl';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const { PageNotFound } = AppPages;

const AppRoutes: React.FC = () => {
  const { accessToken } = useAuthSelector();
  const location = useLocation();

  const isAuthorized = useMemo(() => !!accessToken, [accessToken]);

  console.log('AppRoutes', location);

  const notFoundRouteProps = useMemo(
    () => ({
      path: '*',
      element: (
        <AppPages.AppGridPage path={'notFound'}>
          <PageNotFound />
        </AppPages.AppGridPage>
      ),
    }),
    []
  );

  return (
    <Routes location={location}>
      {/*<Route index element={<Navigate to={isAuthorized ? '/app' : '/auth'} />} />*/}

      <Route index element={<Navigate to={'/app/home'} />} />
      <Route path={'/app/home'} element={<AppPages.PageSelectCompany path={'home'} />} />

      <Route path={'/app/:companyId'} element={<CompanyControl redirectTo={'/app/home'} />}>
        <Route index element={<Navigate to={'transactions'} />} />
        <Route path={'companies'} element={<AppPages.PageSelectCompany path={'companies'} />} />
        <Route path={'transactions'} element={<AppPages.PageTransactions path={'transactions'} />} />
        <Route {...notFoundRouteProps} />
      </Route>

      <Route path={'/'} element={<PublicRoute redirectTo={'/app/home'} />}>
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="auth/register" element={<AppPages.PageAuth register />} />
        <Route path="auth/login" element={<AppPages.PageAuth login />} />
        <Route path="auth/sendRecoveryPasswordMail" element={<AppPages.PageAuth sendRecoveryMail />} />
        <Route path="auth/recoveryPassword" element={<AppPages.PageAuth recovery />} />
        <Route path={'*'} element={<Navigate to="/auth/login" />} />
      </Route>

      <Route path={'/'} element={<PrivateRoute redirectTo={'/auth'} />}>
        <Route index element={<Navigate to={'app/home'} />} />
        <Route path={'app/home'} element={<AppPages.PageSelectCompany path={'home'} />} />

        <Route path={'app/:companyId'} element={<CompanyControl redirectTo={'/app/home'} />}>
          <Route index element={<Navigate to={'transactions'} />} />
          <Route path={'companies'} element={<AppPages.PageSelectCompany path={'companies'} />} />
          <Route path={'transactions'} element={<AppPages.PageTransactions path={'transactions'} />} />
          <Route {...notFoundRouteProps} />
        </Route>
        <Route {...notFoundRouteProps} />
      </Route>

      <Route {...notFoundRouteProps} />
    </Routes>
  );
};

export default memo(AppRoutes);

// <Route path={'/test/*'} element={<PrivateRoute redirectTo="/auth" />}>
//   <Route path="/*" element={<AppPages.AppGridPage path={'transactions'} />}>
//     <Route index element={<Navigate to={'/transactions'} />} errorElement={<PageNotFound />} />
//
//     <Route path={'transactions'} element={<AppPages.PageTransactions />} errorElement={<PageNotFound />} />
//     <Route path={'home'} element={<AppPages.PageCompanies />} errorElement={<PageNotFound />} />
//
//     <Route {...notFoundRouteProps} />
//   </Route>
//
//   <Route path="auth/*" element={<PublicRoute redirectTo={'/transactions'} />}>
//     <Route index element={<Navigate to="login" />} />
//     <Route path="register" element={<AppPages.PageAuth register />} />
//     <Route path="login" element={<AppPages.PageAuth login />} />
//
//     <Route path="sendRecoveryPasswordMail" element={<AppPages.PageAuth sendRecoveryMail />} />
//
//     <Route path="recoveryPassword" element={<AppPages.PageAuth recovery />} />
//
//     <Route {...notFoundRouteProps} />
//   </Route>
// </Route>
