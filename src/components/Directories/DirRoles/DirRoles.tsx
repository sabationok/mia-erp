import React, { useState } from 'react';
import ModalForm, { FilterOpt, ModalFormProps } from 'components/ModalForm/ModalForm';
import DirList from '../DirList/DirList';
import { founder } from 'utils';
import styled from 'styled-components';
import useCountsService from 'redux/counts/useCountsService.hook';
import { CountType, ICount } from 'data/counts.types';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';

export type CountFilterOpt = FilterOpt<CountType>;
export interface DirCountsProps extends ModalFormProps {
  title: string;
  filterOptions: CountFilterOpt[];
}

const DirCounts: React.FC<DirCountsProps> = props => {
  const modal = useModalProvider();
  const { counts, createNewCount, editCount, deleteCount } = useCountsService();

  function onEdit(_id: string) {
    modal.handleOpenModal({
      ModalChildren: () => null,
      modalChildrenProps: {
        title: 'Редагування ролі',
        _id,
        onSubmit: editCount,
        count: counts.find(el => el._id === _id),
      },
    });
  }

  function onCreateChild(owner?: string) {
    modal.handleOpenModal({
      ModalChildren: () => null,
      modalChildrenProps: {
        title: 'Створення ролі',

        onSubmit: createNewCount,
        create: true,
      },
    });
  }

  return (
    <StModalForm {...props}>
      <Box>
        <DirList onDelete={deleteCount} onEdit={onEdit} onCreateChild={onCreateChild} list={[]} entryList={[]} />
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
