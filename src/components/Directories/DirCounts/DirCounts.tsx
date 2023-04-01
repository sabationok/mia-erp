import React, { useState } from 'react';
import ModalForm, { FilterOpt, ModalFormProps } from 'components/ModalForm/ModalForm';
import DirList from '../DirList/DirList';
import { founder } from 'utils';
import styled from 'styled-components';
import useCountsService from 'redux/counts/useCountsService.hook';
import { CountType, ICount } from 'data/counts.types';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FormCreateCount, { CountFormData, FormCreateCountProps } from './FormCreateCount';

export type CountFilterOpt = FilterOpt<CountType>;
export interface DirCountsProps extends ModalFormProps {
  title: string;
  filterOptions: CountFilterOpt[];
}

const DirCounts: React.FC<DirCountsProps> = props => {
  const modal = useModalProvider();
  const { counts, createNewCount, editCount, deleteCount } = useCountsService();
  const [filteredData, setFilteredData] = useState<ICount[]>(counts);
  const [dirType, setDirType] = useState<CountType>('ACTIVE');

  function onEdit(_id: string) {
    modal.handleOpenModal<FormCreateCountProps>({
      ModalChildren: FormCreateCount,
      modalChildrenProps: {
        title: 'Редагування рахунку',
        _id,
        type: dirType,
        onSubmit: editCount,
        count: counts.find(el => el._id === _id),
      },
    });
  }

  function onCreateChild(owner?: string) {
    modal.handleOpenModal<FormCreateCountProps>({
      ModalChildren: FormCreateCount,
      modalChildrenProps: {
        title: 'Створення субрахунку',
        type: dirType,
        onSubmit: createNewCount,
        create: true,
      },
    });
  }

  function handleFilterData({ value }: FilterOpt<CountType>) {
    value && setDirType(value);
    value && setFilteredData(founder({ searchParam: 'type', searchQuery: value, data: counts }));
  }

  return (
    <StModalForm {...props} onOptSelect={handleFilterData}>
      <Box>
        <DirList
          onDelete={deleteCount}
          onEdit={onEdit}
          onCreateChild={onCreateChild}
          list={filteredData}
          entryList={filteredData.filter(el => !el?.owner)}
        />
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
  padding: 16px 16px;
`;

export default DirCounts;
