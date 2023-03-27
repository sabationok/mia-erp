import React from 'react';
import styled from 'styled-components';
// import { useRow } from '../TableRows/RowContext';
import CheckBoxHead from './CellComponents/CheckBoxHead';

// import s from './TableCells.module.scss';
export type CellCheckBoxHeadProps = {
  title?: string;
  idx?: number;
  className?: string;
};
const CellCheckBoxHead: React.FC<CellCheckBoxHeadProps> = ({ title, className, ...props }) => {
  return (
    <StCell {...props} className={className}>
      <CheckBoxHead {...props} onChange={() => {}} />
    </StCell>
  );
};

const StCell = styled.div`
  display: flex;
  align-items: center;

  padding: 0 8px;

  height: 100%;

  color: inherit;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  height: 100%;

  background-color: inherit;

  & .top {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }
  & .bottom {
    font-size: 11px;
    font-weight: 400;
  }
  border-right: 1px solid #59595a;
`;
export default CellCheckBoxHead;
