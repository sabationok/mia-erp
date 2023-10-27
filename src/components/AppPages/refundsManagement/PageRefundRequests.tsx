import AppGridPage from '../AppGridPage';
import { BaseAppPageProps } from '../index';
import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import { takeFullGridArea } from '../pagesStyles';
import TableList from '../../TableList/TableList';

export interface PageRefundRequestProps extends BaseAppPageProps {}

const PageRefundRequests: React.FC<PageRefundRequestProps> = ({ path }) => {
  return (
    <AppGridPage path={path}>
      <Page>
        <TableList />
      </Page>
    </AppGridPage>
  );
};

const Page = styled(FlexBox)`
  ${takeFullGridArea}
`;

export default PageRefundRequests;
