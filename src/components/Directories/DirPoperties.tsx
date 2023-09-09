import React, { useEffect, useMemo, useState } from 'react';
import ModalForm from 'components/ModalForm';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { DirInTreeActionsCreatorType, IBaseDirItem, IDirInTreeProps } from './dir.types';
import { useFilteredLisData } from 'hooks';

import { FilterOpt } from '../ModalForm/ModalFilter';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled, { useTheme } from 'styled-components';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { ProductsService } from '../../hooks/useProductsService.hook';
import { ProductTypeEnum } from '../../redux/products/products.types';
import { Modals } from '../ModalProvider/Modals';
import t from '../../lang';
import { toast } from 'react-toastify';
import FlexBox from '../atoms/FlexBox';
import { Text } from '../atoms/Text';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { OnlyUUID } from '../../redux/global.types';
import Switch from '../atoms/Switch';
import { OnCheckBoxChangeHandler } from '../TableList/tableTypes.types';
import { productsFilterOptions } from '../../data/directories.data';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { useProductsSelector } from '../../redux/selectors.store';
import { IProperty, IPropertyDto } from '../../redux/products/properties.types';

type LevelType = { isGroup?: boolean; isProperty?: boolean; isValue?: boolean };

export interface DirPropertiesProps
  extends IDirInTreeProps<
    ApiDirType.PROPERTIES_PRODUCTS,
    ProductTypeEnum,
    IPropertyDto,
    IPropertyDto,
    IProperty,
    ProductsService,
    LevelType & { onSuccess?: (data: IProperty[]) => void }
  > {}
const DirProperties: React.FC<DirPropertiesProps> = ({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  availableLevels = 3,
  title,
  actionsCreator,
  ...props
}) => {
  const service = useAppServiceProvider()[ServiceName.products];
  const { properties } = useProductsSelector();
  const modalService = useModalProvider();
  const [current, setCurrent] = useState(filterDefaultValue);
  // const [loadedData, setLoadedData] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);

  const actions = useMemo(() => {
    return actionsCreator({ modalService, type: current, service, dirType });
  }, [actionsCreator, current, dirType, modalService, service]);
  function handleFilterData({ value }: FilterOpt) {
    value && setCurrent(value);
  }

  const fList = useFilteredLisData<IBaseDirItem>({
    searchParam: filterSearchPath,
    searchQuery: current,
    data: properties,
  });

  useEffect(() => {
    service
      .getAllProperties({
        data: { params: { createTreeData: true } },
        // onSuccess: setLoadedData,
        onLoading: setLoading,
      })
      .then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItems = useMemo(() => {
    return fList.map((item, index) => (
      <DirPropertyGroup
        key={`group_${item._id}`}
        item={item}
        index={index}
        onUpdate={(data, o) => {
          actions.onUpdate && actions.onUpdate(data._id, data.data, { ...o });
        }}
        onCreateValue={(data, o) => {
          actions?.onCreateValue && actions?.onCreateValue(data.parent._id, data?.parent, { ...o });
        }}
        onCreateChild={(data, o) => {
          actions?.onCreateChild && actions?.onCreateChild(data.parent._id, data?.parent, { ...o });
        }}
      />
    ));
  }, [actions, fList]);

  return (
    <ModalForm
      style={{ maxWidth: 480 }}
      title={loading ? 'Loading ...' : title}
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
      <FlexBox gap={6} flex={1} overflow={'auto'} justifyContent={'flex-start'}>
        {renderItems}
      </FlexBox>
    </ModalForm>
  );
};

export interface DiPropertiesRenderItemProps {
  item: IProperty;
  index: number;
  onCreateValue?: AppSubmitHandler<{ parent: IProperty }, LevelType>;
  onCreateChild?: AppSubmitHandler<{ parent: IProperty }, LevelType>;
  onUpdate?: AppSubmitHandler<{ _id: string; data: IProperty }, LevelType>;
  onDelete?: AppSubmitHandler<OnlyUUID>;
}
const DirPropertyGroup: React.FC<DiPropertiesRenderItemProps> = ({
  item,
  onUpdate,
  onCreateChild,
  onDelete,
  onCreateValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const renderChildren = useMemo(() => {
    return item.childrenList?.map((el, index) => (
      <DirPropertyItem
        key={`property_${el?._id}`}
        item={el}
        index={index}
        {...{ onUpdate, onCreateChild, onDelete, onCreateValue }}
      />
    ));
  }, [item.childrenList, onCreateChild, onCreateValue, onDelete, onUpdate]);
  return (
    <FlexBox>
      <FlexBox
        gap={4}
        padding={'6px 8px'}
        fxDirection={'row'}
        style={{
          borderBottomStyle: 'solid',
          borderBottomColor: theme.sideBarBorderColor,
          borderBottomWidth: 1,
        }}
      >
        <FlexBox gap={6} fillHeight alignItems={'center'} flex={1} padding={'0 8px'} fxDirection={'row'}>
          <ButtonIcon
            variant={'onlyIcon'}
            icon={'plus'}
            size={'26px'}
            iconSize={'24px'}
            onClick={() => {
              onCreateChild && onCreateChild({ parent: item }, { isGroup: true });
            }}
          />

          <ButtonIcon
            variant={'onlyIcon'}
            icon={'edit'}
            size={'26px'}
            iconSize={'24px'}
            onClick={() => {
              onUpdate && onUpdate({ _id: item._id, data: item }, { isGroup: true });
            }}
          />
          <ButtonIcon variant={'onlyIcon'} icon={'archive'} size={'26px'} iconSize={'24px'} />

          <Text $weight={600} $size={18} $align={'right'} style={{ flex: 1 }}>
            {item.label}
          </Text>
        </FlexBox>

        <ButtonIcon
          variant={'onlyIcon'}
          icon={isOpen ? 'SmallArrowDown' : 'SmallArrowLeft'}
          size={'26px'}
          iconSize={'24px'}
          onClick={() => {
            setIsOpen(p => !p);
          }}
        />
      </FlexBox>

      {item.childrenList && item.childrenList?.length > 0 && (
        <FlexBox padding={isOpen ? '6px 8px' : ''} gap={6} flex={1} overflow={'hidden'} maxHeight={isOpen ? '' : '0'}>
          {renderChildren}
        </FlexBox>
      )}
    </FlexBox>
  );
};
const DirPropertyItem: React.FC<DiPropertiesRenderItemProps> = ({ item, index, onUpdate, onDelete, onCreateValue }) => {
  const [isSelectable, setIsSelectable] = useState(item?.isSelectable);

  const onChange: OnCheckBoxChangeHandler = e => {
    setIsSelectable(e.checked);
  };

  const renderChildren = useMemo(() => {
    return item.childrenList?.map((el, index) => (
      <DirPropertyValue
        key={`property_${el?._id}`}
        item={el}
        index={index}
        {...{ onUpdate, onDelete, onCreateValue }}
      />
    ));
  }, [item.childrenList, onCreateValue, onDelete, onUpdate]);
  return (
    <FlexBox fxDirection={'row'} fillWidth gap={8}>
      <StPropertyItem flex={1} gap={4}>
        <FlexBox fillWidth padding={'4px'}>
          <FlexBox fillWidth fxDirection={'row'} gap={4} alignItems={'center'}>
            <Text style={{ flex: 1 }} $weight={600}>
              {item?.label}
            </Text>
          </FlexBox>
        </FlexBox>

        <StPropertyItemContent fillWidth gap={4} padding={'8px 4px'} flex={1}>
          {item.childrenList && item.childrenList?.length > 0 ? (
            renderChildren
          ) : (
            <FlexBox fillHeight justifyContent={'center'} alignItems={'center'}>
              <Text>{'Додайте опції до характеристики'}</Text>
            </FlexBox>
          )}
        </StPropertyItemContent>

        <FlexBox fxDirection={'row'} gap={4} padding={'0 4px'} alignItems={'center'}>
          <Switch size={'26px'} checked={isSelectable} onChange={onChange} />
          <Text $size={12}>{'Доступно для вибору при формуванні замовлення'}</Text>
        </FlexBox>
      </StPropertyItem>

      <FlexBox gap={8}>
        <ButtonIcon
          variant={'onlyIcon'}
          icon={'plus'}
          size={'26px'}
          iconSize={'24px'}
          onClick={() => {
            onCreateValue && onCreateValue({ parent: item });
          }}
        />
        <ButtonIcon
          variant={'onlyIcon'}
          icon={'edit'}
          size={'26px'}
          iconSize={'24px'}
          onClick={() => {
            onUpdate && onUpdate({ _id: item._id, data: item }, { isProperty: true });
          }}
        />
        <ButtonIcon variant={'onlyIcon'} icon={'archive'} size={'26px'} iconSize={'24px'} disabled />
      </FlexBox>
    </FlexBox>
  );
};

const StPropertyItem = styled(FlexBox)`
  border: 1px solid ${p => p.theme.accentColor.base};
  border-left-width: 3px;

  overflow: hidden;
`;

const StPropertyItemContent = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const DirPropertyValue: React.FC<DiPropertiesRenderItemProps> = ({ item, index, onUpdate, onDelete }) => {
  const theme = useTheme();

  return (
    <DirPropertyValueBox
      fxDirection={'row'}
      gap={6}
      alignItems={'stretch'}
      style={{ borderRadius: 4, backgroundColor: theme.accentColor.light }}
    >
      <FlexBox flex={1} fillHeight padding={'4px 8px'} fxDirection={'row'} alignItems={'center'}>
        <Text $size={12} $weight={600}>
          {item?.label}
        </Text>
      </FlexBox>

      <DirPropertyValueActions
        className={'actions'}
        fillHeight
        padding={'0 8px'}
        fxDirection={'row'}
        gap={4}
        alignItems={'center'}
      >
        <ButtonIcon
          variant={'onlyIconNoEffects'}
          icon={'edit'}
          size={'26px'}
          iconSize={'24px'}
          onClick={() => {
            onUpdate && onUpdate({ _id: item._id, data: item }, { isValue: true });
          }}
        ></ButtonIcon>

        <ButtonIcon variant={'onlyIconNoEffects'} icon={'archive'} size={'26px'} iconSize={'24px'} disabled />
      </DirPropertyValueActions>
    </DirPropertyValueBox>
  );
};

const DirPropertyValueBox = styled(FlexBox)`
  overflow: hidden;
  height: 36px;

  &:hover {
    & .actions {
      right: 0;
      transform: translateX(0);
    }
  }
`;
const DirPropertyValueActions = styled(FlexBox)`
  //position: absolute;
  //
  //top: 0;
  //right: 0;
  //height: 100%;
  //z-index: 20;

  border-radius: 4px;
  background-color: ${p => p.theme.modalBackgroundColor};
  border: 2px solid ${p => p.theme.accentColor.light};

  transform: translateX(100%);

  transition: all ${p => p.theme.globals.timingFunctionMain};
`;

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
  ProductsService,
  IPropertyDto,
  LevelType & { onSuccess?: (data: IProperty[]) => void }
> = ({ modalService, service, type }) => {
  return {
    onCreateParent: options => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('createPropertiesGroup'),
          type,
          create: true,
          isGroup: true,
          onSubmit: (data, o) => {
            service
              .createProperty({
                data: { data, params: { createTreeData: true } },
                onSuccess: rd => {
                  options?.onSuccess && options?.onSuccess(rd);
                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onCreateChild: (_, parent, options) => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('createProperty'),
          type,
          defaultState: { parent },
          create: true,
          isProperty: true,
          onSubmit: (data, o) => {
            service
              .createProperty({
                data: { data: { ...data, parent }, params: { createTreeData: true } },
                onSuccess: rd => {
                  options?.onSuccess && options?.onSuccess(rd);
                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onCreateValue: (_, parent, options) => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('createPropertyValue'),
          type,
          defaultState: { parent },
          create: true,
          isValue: true,
          onSubmit: (data, o) => {
            service
              .createProperty({
                data: { data: { ...data, parent }, params: { createTreeData: true } },
                onSuccess: rd => {
                  options?.onSuccess && options?.onSuccess(rd);

                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onUpdate: (_id, defaultState, options) => {
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('update'),
          type,
          edit: true,
          ...options,
          defaultState,
          filterOptions: options?.isGroup ? productsFilterOptions : undefined,
          onSubmit: (data, o) => {
            service
              ?.updatePropertyById({
                data: { _id, data, params: { createTreeData: true } },
                onSuccess: rd => {
                  options?.onSuccess && options?.onSuccess(rd);

                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Updated: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
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
