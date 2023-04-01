import React from 'react';
import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';

import styled from 'styled-components';

export interface DirProjectsProps extends ModalFormProps {
  title: string;
}

const DirProjects: React.FC<DirProjectsProps> = props => {
  return (
    <StModalForm {...props}>
      <Box></Box>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  height: 70vh;
  resize: both;

  @media screen and (max-height: 480px) {
    height: 95vh;
  }
`;
const Box = styled.div`
  padding: 16px 16px;
`;

export default DirProjects;
