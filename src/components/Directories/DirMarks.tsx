import ModalForm from 'components/ModalForm/ModalForm';
import React from 'react';
import styled from 'styled-components';
import DirList from './DirList/DirList';
import { DirBaseProps } from './dir.types';

export interface DirMarksProps extends DirBaseProps {

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
