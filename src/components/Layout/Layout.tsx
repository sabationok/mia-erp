import React, { createContext, useContext, useEffect, useMemo } from 'react';
import Header from './Header/Header';
import { baseURL } from 'api';
import styled from 'styled-components';
import SideBar from 'components/SideBarLeft/SideBar';
import useAppParams from '../../hooks/useAppParams';
import usePermissionsServiceHook from '../../redux/permissions/usePermissionsService.hook';

interface ILayoutCTX {}

export const LayoutCTX = createContext({});
export const useLayout = () => useContext(LayoutCTX) as ILayoutCTX;

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { permissionId } = useAppParams();
  const {
    state: { permissionToken },
  } = usePermissionsServiceHook({ permissionId });
  const havePermission = useMemo(() => !!permissionToken, [permissionToken]);

  const CTX = {};

  useEffect(() => {
    if (window.location.hostname !== 'localhost') return;

    if (window.location.hostname === 'localhost') {
      baseURL.setLocalhost();
    }
  }, []);
  return (
    <LayoutCTX.Provider value={CTX}>
      <StyledLayout className="Layout">
        <Header havePermission={havePermission} />

        <StSideBar />

        <LayoutChildren className="LayoutChildren">{children}</LayoutChildren>
      </StyledLayout>
    </LayoutCTX.Provider>
  );
};

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;

  width: 100%;
  height: 100%;
  max-height: 100%;

  overflow: hidden;

  position: relative;

  grid-template-rows: 40px calc(100% - 40px);
  @media screen and (min-width: 480px) {
    grid-template-rows: 30px calc(100% - 30px);
  }
`;

const LayoutChildren = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;

  grid-column: 2/3;
  grid-row: 2/3;

  position: relative;
`;

const StSideBar = styled(SideBar)`
  grid-column: 1/2;
  grid-row: 2/3;
`;

export default Layout;
