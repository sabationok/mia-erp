import AppGridPage from './AppGridPage';
import PageHome from './PageHome';
import { memo } from 'react';
import { BaseAppPageProps } from './index';

interface Props extends BaseAppPageProps {}

const PageSelectCompany: React.FC<Props> = ({ path }) => {
  return (
    <AppGridPage path={path}>
      <PageHome />
    </AppGridPage>
  );
};

export default memo(PageSelectCompany);
