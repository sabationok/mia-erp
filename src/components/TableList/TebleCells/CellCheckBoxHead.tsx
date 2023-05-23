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
const CellCheckBoxHead: React.FC<CellCheckBoxHeadProps> = ({
  title,
  className,
  ...props
}) => {
  const { selectedRows, tableData } = useTable();
  const [some, setSome] = useState(false);
  const [everyOn, setEveryOn] = useState(false);
  const { onHeadCheckboxChange } = useTable();

  function onChange({ checked }: CustomCheckboxEvent) {
    setSome(prev => prev);
    setEveryOn(prev => prev);
  }

  useEffect(() => {
    onHeadCheckboxChange && onHeadCheckboxChange({ some, everyOn });
  }, [everyOn, onHeadCheckboxChange, some]);

  useEffect(() => {
    console.log('head checkbox', selectedRows?.length === tableData?.length);
    if (selectedRows?.length === tableData?.length) {
      setEveryOn(selectedRows?.length === tableData?.length);
      console.log('head checkbox', selectedRows?.length === tableData?.length);
    }
  }, [selectedRows?.length, tableData?.length]);

  return (
    <StCell {...props} className={className}>
      <CheckBox
        {...props}
        onChange={onChange}
        // checked={some ? true : everyOn}
        checked={selectedRows?.length === tableData?.length}
        // icon={some ? iconId.checkBoxMinus : undefined}
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

    background-color: ${({ theme }) => theme.tableHeaderStroke};
  }
`;
export default CellCheckBoxHead;
