import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';
import React, { useState } from 'react';
import styled from 'styled-components';
import DirList from '../DirList/DirList';
import { ICompanyActivity } from '../../../data/companyActivities.types';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import FormCreateCompanyActivity from './FormCreateCompanyActivity';
import useCompanyActivitiesService from 'redux/companyActivities/useCompanyActivitiesService.hook';


export interface DirCompanyActivitiesProps extends ModalFormProps {
  title: string;
}

const DirCompanyActivities: React.FC<DirCompanyActivitiesProps> = ({ ...props }) => {
  const modal = useModalProvider();
  const { companyActivities } = useCompanyActivitiesService();
  const [filteredData, setFilteredData] = useState<ICompanyActivity[]>(companyActivities);


  function onCreateParent() {
    modal.handleOpenModal({
      ModalChildren: FormCreateCompanyActivity,
      modalChildrenProps: {
        title: 'Створити вид діяльності',
        onSubmit: (submitData) => {
          console.log('onCreateParent', submitData);
        },
      },
    });
  }

  function onDelete() {
  }

  function onEdit() {
  }


  return (
    <StModalForm {...props}>
      <Box>
        <DirList
          list={filteredData}
          onDelete={onDelete}
          onEdit={onEdit}
          onCreateParent={onCreateParent}
          createParentTitle='Створити вид діяльності' />
      </Box>
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  height: 70vh;

  @media screen and (max-height: 480px) {
    height: 95vh;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  max-height: 100%;
  padding: 0 12px;
`;

export default DirCompanyActivities;
