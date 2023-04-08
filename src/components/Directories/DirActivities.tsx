import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';
import React from 'react';
import styled from 'styled-components';
import DirList from './DirList/DirList';

export interface DirActivitiesProps extends ModalFormProps {
  title: string;
}

const DirActivities: React.FC<DirActivitiesProps> = ({ ...props }) => {
  return (
    <StModalForm {...props}>
      <DirList list={[]} />
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  width: max-content;
  min-height: 50vh;

  & .modalFooter {
    padding: 8px;
  }

  & .tOverHead {
    padding: 8px;
  }
`;
export default DirActivities;
