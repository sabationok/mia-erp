import React, { useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from '../DirList/DirList';
import { founder } from 'utils';
import styled from 'styled-components';
import useCountsService from 'redux/counts/useCountsService.hook';
import { CountType, ICount } from 'redux/counts/counts.types';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FormCreateCount, { FormCreateCountProps } from './FormCreateCount';
import { CountFilterOpt, DirBaseProps } from '../dir.types';

export interface DirCountsProps extends DirBaseProps {
  filterOptions: CountFilterOpt[];
}

const DirCounts: React.FC<DirCountsProps> = props => {
  const modal = useModalProvider();
  const { counts, create, deleteById, getById } = useCountsService();
  const [filteredData, setFilteredData] = useState<ICount[]>([]);
  const [dirType, setDirType] = useState<CountType>('ACTIVE');

  function onEdit(_id: string) {
    const count = getById(_id);
    modal.handleOpenModal<FormCreateCountProps>({
      ModalChildren: FormCreateCount,
      modalChildrenProps: {
        title: `Редагування ${count?.owner ? 'суб-рахунку' : 'рахунку'}: "${
          count?.label || count?.name
        }"`,
        _id,
        type: dirType,
        onSubmit: data => {
          console.log(data);
        },
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
        onSubmit: data => {
          console.log('owner', owner);
        },
        create: true,
      },
    });
  }

  function onCreateParent() {
    modal.handleOpenModal({
      ModalChildren: FormCreateCount,
      modalChildrenProps: {
        title: 'Створити рахунок',
        type: dirType,
        onSubmit: (data: any) => {
          create(data);
        },
      },
    });
  }

  function handleFilterData({ value }: CountFilterOpt) {
    value && setDirType(value);
    value &&
      setFilteredData(
        founder({ searchParam: 'type', searchQuery: value, data: counts })
      );
  }

  return (
    <StModalForm {...props} onOptSelect={handleFilterData}>
      <DirList
        onDelete={deleteById}
        onEdit={onEdit}
        onCreateChild={onCreateChild}
        list={filteredData}
        entryList={filteredData.filter(el => !el?.owner)}
        createParentTitle="Створити рахунок"
        onCreateParent={onCreateParent}
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

export default DirCounts;
