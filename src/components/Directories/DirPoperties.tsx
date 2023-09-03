import React, { useEffect, useMemo, useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from './DirList/DirList';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { DirInTreeActionsCreatorType, IBaseDirItem, IDirInTreeProps } from './dir.types';
import { useAppServices, useFilteredLisData } from 'hooks';

import { FilterOpt } from '../ModalForm/ModalFilter';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { ServiceName } from '../../hooks/useAppServices.hook';
import { ProductsService } from '../../hooks/useProductsService.hook';
import { IProperty, IPropertyDto, ProductTypeEnum } from '../../redux/products/products.types';
import { Modals } from '../ModalProvider/Modals';
import t from '../../lang';
import { toast } from 'react-toastify';

export interface DirPropertiesProps
  extends IDirInTreeProps<any, ProductTypeEnum, IPropertyDto, IPropertyDto, IProperty, ProductsService> {}
const DirProperties: React.FC<DirPropertiesProps> = ({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  availableLevels = 3,
  actionsCreator,
  ...props
}) => {
  const service = useAppServices()[ServiceName.products];
  const modalService = useModalProvider();
  const [current, setCurrent] = useState(filterDefaultValue);
  const [loadedData, setLoadedData] = useState<IProperty[]>([]);

  const actions = useMemo(
    () => actionsCreator({ modalService, type: current, service, dirType }),
    [actionsCreator, current, dirType, modalService, service]
  );
  function handleFilterData({ value }: FilterOpt) {
    value && setCurrent(value);
  }

  const fList = useFilteredLisData<IBaseDirItem>({
    searchParam: filterSearchPath,
    searchQuery: current,
    data: loadedData,
  });

  useEffect(() => {
    service.getAllProperties({ data: { params: { createTreeData: true } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ModalForm
      style={{ maxWidth: 480 }}
      {...props}
      onOptSelect={handleFilterData}
      extraFooter={
        actions?.onCreateParent && (
          <CreateParent>
            <ButtonIcon variant="outlinedSmall" onClick={() => actions?.onCreateParent && actions.onCreateParent()}>
              {createParentTitle || 'Create parent'}
            </ButtonIcon>
          </CreateParent>
        )
      }
    >
      <DirList
        list={fList}
        currentLevel={0}
        availableLevels={availableLevels}
        createParentTitle={createParentTitle}
        {...actions}
      />
    </ModalForm>
  );
};
const CreateParent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  padding: 8px;
`;
export default DirProperties;
export const dirPropertiesActionsCreator: DirInTreeActionsCreatorType<
  any,
  ProductTypeEnum,
  IProperty,
  ProductsService
> = ({ modalService, service, type }) => {
  return {
    onCreateParent: () => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('createDirParentItem'),
          type,
          create: true,
          onSubmit: (data, o) => {
            service
              .createProperty({
                data: { data },
                onSuccess: rd => {
                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onCreateChild: (_, parent) => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('createDirChildItem'),
          type,
          defaultState: parent,
          create: true,
          onSubmit: (data, o) => {
            service
              .createProperty({
                data: { data: { ...data, parent } },
                onSuccess: rd => {
                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    // onUpdate: (_id, dataForUpdate, o) => {
    //   const modal = modalService.handleOpenModal({
    //     Modal,
    //     props: {
    //       title: updateItemTitle || t('update'),
    //       type,
    //
    //       edit: true,
    //       data: dataForUpdate,
    //       onSubmit: (data, o) => {
    //         service
    //           ?.update({
    //             data: { _id, data },
    //             onSuccess: rd => {
    //               o?.closeAfterSave && modal?.onClose();
    //               toast.success(`Updated: ${data.label}`);
    //             },
    //           })
    //           .then();
    //       },
    //     } ,
    //   });
    // },
    // onChangeArchiveStatus: (_id, status) => {
    //   service
    //     .changeArchiveStatus({
    //       data: { _id, data: { isArchived: status } },
    //       onSuccess: (rd, meta) => {
    //         console.log(rd);
    //         // toast.success(`${dataForUpdate.label} => ${status ? 'archived' : 'unarchived'}`);
    //       },
    //     })
    //     .then();
    // },
    // onChangeDisableStatus: (_id, status) => {
    //   service.changeDisabledStatus({ data: { _id, data: { disabled: status } }, onSuccess: (rd, meta) => {} }).then();
    // },
  };
};
