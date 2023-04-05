import React, { createContext, useContext, useEffect } from 'react';
import Header from './Header/Header';
// import SideBar from './SideBarLeft/SideBar';
import { baseURL } from 'api';
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
import styled, { css } from 'styled-components';
import SideBar from 'components/SideBarLeft/SideBar';
import PrivateComponent from 'components/atoms/PrivateComponent';
import { useAuthSelector } from 'redux/selectors.store';

interface ILayoutCTX {}

export const LayoutCTX = createContext({});
export const useLayout = () => useContext(LayoutCTX) as ILayoutCTX;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuthSelector();

  const CTX = {};

  useEffect(() => {
    if (window.location.hostname !== 'localhost') return;

    if (window.location.hostname === 'localhost') return;

    // const payload = thunkName => {
    //   return {
    //     onSuccess: response => {
    //       console.log(response.data);
    //     },
    //     onError: (error: StateErrorType) => {
    //       toast.error(`${thunkName} - ${error.message}`);
    //     },
    //   };
    // };

    if (window.location.hostname === 'localhost') {
      baseURL.setLocalhost();
    }
    // dispatch(getAllCategoriesThunk(payload('Categories')));
    // dispatch(getAllCountsThunk(payload('Counts')));
    // dispatch(getAllTransactionsThunk(payload('Transactions')));
  }, []);
  return (
    <LayoutCTX.Provider value={CTX}>
      <StyledLayout isLoggedIn={isLoggedIn} className="Layout">
        <PrivateComponent>
          <Header />

          <StSideBar />
        </PrivateComponent>

        <LayoutChildren className="LayoutChildren">{children}</LayoutChildren>
      </StyledLayout>
    </LayoutCTX.Provider>
  );
};

const StyledLayout = styled.div<{ isLoggedIn: boolean }>`
  display: grid;
  grid-template-columns: min-content 1fr;

  width: 100%;
  height: 100%;
  max-height: 100%;

  overflow: hidden;

  position: relative;

  ${({ isLoggedIn }) =>
    isLoggedIn
      ? css`
          grid-template-rows: 40px calc(100% - 40px);
          @media screen and (min-width: 480px) {
            grid-template-rows: 30px calc(100% - 30px);
          }
        `
      : css`
          grid-template-rows: 0px calc(100% - 0px); ;
        `}/* grid-template-rows: 40px calc(100% - 40px);
  @media screen and (min-width: 480px) {
    grid-template-rows: 30px calc(100% - 30px);
  } */
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
