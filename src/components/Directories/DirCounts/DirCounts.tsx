import React, { useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from '../DirList/DirList';
import useCountsService from 'redux/counts/useCountsService.hook';
import { CountType } from 'redux/counts/counts.types';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FormCreateCount, { FormCreateCountProps } from './FormCreateCount';
import { CountFilterOpt, DirBaseProps } from '../dir.types';
import translate from '../../../lang';
import t from '../../../lang';
import { useEntryListData, useFilteredLisData } from '../../../hooks';
import { toast } from 'react-toastify';

export interface DirCountsProps extends DirBaseProps {
  filterOptions: CountFilterOpt[];
}

const DirCounts: React.FC<DirCountsProps> = props => {
  const modals = useModalProvider();
  const {
    state: { counts },
    create,
    deleteById,
    getAll,
    findById,
  } = useCountsService();
  const [current, setDirType] = useState<CountType>('ACTIVE');

  function onEdit(_id: string) {
    const count = findById(_id);
    modals.handleOpenModal<FormCreateCountProps>({
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

  // function onCreateChild(parent?: string) {
  //   modal.handleOpenModal<FormCreateCountProps>({
  //     ModalChildren: FormCreateCount,
  //     modalChildrenProps: {
  //       title: translate('createChildCount'),
  //       type: current,
  //       onSubmit: data => {
  //         create({ data: { ...data, parent } });
  //       },
  //       create: true,
  //     },
  //   });
  // }
  //
  // function onCreateParent() {
  //   modal.handleOpenModal({
  //     ModalChildren: FormCreateCount,
  //     modalChildrenProps: {
  //       title: translate('createParentCount'),
  //       type: current,
  //       onSubmit: data => {
  //         create({ data });
  //       },
  //     },
  //   });
  // }

  function onCreateChild(parent: string) {
    const modal = modals.handleOpenModal({
      ModalChildren: FormCreateCount,
      modalChildrenProps: {
        title: t('createChildCount'),
        type: current,
        parent: findById(parent),
        onSubmit: data => {
          create({
            data: { ...data, parent },
            onSuccess(rd) {
              toast.success(`New count: ${rd.label}`);
              modal?.onClose();
            },
          });
        },
      },
    });
  }

  function onCreateParent() {
    const modal = modals.handleOpenModal({
      ModalChildren: FormCreateCount,
      modalChildrenProps: {
        title: t('createParentCount'),
        type: current,
        onSubmit: data => {
          create({
            data,
            onSuccess: rd => {
              modal?.onClose();

              toast.success(`New count: ${rd.label}`);
            },
          });
        },
      },
    });
  }

  function onDelete(_id: string) {
    if (window.confirm(`Delete item`))
      deleteById({
        data: { _id },
        onSuccess(data) {
          toast.success(`Deleted count: ${data?.label}`);
          if (data?.deletedChildrens) {
            toast.info(`Deleted children for ${data?.label}: ${data.deletedChildrens}`);
          }
        },
      });
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
