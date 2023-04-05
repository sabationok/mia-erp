import React from 'react';
import { useAuthSelector } from 'redux/selectors.store';

const PrivateComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const authState = useAuthSelector();

  return <>{authState.isLoggedIn ? children : undefined}</>;
};

export default PrivateComponent;
