import styled from 'styled-components';
import Layout from '../Layout';
import { BaseAppPageProps } from './index';
import { FieldValues } from 'react-hook-form/dist/types';
import { Path } from 'react-hook-form';

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

const createGridAreaFromKeyArrays = <T extends FieldValues = any>(
  areasArrays: (Path<T> | string)[][] = [[]]
): string => {
  const getIsEqual = () => areasArrays?.map(rowArr => rowArr.length).every((el, _i, arr) => el === arr[0]);
  const isEqual = getIsEqual();

  if (areasArrays[0].length === 0) {
    const gridAreaTest = createGridAreaFromKeyArrays<{
      field_1: any;
      field_2: any;
      field_3: { field_3_1: any; field_3_2: any };
    }>([
      ['field_3.field_3_1', 'field_2', 'field_3.field_3_1', 'sdvsfv'],
      ['field_3.field_3_1', 'sdvsfv'],
      ['field_3.field_3_1', 'sdvsfv', 'field_3.field_3_1'],
    ]);
    console.log(gridAreaTest);
  }

  if (isEqual) {
    const rows = areasArrays.map(row => row.join(' '));
    const gridAreasString = rows.join("' '");

    console.log(rows);
    console.log({ gridAreasString });

    return gridAreasString;
  }

  return '';
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
