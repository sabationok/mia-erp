import { useRow } from '../TableRows/TableRow';
import CheckBox, { CustomCheckboxEvent, CustomCheckboxEventHandler } from './CellComponents/CheckBox';
import styled from 'styled-components';
import { memo } from 'react';

interface Props {
  title?: string;
  idx?: string | number;
  className?: string;
  checked?: boolean;
  onCheckboxChange?: CustomCheckboxEventHandler;
}

const CellCheckBox: React.FC<Props> = ({ className }) => {
  const { rowData, onRowCheckboxChange, checked } = useRow();

  function onChange({ checked, event }: CustomCheckboxEvent) {
    onRowCheckboxChange && onRowCheckboxChange({ checked, _id: rowData._id });
  }

  return (
    <StCell className={className}>
      <CheckBox id={rowData._id} onChange={onChange} checked={checked} />
    </StCell>
  );
};

const StCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 100%;

  //border-right: 1px solid ${({ theme }) => theme.trBorderClr};
`;

export default memo(CellCheckBox);
