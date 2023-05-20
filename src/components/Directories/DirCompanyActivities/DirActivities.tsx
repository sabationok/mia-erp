import ModalForm from 'components/ModalForm';
import React from 'react';
import styled from 'styled-components';
import DirList from '../DirList/DirList';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import FormCreateActivity from './FormCreateActivity';
import useCompanyActivitiesService from 'redux/companyActivities/useActivitiesService.hook';
import { DirBaseProps } from '../dir.types';

export interface DirActivitiesProps extends DirBaseProps {}

const DirActivities: React.FC<DirActivitiesProps> = ({ ...props }) => {
  const modal = useModalProvider();
  const { activities, getById } = useCompanyActivitiesService();

  // const [filteredData, setFilteredData] = useState<ICompanyActivity[]>(companyActivities);

  function onCreateParent() {
    modal.handleOpenModal({
      ModalChildren: FormCreateActivity,
      modalChildrenProps: {
        title: 'Створити вид діяльності',
        onSubmit: submitData => {
          console.log('onCreateParent', submitData);
        },
      },
    });
  }

  function onDelete(id: string) {
    const activity = getById(id);
    if (
      window.confirm(
        `Бажаєте видалити вид діяльності: "${
          activity?.label || activity?.name
        }"`
      )
    ) {
      console.log(`deleted activity ${activity?.label || activity?.name}`);
    }
  }

  function onEdit(id: string) {
    const activity = getById(id);
    modal.handleOpenModal({
      ModalChildren: FormCreateActivity,
      modalChildrenProps: {
        title: `Редагувати: "${activity?.label || activity?.name}"`,
        activity,
        onSubmit: submitData => {
          console.log('onEdit', submitData);
        },
      },
    });
  }

  return (
    <StModalForm {...props}>
      <DirList
        list={activities}
        onDelete={onDelete}
        onEdit={onEdit}
        onCreateParent={onCreateParent}
        createParentTitle="Створити вид діяльності"
        currentLevel={0}
      />
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  height: 70vh;

  @media screen and (max-height: 480px) {
    height: 95vh;
  }
`;

export default DirActivities;
