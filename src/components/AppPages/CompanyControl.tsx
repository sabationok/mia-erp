import { Navigate, Outlet, useParams } from 'react-router-dom';
import { usePermissionsSelector } from '../../redux/permissions/usePermissionsService.hook';

type Props = {
  children?: React.ReactNode;
  redirectTo?: string;
};
const CompanyControl: React.FC<Props> = ({ children, redirectTo }) => {
  const { companyId } = useParams();
  const state = usePermissionsSelector();

  console.log('companyId', { companyId, permissionCompanyID: state.permission.company._id });

  return companyId === state.permission.company._id ? (
    <>
      {children}

      <Outlet />
    </>
  ) : (
    <Navigate to={redirectTo || '/home'} />
  );
};
export default CompanyControl;
