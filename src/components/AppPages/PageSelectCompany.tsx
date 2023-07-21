import AppGridPage from './AppGridPage';
import PageHome from './PageHome';
import { memo } from 'react';
import { PagePathType } from '../../data/pages.data';

type Props = {
  path: PagePathType;
};

const PageSelectCompany: React.FC<Props> = ({ path }) => {
  return (
    <AppGridPage path={path}>
      <PageHome />
    </AppGridPage>
  );
};

export default memo(PageSelectCompany);
