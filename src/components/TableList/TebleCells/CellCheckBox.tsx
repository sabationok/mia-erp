import { useRow } from '../TableRows/TableRow';
import CheckBox, { ButtonCheckboxEvent, CustomCheckboxEventHandler } from './CellComponents/CheckBox';
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
  const { rowId, onRowCheckboxChange, checked } = useRow();

  function onChange({ checked }: ButtonCheckboxEvent) {
    onRowCheckboxChange && onRowCheckboxChange({ checked, rowId: rowId });
  }

  return (
    <StCell className={className}>
      <CheckBox id={`checkbox_${rowId}`} value={rowId} onChange={onChange} checked={checked} />
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
