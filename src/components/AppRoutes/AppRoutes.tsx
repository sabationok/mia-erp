import { Navigate, Route, Routes } from 'react-router-dom';
import AppPages from 'components/AppPages';
import { appPages } from 'data';
import { memo } from 'react';
import EmptyPageTitle from 'components/AppPages/EmptyPageTitle';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const { PageNotFound } = AppPages;

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        index
        element={<Navigate to="/auth" />}
        errorElement={<PageNotFound />}
      />

      <Route
        path={'/'}
        element={<Navigate to="/auth" />}
        errorElement={<PageNotFound />}
      />

      <Route
        path="auth/*"
        element={<PublicRoute redirectTo={`/${appPages.transactions.path}`} />}
      >
        <Route
          index
          element={<Navigate to="login" />}
          errorElement={<PageNotFound />}
        />

        <Route path="register" element={<AppPages.PageAuth register />}></Route>

        <Route path="login" element={<AppPages.PageAuth login />}></Route>

        <Route
          path="sendRecoveryPasswordMail"
          element={<AppPages.PageAuth sendRecoveryMail />}
        ></Route>

        <Route
          path="recoveryPassword"
          element={<AppPages.PageAuth recovery />}
        ></Route>

        <Route
          path="*"
          element={<PageNotFound />}
          errorElement={<PageNotFound />}
        />
      </Route>

      <Route path="/" element={<PrivateRoute redirectTo="/auth" />}>
        <Route
          path="/"
          element={<AppPages.AppGridPage path={appPages.transactions.path} />}
          errorElement={<PageNotFound />}
        >
          <Route
            index
            element={<Navigate to={appPages.transactions.path} />}
            errorElement={<PageNotFound />}
          />

          <Route
            path={appPages.transactions.path}
            element={<AppPages.PageTransactions />}
            errorElement={<PageNotFound />}
          />
          <Route
            path={appPages.home.path}
            element={<AppPages.PageHome />}
            errorElement={<PageNotFound />}
          >
            <Route
              index
              element={<EmptyPageTitle>Особиста інформація</EmptyPageTitle>}
              errorElement={<PageNotFound />}
            />
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
      </Route>

      <Route
        path="*"
        element={<PageNotFound />}
        errorElement={<PageNotFound />}
      />
    </Routes>
  );
};

export default memo(AppRoutes);
