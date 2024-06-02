import { useRow } from '../TableRows/TableRow';
import CheckBox, { CustomCheckboxEventHandler } from './CellComponents/CheckBox';
import styled from 'styled-components';
import { memo } from 'react';
import { useTable } from '../TableList';

interface Props {
  title?: string;
  idx?: string | number;
  className?: string;
  checked?: boolean;
  onCheckboxChange?: CustomCheckboxEventHandler;
}

const CellCheckBox: React.FC<Props> = ({ className }) => {
  const { onCheckboxChange } = useTable();
  const { rowId, checked } = useRow();

  return (
    <StCell className={className}>
      <CheckBox
        id={`checkbox_${rowId}`}
        value={rowId}
        checked={checked}
        onChange={event => {
          onCheckboxChange && onCheckboxChange({ ...event, rowId: rowId, value: rowId });
        }}
      />
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
