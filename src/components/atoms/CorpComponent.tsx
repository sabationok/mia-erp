import React, { useMemo } from 'react';
import { usePermissionsSelector } from '../../redux/permissions/usePermissionsService.hook';
import useAppParams from '../../hooks/useAppParams';

const CorpComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { permission } = usePermissionsSelector();
  const { companyId } = useAppParams();

  const isValid = useMemo(() => {
    return permission.company._id === companyId;
  }, [companyId, permission.company._id]);

  return <>{isValid ? children : null}</>;
};

export default CorpComponent;
