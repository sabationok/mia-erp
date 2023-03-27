import { useContext, createContext } from 'react';

export const RowCNTXT = createContext();
export const useRow = () => useContext(RowCNTXT);

const RowContext = ({ children, value }) => {
  return (
    <RowCNTXT.Provider value={{ ...value }}>
      <>{children}</>
    </RowCNTXT.Provider>
  );
};

export default RowContext;
