import { Navigate, Route, Routes } from 'react-router-dom';
import AppPages from 'components/AppPages';
import { memo, useMemo } from 'react';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import FlexBox from '../atoms/FlexBox';

const { PageNotFound } = AppPages;

const AppRoutes: React.FC = () => {
  const notFoundRouteProps = useMemo(
    () => ({
      path: '*',
      element: <PageNotFound />,
      errorElement: <PageNotFound />,
    }),
    []
  );

  return (
    <Routes>
      <Route index element={<Navigate to="/auth" />} errorElement={<PageNotFound />} />

      <Route
        path={'/testError'}
        element={
          <FlexBox
            fillWidth
            fillHeight
            style={{ fontSize: '24px', fontWeight: 900 }}
            padding={'50px'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            Index test page for github
          </FlexBox>
        }
      />

      <Route path="/*" element={<PrivateRoute redirectTo="/auth" />}>
        <Route path="/*" element={<AppPages.AppGridPage path={'/transactions'} />} errorElement={<PageNotFound />}>
          <Route index element={<Navigate to={'/transactions'} />} errorElement={<PageNotFound />} />

          <Route path={'/transactions'} element={<AppPages.PageTransactions />} errorElement={<PageNotFound />} />
          <Route path={'/home'} element={<AppPages.PageHome />} errorElement={<PageNotFound />} />
        </Route>

        <Route path="auth/*" element={<PublicRoute redirectTo={'/transactions'} />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="register" element={<AppPages.PageAuth register />} />
          <Route path="login" element={<AppPages.PageAuth login />} />

          <Route path="sendRecoveryPasswordMail" element={<AppPages.PageAuth sendRecoveryMail />} />

          <Route path="recoveryPassword" element={<AppPages.PageAuth recovery />} />

          <Route {...notFoundRouteProps} />
        </Route>
        <Route {...notFoundRouteProps} />
      </Route>
      <Route {...notFoundRouteProps} />
    </Routes>
  );
};

export default memo(AppRoutes);
