import { PagePathType } from '../../redux/APP_CONFIGS';
import styled from 'styled-components';
import { takeFullGridArea } from './pagesStyles';
import AppGridPage from './AppGridPage';
import { useProductsSelector } from '../../redux/selectors.store';

export interface PageProductOverviewProps {
  path: PagePathType;
}
const PageProductOverview: React.FC<PageProductOverviewProps> = ({ path }) => {
  const product = useProductsSelector();

  return (
    <AppGridPage path={path}>
      <Page></Page>
    </AppGridPage>
  );
};
const Page = styled.div`
  ${takeFullGridArea}
`;

export default PageProductOverview;
