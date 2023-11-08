import styled from 'styled-components';
import Layout from '../Layout';
import { BaseAppPageProps } from './index';

interface GridProps {
  numColumns?: number;
  numRows?: number;
}
interface AppGridPageLayoutProps {
  xs?: GridProps;
  xl?: GridProps;
  xxl?: GridProps;
}

interface Props extends BaseAppPageProps, AppGridPageLayoutProps {
  children?: React.ReactNode;
}

const AppGridPage: React.FC<Props> = ({ path, children, xs, xl, xxl }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (path) {
  //     dispatch(actionSetIndexPage(path));
  //   }
  // }, [dispatch, path]);

  return (
    <Layout>
      <GridPage>{children}</GridPage>
    </Layout>
  );
};

const GridPage = styled.div<AppGridPageLayoutProps>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  height: 100%;
  max-height: 100%;
  max-width: 100%;

  grid-template-areas: 'area1 area2' 'area3 area4';

  // overflow: auto;
  @media screen and (max-width: 768px) {
  }
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
`;

export default AppGridPage;
