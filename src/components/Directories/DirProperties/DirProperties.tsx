import React, { useMemo, useState } from 'react';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { IDirInTreeProps } from '../../../types/dir.types';

import TabSelector, { FilterOption } from '../../atoms/TabSelector';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { OffersService } from '../../../hooks/useProductsService.hook';
import FlexBox, { FlexLi, FlexUl } from '../../atoms/FlexBox';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { useProductsSelector } from '../../../redux/selectors.store';
import {
  IPropertyDto,
  PropertyBaseEntity,
  PropertyEntity,
  PropertyLevelIsType,
  PropertySelectableTypeEnum,
} from '../../../types/offers/properties.types';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { OnlyUUID } from '../../../redux/global.types';
import { MaybeNull, Values } from '../../../types/utils.types';
import ModalBase from '../../atoms/Modal';
import { Text } from '../../atoms/Text';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { productsFilterOptions, propertiesSelectableTypeFilterOptions } from '../../../data/modalFilterOptions.data';
import { OfferTypeEnum } from '../../../types/offers/offers.types';
import { CustomSelectHandler } from '../../atoms/Inputs/CustomSelect/CustomSelect';
import FormCreateProperty from '../../Forms/offers/properties/FormCreateProperty';
import { RenderStackHistory } from '../../atoms/RenderStackHistory';
import styled, { useTheme } from 'styled-components';
import { t } from '../../../lang';

export interface DirPropertiesProps
  extends IDirInTreeProps<
    ApiDirType.PROPERTIES_PRODUCTS,
    IPropertyDto,
    IPropertyDto,
    PropertyEntity,
    OffersService,
    PropertyLevelIsType & { onSuccess?: (data: PropertyEntity) => void }
  > {}

export interface DiPropertiesRenderItemProps<
  Item extends PropertyBaseEntity = PropertyBaseEntity,
  ParentItem extends PropertyBaseEntity = PropertyBaseEntity
> {
  item: Item;
  parent?: MaybeNull<ParentItem>;
  index: number;
  onCreateValue?: AppSubmitHandler<{ parent: MaybeNull<ParentItem> }, PropertyLevelIsType>;
  onCreateChild?: AppSubmitHandler<{ parent: MaybeNull<ParentItem> }, PropertyLevelIsType>;
  onUpdate?: AppSubmitHandler<{ _id: string; data: Item }, PropertyLevelIsType>;
  onDelete?: AppSubmitHandler<OnlyUUID>;
  onChangeSelectableStatus?: (_id: string, status: boolean) => void;
}

type FilterData = {
  type: Values<typeof OfferTypeEnum>;
  selectType: Values<typeof PropertySelectableTypeEnum>;
  isSelectable?: boolean;
};

const DirProperties: React.FC<DirPropertiesProps> = ({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  availableLevels = 3,
  title,
  actionsCreator,
  onClose,
  ...props
}) => {
  const state = useProductsSelector();
  const theme = useTheme();
  const service = useAppServiceProvider()[ServiceName.offers];
  const loaders = useLoaders<'getAll' | string>({ getAll: { content: 'Refreshing properties' } });
  const modalSrv = useModalProvider();
  const [stack, setStack] = useState<PropertyBaseEntity[]>([]);
  const [currentId, setCurrentId] = useState<string>('');
  const [filerData, setFilerData] = useState<FilterData>({
    type: OfferTypeEnum.GOODS,
    selectType: PropertySelectableTypeEnum.dynamic,
  });

  const registerTabSelector = <Name extends keyof FilterData>(
    name: Name
  ): {
    onOptSelect: CustomSelectHandler<FilterOption<FilterData[Name]>>;
    defaultValue: FilterData[Name];
  } => {
    return {
      onOptSelect: option => {
        setStack([]);
        setCurrentId('');
        setFilerData(prev => (option ? { ...prev, [name]: option.value } : prev));
      },
      defaultValue: filerData[name],
    };
  };

  const onSetCurrentHandler = (item: PropertyBaseEntity) => {
    setCurrentId(item._id);
    setStack(prev => prev.concat([item]));
  };
  const onGoBackHandler = () => {
    if (stack.length) {
      setStack(prev => {
        const newData = prev.splice(0, prev.length - 1);
        if (newData?.length) {
          setCurrentId(newData[newData.length - 1]?._id);
        } else {
          setCurrentId('');
        }

        return newData;
      });
    } else {
      onClose && onClose();
    }
  };

  const onAddNewHandler = () => {
    modalSrv.open({
      ModalChildren: FormCreateProperty,
      modalChildrenProps: {
        parent: current,
        defaultState: { type: filerData.type, isSelectable: filerData.selectType === 'dynamic' },
      },
    });
  };

  const onEditCurrentHandler = () => {
    current &&
      modalSrv.open({
        ModalChildren: FormCreateProperty,
        modalChildrenProps: {
          parent: current,
          defaultState: { ...current, type: filerData.type, isSelectable: filerData.selectType === 'dynamic' },
        },
      });
  };

  const { fList, root, current } = useMemo(() => {
    const item: PropertyBaseEntity | undefined = state.propertiesDataMap?.[currentId];
    const _rootIds = state.propertiesByTypeKeysMap.group.filter(itemId => {
      const item = state.propertiesDataMap?.[itemId];
      if (item?.selectableType) {
        return item?.type === filerData.type && item?.selectableType === filerData.selectType;
      }
      return item?.type === filerData.type;
    });
    const _filtered: PropertyBaseEntity[] = [];

    const _ids = item ? state.propertiesKeysMap?.[item._id] || [] : [];
    for (const id of _ids) {
      const item = state.propertiesDataMap?.[id];
      if (item) {
        _filtered.push(item);
      }
    }

    return {
      root: _rootIds?.map(itemId => {
        return state.propertiesDataMap?.[itemId] ?? null;
      }),
      current: item,
      fList: _filtered,
    };
  }, [
    currentId,
    filerData.selectType,
    filerData.type,
    state.propertiesByTypeKeysMap.group,
    state.propertiesDataMap,
    state.propertiesKeysMap,
  ]);

  // useEffect(() => {
  //   service.getAllProperties({
  //     onLoading: loaders.onLoading('getAll', undefined),
  //   });
  //
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <ModalBase title={title} fillHeight>
      <FlexBox padding={'0 8px'}>
        <TabSelector {...registerTabSelector('type')} filterOptions={productsFilterOptions} />
        <TabSelector {...registerTabSelector('selectType')} filterOptions={propertiesSelectableTypeFilterOptions} />

        <RenderStackHistory stack={stack} />
      </FlexBox>

      <FlexUl overflow={'auto'} flex={1} fillWidth padding={'8px'}>
        {(current ? fList : root)?.map(item => {
          return (
            item && (
              <RenderItem
                key={item?._id}
                onSelectPress={() => {
                  onSetCurrentHandler(item);
                }}
                item={item}
                // disabled={!state.propertiesKeysMap?.[item._id]?.length}
                disabled={stack?.length >= 2}
              />
            )
          );
        })}
      </FlexUl>

      <FlexBox
        gap={8}
        fxDirection={'row'}
        padding={'8px 8px 16px'}
        style={{
          borderTop: `1px solid ${theme.sideBarBorderColor}`,
        }}
      >
        <ButtonIcon
          variant={'outlinedSmall'}
          icon={'arrowLeft'}
          iconSize={'22px'}
          onClick={() => {
            onGoBackHandler();
          }}
        >
          {t('Back')}
        </ButtonIcon>

        <ButtonIcon variant={'outlinedSmall'} onClick={onEditCurrentHandler} disabled={!current}>
          {'Edit current'}
        </ButtonIcon>

        <ButtonIcon variant={'outlinedSmall'} onClick={onAddNewHandler}>
          {'Add new'}
        </ButtonIcon>
      </FlexBox>
    </ModalBase>
  );
};

const RenderItem = ({
  item,
  disabled,
  onSelectPress,
}: {
  onSelectPress?: () => void;
  item?: PropertyBaseEntity;
  disabled?: boolean;
}) => {
  return (
    <StyledBox
      key={item?._id}
      padding={'8px'}
      fxDirection={'row'}
      justifyContent={'space-between'}
      gap={8}
      alignItems={'center'}
    >
      <Text $weight={500}>{item?.label}</Text>
      <ButtonIcon
        variant={'onlyIconNoEffects'}
        icon={'arrowRight'}
        iconSize={'18px'}
        disabled={disabled}
        onClick={onSelectPress}
      ></ButtonIcon>
    </StyledBox>
  );
};

const StyledBox = styled(FlexLi)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  &:last-child {
    border-bottom: 1px solid ${p => p.theme.modalBorderColor};
  }
`;

export default DirProperties;
