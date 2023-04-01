import React, { useState } from 'react';
import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';
import DirList from '../DirList/DirList';
import { founder } from 'utils';
import styled from 'styled-components';
import useCountsService from 'redux/counts/useCountsService.hook';
import { ICount } from 'data/counts.types';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FormCreateCount, { FormCreateCountProps } from './FormCreateCount';

export interface DirCountsProps extends ModalFormProps {
  title: string;
}

const DirCounts: React.FC<DirCountsProps> = props => {
  const modal = useModalProvider();
  const { counts } = useCountsService();
  const [filteredData, setFilteredData] = useState<ICount[]>(counts);

  function onDelete() {}
  function onEdit(_id: string) {
    modal.handleOpenModal<FormCreateCountProps>({
      ModalChildren: FormCreateCount,
      modalChildrenProps: { title: 'Створення рахунку', _id },
    });
  }
  function onCreateChild(owner?: string) {
    modal.handleOpenModal<FormCreateCountProps>({
      ModalChildren: FormCreateCount,
      modalChildrenProps: { title: 'Створення рахунку', owner },
    });
  }

  return (
    <StModalForm
      {...props}
      onOptSelect={({ value }) => {
        setFilteredData(founder({ searchParam: 'type', searchQuery: value, data: counts }));
      }}
    >
      <Box>
        <DirList
          onDelete={onDelete}
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
