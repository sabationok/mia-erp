import AppGridPage from './AppGridPage';
import PageHome from './PageHome';
import { memo } from 'react';

type Props = {
  path: string;
};

const PageSelectCompany: React.FC<Props> = ({ path = '' }) => {
  return (
    <AppGridPage path={path}>
      <PageHome />
    </AppGridPage>
  );
};

export default memo(PageSelectCompany);
