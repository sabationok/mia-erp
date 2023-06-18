import React, { useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from '../DirList/DirList';
import useCountsService from 'redux/counts/useCountsService.hook';
import { CountType } from 'redux/counts/counts.types';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FormCreateCount, { FormCreateCountProps } from './FormCreateCount';
import { CountFilterOpt, DirBaseProps } from '../dir.types';
import translate from '../../../lang';
import { useEntryListData, useFilteredLisData } from '../../../hooks';

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
  const [current, setDirType] = useState<CountType>('ACTIVE');

  function onEdit(_id: string) {
    const count = getById(_id);
    modal.handleOpenModal<FormCreateCountProps>({
      ModalChildren: FormCreateCount,
      modalChildrenProps: {
        title: `Редагування ${count?.parent ? 'суб-рахунку' : 'рахунку'}: "${count?.label || count?.name}"`,
        _id,
        type: current,
        onSubmit: data => {
          console.log(data);
        },
        count: count,
      },
    });
  }

  function onCreateChild(parent?: string) {
    modal.handleOpenModal<FormCreateCountProps>({
      ModalChildren: FormCreateCount,
      modalChildrenProps: {
        title: translate('createChildCount'),
        type: current,
        onSubmit: data => {
          create({ data: { ...data, parent } });
        },
        create: true,
      },
    });
  }

  function onCreateParent() {
    modal.handleOpenModal({
      ModalChildren: FormCreateCount,
      modalChildrenProps: {
        title: translate('createParentCount'),
        type: current,
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
      window.confirm(`Видалити ${count?.parent ? 'суб-рахунок' : 'рахунок'}: "${count?.label || count?.name}"`)
    ) {
      deleteById({ data: { _id } });
    }
  }

  const fd = useFilteredLisData({
    searchParam: 'type',
    searchQuery: current,
    data: counts,
  });
  const el = useEntryListData(fd, 'parent');

  return (
    <ModalForm
      {...props}
      onOptSelect={({ value }: CountFilterOpt) => {
        value && setDirType(value);
      }}
    >
      <DirList
        list={fd}
        entryList={el}
        onDelete={onDelete}
        onEdit={onEdit}
        onCreateChild={onCreateChild}
        createParentTitle={translate('createParentCount')}
        onCreateParent={onCreateParent}
        currentLevel={0}
      />
    </ModalForm>
  );
};

export default DirCounts;
