import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';
import React from 'react';
import styled from 'styled-components';
import DirList from './DirList/DirList';

export interface DirMarksProps extends ModalFormProps {
  title: string;

}

const DirMarks: React.FC<DirMarksProps> = ({ ...props }) => {
  return (
    <StModalForm {...props}>
      <DirList list={[]} />
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`

`;
export default DirMarks;
