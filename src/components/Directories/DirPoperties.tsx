import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ModalForm from 'components/ModalForm';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { DirInTreeActionsCreatorType, IBaseDirItem, IDirInTreeProps } from './dir.types';
import { useFilteredLisData } from 'hooks';

import { FilterOpt } from '../ModalForm/ModalFilter';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled, { useTheme } from 'styled-components';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { ProductsService } from '../../hooks/useProductsService.hook';
import { IProperty, IPropertyDto, ProductTypeEnum } from '../../redux/products/products.types';
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

type LevelType = { isGroup?: boolean; isProperty?: boolean; isValue?: boolean };

export interface DirPropertiesProps
  extends IDirInTreeProps<
    ApiDirType.PROPERTIES_PRODUCTS,
    ProductTypeEnum,
    IPropertyDto,
    IPropertyDto,
    IProperty,
    ProductsService,
    LevelType
  > {}
const DirProperties: React.FC<DirPropertiesProps> = ({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  availableLevels = 3,
  actionsCreator,
  title,
  ...props
}) => {
  const service = useAppServiceProvider()[ServiceName.products];
  const modalService = useModalProvider();
  const [current, setCurrent] = useState(filterDefaultValue);
  const [loadedData, setLoadedData] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);

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

  const onRefreshData = useCallback(() => {
    service
      .getAllProperties({
        data: { params: { createTreeData: true } },
        onSuccess: setLoadedData,
        onLoading: setLoading,
      })
      .then();
  }, [service]);

  useEffect(() => {
    onRefreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItems = useMemo(() => {
    return fList.map((item, index) => (
      <DirPropertyGroup
        key={`group_${item._id}`}
        item={item}
        index={index}
        onUpdate={(data, o) => {
          actions.onUpdate && actions.onUpdate(data._id, data.data, o);
          onRefreshData();
        }}
        onCreateValue={(data, o) => {
          actions?.onCreateValue && actions?.onCreateValue(data.parent._id, data?.parent, o);
          onRefreshData();
        }}
        onCreateChild={(data, o) => {
          actions?.onCreateChild && actions?.onCreateChild(data.parent._id, data?.parent, o);
          onRefreshData();
        }}
      />
    ));
  }, [actions, fList, onRefreshData]);
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
  const [isOpen, setIsOpen] = useState(true);
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
        padding={'6px 4px'}
        fxDirection={'row'}
        style={{
          borderBottomStyle: 'solid',
          borderBottomColor: theme.field.backgroundColor,
          borderBottomWidth: 1,
        }}
      >
        <FlexBox gap={6} fillHeight alignItems={'center'} flex={1} padding={'0 4px'} fxDirection={'row'}>
          <Text $weight={600} $size={18}>
            {item.label}
          </Text>
        </FlexBox>

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

        <ButtonIcon
          variant={'onlyIcon'}
          icon={isOpen ? 'SmallArrowDown' : 'SmallArrowDown'}
          size={'26px'}
          iconSize={'24px'}
          onClick={() => {
            setIsOpen(p => !p);
          }}
        />
      </FlexBox>

      {item.childrenList && item.childrenList?.length > 0 && (
        <FlexBox padding={isOpen ? '6px 8px' : ''} gap={6} fillWidth overflow={'hidden'} maxHeight={isOpen ? '' : '0'}>
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
    <StPropertyItem fillWidth gap={4}>
      <StPropertyItemHeader fillWidth padding={'4px'}>
        <FlexBox fillWidth fxDirection={'row'} gap={4} alignItems={'center'}>
          <Text style={{ flex: 1 }} $weight={600}>
            {item?.label}
          </Text>

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
      </StPropertyItemHeader>

      {item.childrenList && item.childrenList?.length > 0 && (
        <StPropertyItemContent fillWidth gap={4} padding={'8px 4px'}>
          {renderChildren}
        </StPropertyItemContent>
      )}

      <FlexBox fxDirection={'row'} gap={4} padding={'0 4px'} alignItems={'center'}>
        <Switch size={'26px'} checked={isSelectable} onChange={onChange} />
        <Text $size={12}>{'Доступно для вибору при формуванні замовлення'}</Text>
      </FlexBox>
    </StPropertyItem>
  );
};

const StPropertyItem = styled(FlexBox)`
  border: 1px solid ${p => p.theme.accentColor.base};
  border-left-width: 3px;

  overflow: hidden;
`;
const StPropertyItemHeader = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const StPropertyItemContent = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const DirPropertyValue: React.FC<DiPropertiesRenderItemProps> = ({ item, index, onUpdate, onDelete }) => {
  const theme = useTheme();

  return (
    <FlexBox fxDirection={'row'} gap={6} alignItems={'center'}>
      <FlexBox
        flex={1}
        padding={'4px 6px'}
        style={{ borderRadius: 2, marginLeft: 8, backgroundColor: theme.accentColor.light }}
      >
        <Text>{item?.label}</Text>
      </FlexBox>

      <ButtonIcon
        variant={'onlyIconNoEffects'}
        icon={'edit'}
        size={'26px'}
        iconSize={'24px'}
        onClick={() => {
          onUpdate && onUpdate({ _id: item._id, data: item }, { isValue: true });
        }}
      />

      <ButtonIcon variant={'onlyIconNoEffects'} icon={'archive'} size={'26px'} iconSize={'24px'} disabled />
    </FlexBox>
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
  ProductsService,
  IPropertyDto,
  LevelType
> = ({ modalService, service, type }) => {
  return {
    onCreateParent: () => {
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
                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onCreateChild: (_, parent, o) => {
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
                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onCreateValue: (_, parent, o) => {
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
                  o?.closeAfterSave && modal?.onClose();
                  toast.success(`Created: ${data.label}`);
                },
              })
              .then();
          },
        },
      });
    },
    onUpdate: (_id, defaultState, o) => {
      console.log('onUpdate options', o);
      const modal = modalService.handleOpenModal({
        Modal: Modals.FormCreateProperty,
        props: {
          title: t('update'),
          type,
          edit: true,
          ...o,
          defaultState,
          filterOptions: o?.isGroup ? productsFilterOptions : undefined,
          onSubmit: (data, o) => {
            service
              ?.updatePropertyById({
                data: { _id, data, params: { createTreeData: true } },
                onSuccess: rd => {
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
