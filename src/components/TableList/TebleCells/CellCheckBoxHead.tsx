import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTable } from '../TableList';
import CheckBox, { CustomCheckboxEvent } from './CellComponents/CheckBox';

// import s from './TableCells.module.scss';
export type CellCheckBoxHeadProps = {
  title?: string;
  idx?: number;
  className?: string;
};
const CellCheckBoxHead: React.FC<CellCheckBoxHeadProps> = ({ title, className, ...props }) => {
  const { selectedRows, tableData, onHeadCheckboxChange } = useTable();
  const [some, setSome] = useState(false);
  const [everyOn, setEveryOn] = useState(false);

  function onChange(event: CustomCheckboxEvent) {
    setSome(prev => prev);
    setEveryOn(prev => prev);
    onHeadCheckboxChange && onHeadCheckboxChange(event);
  }

  useEffect(() => {
    if (!selectedRows || !tableData) {
      setEveryOn(false);
      setSome(false);
      return;
    }

    if (tableData.length > 0) {
      setEveryOn(selectedRows?.length === tableData?.length);

      setSome(selectedRows?.length > 0 && selectedRows?.length < tableData?.length);
    }
  }, [selectedRows, selectedRows?.length, tableData, tableData?.length]);

  return (
    <StCell {...props} className={className}>
      <CheckBox
        {...props}
        onChange={onChange}
        checked={everyOn}
        // checked={selectedRows?.length === tableData?.length}
        icon={(some && 'checkBoxMinus') || (everyOn && 'checkBoxOn') || (!everyOn && 'checkBoxOff') || null}
      />
    </StCell>
  );
};

const StCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  padding: 4px 0;

  height: 100%;
  width: 40px;

  background-color: inherit;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    content: '';

    height: 36px;
    width: 2px;

    //background-color: ${({ theme }) => theme.tableHeaderStroke};
  }
`;
export default CellCheckBoxHead;
