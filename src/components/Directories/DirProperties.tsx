import React, { useEffect, useMemo, useState } from 'react';
import { useModalProvider } from 'Providers/ModalProvider/ModalProvider';
import { IDirInTreeProps } from '../../types/dir.types';
import TabSelector, { FilterOption } from '../atoms/TabSelector';
import ButtonIcon from '../atoms/ButtonIcon';
import { OffersService } from '../../hooks/useOffersService.hook';
import FlexBox, { FlexLi, FlexUl } from '../atoms/FlexBox';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { useOffersSelector } from '../../redux/selectors.store';
import {
  CreatePropertyDto,
  OfferTypeEnum,
  PropertyBaseEntity,
  PropertyEntity,
  PropertyLevelIsType,
} from '../../types/offers';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { MaybeNull, OnlyUUID, Values } from '../../types/utils.types';
import ModalBase from '../atoms/Modal';
import { Text } from '../atoms/Text';
import { offerTypeFilterOptions } from '../../data/modalFilterOptions.data';
import { CustomSelectHandler } from '../atoms/Inputs/CustomSelect';
import CreatePropertyModal from '../Modals/CreatePropertyModal';
import { Breadcrumps } from '../atoms/Breadcrumps';
import styled, { useTheme } from 'styled-components';
import { t } from '../../i18e';
import ButtonSwitch from '../atoms/ButtonSwitch';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import InputLabel from 'components/atoms/Inputs/InputLabel';
import { useAppDispatch } from '../../redux/store.store';
import { getAllPropertiesThunk } from '../../redux/products/properties/properties.thunks';
import { TreeRouterProvider, useTreeRouter } from '../../Providers/TreeRouter/TreeProvider';

export interface DirPropertiesProps
  extends IDirInTreeProps<
    ApiDirType.PROPERTIES_PRODUCTS,
    CreatePropertyDto,
    CreatePropertyDto,
    PropertyEntity,
    OffersService,
    PropertyLevelIsType & { onSuccess?: (data: PropertyEntity) => void }
  > {}

export interface DiPropertiesRenderItemProps<
  Item extends PropertyBaseEntity = PropertyBaseEntity,
  ParentItem extends PropertyBaseEntity = PropertyBaseEntity,
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
  isSelectable?: boolean;
};

// function getLevelTypeByParent(parent: PropertyBaseEntity) {
//   switch (parent?.levelType) {
//     case PropertyLevelTypeEnum.group:
//       return PropertyLevelTypeEnum.prop;
//     case PropertyLevelTypeEnum.prop:
//       return PropertyLevelTypeEnum.value;
//     default:
//       return PropertyLevelTypeEnum.group;
//   }
// }

const DirProperties: React.FC<DirPropertiesProps> = props => {
  const state = useOffersSelector();

  const map = useMemo(
    () =>
      new Map(Object.entries(state.propertiesDataMap).filter(e => Boolean(e[1]))) as Map<string, PropertyBaseEntity>,
    [state.propertiesDataMap]
  );
  return (
    <TreeRouterProvider treeMap={map} rootId={''}>
      <DirPropertiesInner {...props} />
    </TreeRouterProvider>
  );
};

const DirPropertiesInner: React.FC<DirPropertiesProps> = ({
  // availableLevels = 3,
  title,
  onClose,
}) => {
  const state = useOffersSelector();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { navTo, goBack, currentId, currentNode, currentNodeChildren, breadcrumbs, treeMap } =
    useTreeRouter<PropertyBaseEntity>();

  const loaders = useLoaders<'getAll' | string>({ getAll: { content: 'Refreshing properties' } });
  const modalSrv = useModalProvider();
  const [filerData, setFilerData] = useState<FilterData>({
    type: OfferTypeEnum.GOODS,
    isSelectable: false,
  });

  const roots = useMemo(() => {
    if (currentNodeChildren?.length) return currentNodeChildren;

    return state.propertiesKeysMap.root?.length
      ? (state.propertiesKeysMap.root.map(treeMap.get.bind(treeMap)).filter(Boolean) as PropertyBaseEntity[])
      : [];
  }, [currentNodeChildren, state.propertiesKeysMap, treeMap]);

  const currentData = useMemo(() => {
    const _current: PropertyBaseEntity | undefined = currentNode;
    const _parent: PropertyBaseEntity | undefined = currentNode?.parent;
    const _filtered: PropertyBaseEntity[] = [];

    const _ids = _current ? state.propertiesKeysMap?.[_current._id] || [] : [];

    for (const id of _ids) {
      const item = state.propertiesDataMap?.[id];
      if (item?.isSelectable === filerData.isSelectable) {
        if (item) {
          _filtered.push(item);
        }
      }
    }

    const _levelIs: PropertyLevelIsType = _current?.levelType ? { [_current?.levelType]: true } : {};

    return {
      levelIs: _levelIs,
      current: _current,
      parent: _parent,
      children: _filtered,
    };
  }, [currentNode, filerData.isSelectable, state.propertiesDataMap, state.propertiesKeysMap]);

  const registerTabSelector = <Name extends keyof FilterData>(
    name: Name
  ): {
    onOptSelect: CustomSelectHandler<FilterOption<FilterData[Name], PropertyBaseEntity>>;
    defaultValue: FilterData[Name];
  } => {
    return {
      onOptSelect: option => {
        if (name === 'type') {
          // setStack([]);
        }
        setFilerData(prev => (option ? { ...prev, [name]: option.value } : prev));
      },
      defaultValue: filerData[name],
    };
  };

  const onSetCurrentHandler = (item: PropertyBaseEntity) => {
    navTo(item._id);
    dispatch(
      getAllPropertiesThunk({
        data: { params: { dataView: 'list', parentId: item._id } },
        onLoading: loaders.onLoading('getAll'),
      })
    );
    // setStack(prev => prev.concat([item]));
  };
  const onGoBackHandler = () => {
    if (breadcrumbs.length) return goBack();
    // if (stack.length) {
    //   setStack(prev => prev.splice(0, prev.length - 1));
    // } else {
    onClose && onClose();
    // }
  };
  useEffect(() => {
    // if (Object.keys(state.propertiesDataMap).length) return;

    dispatch(
      getAllPropertiesThunk({
        data: {
          params: { dataView: 'list' },
        },
        onLoading: loaders.onLoading('getAll'),
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentData.current?._id) return;
    if (currentData.children.length) return;
    dispatch(
      getAllPropertiesThunk({
        data: {
          params: { dataView: 'list', parentId: currentData.current?._id },
        },
        onLoading: loaders.onLoading('getAll'),
      })
    );
    // eslint-disable-next-line
  }, [currentData, dispatch]);

  const onAddNewHandler = () => {
    const parent = currentData.current;
    modalSrv.open({
      ModalChildren: CreatePropertyModal,
      modalChildrenProps: {
        parent,
        defaultState: {
          type: parent?.type ?? filerData?.type,
          isSelectable: currentData.levelIs?.prop ? parent?.isSelectable : filerData?.isSelectable,
        },
      },
    });
  };
  const canGoNext = breadcrumbs?.length <= 3;
  const canAddNew = breadcrumbs?.length <= 2;

  const onEditCurrentHandler = () => {
    currentData.current &&
      modalSrv.open({
        ModalChildren: CreatePropertyModal,
        modalChildrenProps: {
          parent: currentData.parent,
          updateId: currentData.current._id,
        },
      });
  };

  return (
    <ModalBase title={title} fillHeight onBackPress={onGoBackHandler} contentContainerProps={{ padding: '0 8px' }}>
      <TabSelector
        {...registerTabSelector('type')}
        optionProps={{ fitContentH: true }}
        options={offerTypeFilterOptions}
      />

      <FlexBox>
        <Breadcrumps stack={breadcrumbs} onItemSelect={item => navTo(item._id)} />

        {breadcrumbs.length === 1 && (
          <FlexBox margin={'8px 0'}>
            <InputLabel label={t('Select type')}>
              <ButtonSwitch
                rejectLabel={t('Static')}
                acceptLabel={t('Dynamic')}
                value={filerData.isSelectable}
                onChange={val => {
                  setFilerData(prev => {
                    return { ...prev, isSelectable: val };
                  });
                }}
              />
            </InputLabel>
          </FlexBox>
        )}
      </FlexBox>

      <FlexUl overflow={'auto'} flex={1} fillWidth padding={'8px 0'}>
        {(currentData?.current ? currentData?.children : roots)?.map(item => {
          return (
            item && (
              <RenderItem
                key={item?._id}
                onSelectPress={() => {
                  onSetCurrentHandler(item);
                }}
                item={item}
                // disabled={!state.propertiesKeysMap?.[item._id]?.length}
                disabled={!canGoNext}
              />
            )
          );
        })}
      </FlexUl>

      <FlexBox
        gap={8}
        fxDirection={'row'}
        overflow={'auto'}
        padding={'8px '}
        style={{
          borderTop: `1px solid ${theme.sideBarBorderColor}`,
        }}
      >
        {/*<BackButton variant={'onlyIcon'} icon={'arrowLeft'} iconSize={'100%'} size={'32px'} onClick={onGoBackHandler}>*/}
        {/*  /!*{t('Back')}*!/*/}
        {/*</BackButton>*/}

        <ButtonIcon variant={'outlinedMiddle'} onClick={onEditCurrentHandler} disabled={!currentId}>
          {t('Edit')}
        </ButtonIcon>

        <ButtonIcon variant={'outlinedMiddle'} onClick={onAddNewHandler} disabled={!canAddNew}>
          {t('Add')}
        </ButtonIcon>

        <ButtonIcon
          variant={'defaultMiddle'}
          justifySelf={'flex-end'}
          isLoading={loaders.isLoading.getAll}
          onClick={() => {
            dispatch(
              getAllPropertiesThunk({
                data: { params: { dataView: 'list' } },
                onLoading: loaders.onLoading('getAll'),
              })
            );
          }}
        >
          {t('Refresh')}
        </ButtonIcon>
      </FlexBox>
    </ModalBase>
  );
};

// const BackButton = styled(ButtonIcon)`
//   padding: 8px;
//   max-width: fit-content;
// `;
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
      <Text $weight={500}>{item?.label || item?._id}</Text>

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
