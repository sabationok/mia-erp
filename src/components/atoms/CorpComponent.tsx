import React from 'react';
import usePermissionsServiceHook from '../../redux/permissions/usePermissionsService.hook';

const CorpComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isCurrentValid } = usePermissionsServiceHook();

  console.log('CorpComponent', { isCurrentValid });

  return <>{isCurrentValid ? children : null}</>;
};

export default CorpComponent;
