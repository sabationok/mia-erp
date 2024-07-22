import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSelector } from 'redux/selectors.store';
import { WsConnector } from '../Ws/WsConnector';
import React from 'react';

const PrivateRoute: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
  const { access_token } = useAuthSelector();

  return !!access_token ? (
    <>
      <WsConnector />

      <Outlet />
    </>
  ) : (
    <Navigate to={redirectTo} replace={true} />
  );
};

export default PrivateRoute;
