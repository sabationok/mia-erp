import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';
import React from 'react';
import styled from 'styled-components';
import DirList from '../DirList/DirList';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import FormCreateCompanyActivity from './FormCreateCompanyActivity';
import useCompanyActivitiesService from 'redux/companyActivities/useCompanyActivitiesService.hook';


export interface DirCompanyActivitiesProps extends ModalFormProps {
  title: string;
}

const DirCompanyActivities: React.FC<DirCompanyActivitiesProps> = ({ ...props }) => {
  const modal = useModalProvider();
  const { companyActivities, getById } = useCompanyActivitiesService();

  // const [filteredData, setFilteredData] = useState<ICompanyActivity[]>(companyActivities);


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


  function onDelete(id: string) {
    const activity = getById(id);
    if (window.confirm(`Бажаєте видалити вид діяльності: "${activity?.label || activity?.name}"`)) {
      console.log(`deleted activity ${activity?.label || activity?.name}`);
    }
  }

  function onEdit(id: string) {
    modal.handleOpenModal({
      ModalChildren: FormCreateCompanyActivity,
      modalChildrenProps: {
        companyActivity: getById(id),
        onSubmit: (submitData) => {
          console.log('onCreateParent', submitData);
        },
      },
    });
  }


  return (
    <StModalForm {...props}>
      <Box>
        <DirList
          list={companyActivities}
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
