import React, { createContext, useContext, useEffect } from 'react';
import Header from './Header/Header';
// import SideBar from './SideBarLeft/SideBar';
import { baseURL } from 'api';
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
import styled from 'styled-components';
import SideBar from 'components/SideBarLeft/SideBar';

interface ILayoutCTX {}

export const LayoutCTX = createContext({});
export const useLayout = () => useContext(LayoutCTX) as ILayoutCTX;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      <StyledLayout>
        <Header />

        <SideBar />

        <LayoutChildren>{children}</LayoutChildren>
      </StyledLayout>
    </LayoutCTX.Provider>
  );
};

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 29px calc(100% - 29px);

  width: 100%;
  height: 100%;
  // max-height: 100vh;

  position: relative;
`;

const LayoutChildren = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;

  grid-column: 2/3;
  grid-row: 2/3;

  position: relative;
`;

export default Layout;
