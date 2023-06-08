import React, { useMemo, useState } from 'react';
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
  const {
    state: { counts },
    create,
    deleteById,
    getById,
  } = useCountsService();
  const [dirType, setDirType] = useState<CountType>('ACTIVE');

  function onEdit(_id: string) {
    const count = getById(_id);
    modal.handleOpenModal<FormCreateCountProps>({
      ModalChildren: FormCreateCount,
      modalChildrenProps: {
        title: `Редагування ${count?.owner ? 'суб-рахунку' : 'рахунку'}: "${count?.label || count?.name}"`,
        _id,
        type: dirType,
        onSubmit: data => {
          console.log(data);
        },
        count: count,
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
          create({ data: { ...data, owner } });
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
        onSubmit: data => {
          create({ data });
        },
      },
    });
  }

  function onDelete(_id: string) {
    const count = getById(_id);
    if (
      count &&
      window.confirm(`Видалити ${count?.owner ? 'суб-рахунок' : 'рахунок'}: "${count?.label || count?.name}"`)
    ) {
      deleteById({ data: { _id } });
    }
  }

  function handleFilterData({ value }: CountFilterOpt) {
    value && setDirType(value);
    // value && setFilteredData(founder({ searchParam: 'type', searchQuery: value, data: counts }));
  }

  const data = useMemo(
    () =>
      founder<ICount>({
        searchParam: 'type',
        searchQuery: dirType,
        data: counts,
      }),
    [counts, dirType]
  );
  const entryList = useMemo(() => data.filter(el => !el?.owner), [data]);

  return (
    <StModalForm {...props} onOptSelect={handleFilterData}>
      <DirList
        list={data}
        entryList={entryList}
        onDelete={onDelete}
        onEdit={onEdit}
        onCreateChild={onCreateChild}
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
