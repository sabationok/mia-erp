import React from 'react';
import styled from 'styled-components';
import { takeFullGridArea } from '../pagesStyles';
import AppLoader from '../../atoms/AppLoader';
import { AppGridPage } from '../pages';
import { PagePathType } from '../../../redux/APP_CONFIGS';

export interface PageOrderOverviewProps {
  path: PagePathType;
}

const PageOrderOverview: React.FC<PageOrderOverviewProps> = ({ path }) => {
  return (
    <AppGridPage path={path}>
      <Page></Page>
      <AppLoader isLoading={false} />
    </AppGridPage>
  );
};
const Page = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 0;

  ${takeFullGridArea};

  //@media screen and (max-width: 768px) {
  //}
  @media screen and (min-width: 768px) {
    grid-template-columns: minmax(360px, 1fr) 2fr;
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: minmax(360px, 400px) 2fr;
  }
`;
export default PageOrderOverview;
