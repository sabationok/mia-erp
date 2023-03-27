import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionSetIndexPage } from 'redux/page/pageActions';

import styled from 'styled-components';

const AppGridPage: React.FC<{ path: string }> = ({ path }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (path) {
      dispatch(actionSetIndexPage(path));
    }
  }, [dispatch, path]);

  return (
    <GridPage>
      <Outlet />
    </GridPage>
  );
};

const GridPage = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);

  height: 100%;
  max-height: 100%;
  max-width: 100%;

  // overflow: auto;
  @media screen and (max-width: 768px) {
  }
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
  }
`;

export default AppGridPage;
