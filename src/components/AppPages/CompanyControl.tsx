import { Navigate, Outlet, useParams } from 'react-router-dom';
import { usePermissionsSelector } from '../../redux/permissions/usePermissionsService.hook';
import { memo, useMemo } from 'react';

type Props = {
  children?: React.ReactNode;
  redirectTo?: string;
};
const CompanyControl: React.FC<Props> = ({ children, redirectTo }) => {
  const { companyId } = useParams();
  const state = usePermissionsSelector();

  const isValidCompany = useMemo(() => {
    console.log('isValidCompany useMemo');
    return companyId === state.permission.company._id;
  }, [companyId, state.permission.company._id]);

  console.log('isValidCompany', isValidCompany);
  return isValidCompany ? (
    <>
      {children}

      <Outlet />
    </>
  ) : (
    <Navigate to={redirectTo || '/app'} />
  );
};
export default memo(CompanyControl);
