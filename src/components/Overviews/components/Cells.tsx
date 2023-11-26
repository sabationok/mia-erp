import FlexBox from '../../atoms/FlexBox';
import React, { useEffect, useMemo, useState } from 'react';
import FormCreateVariation from '../../Forms/FormProduct/FormCreateVariationOverlay';
import { IProperty } from '../../../types/properties.types';
import styled, { useTheme } from 'styled-components';
import { Text } from '../../atoms/Text';
import { useDirectoriesSelector, useProductsSelector } from '../../../redux/selectors.store';
import FormSelectPropertiesOverlay from '../../Forms/FormProduct/FormSelectPropertiesOverlay';
import { IProduct, ProductStatusEnum } from '../../../types/products.types';
import { formAddImageSetTabs } from '../../Forms/FormProduct/FormAddImageSet';
import FormProductImages from '../../Forms/FormProduct/FormProductImagesOverlay';
import ImagePreviewSmall from '../../atoms/ImagePreviewSmall';
import { IProductCategoryDirItem } from '../../../types/dir.types';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import FormProductCategoriesOverlay from '../../Forms/FormProduct/FormSelectCategoriesOverlay';
import { OverlayHandler } from '../../AppPages/PageProductOverview/PageCurrentProductProvider';
import { checks, numberWithSpaces } from '../../../utils';
import { t } from '../../../lang';
import FormProductDefaultsOverlay from '../../Forms/FormProduct/FormProductDefaultsOverlay';
import Changer from '../../atoms/Changer';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { productStatusesData } from '../../../data/products.data';
import { getStatusData } from '../../../data/statuses.data';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { ToastService } from '../../../services';
import { IPriceListItem } from '../../../types/priceManagement.types';

export type RenderOverviewCellComponent<Data = any> = React.FC<{
  cell: OverviewCellProps<Data>;
  setOverlayContent: OverlayHandler;
  data?: Data;
}>;

export interface OverviewCellProps<Data = any> {
  value?: string | number;
  title?: string;
  gridArea?: keyof Data | string;
  CellComponent?: RenderOverviewCellComponent<Data>;
  getValue?: (data: Data) => React.ReactNode | undefined | null;
}

export const OverviewTextCell: RenderOverviewCellComponent = ({ cell, data }) => {
  const value = cell.getValue ? cell.getValue(data) : null;

  return (
    <Cell>
      <CellText $isTitle $size={12}>
        {cell?.title}
      </CellText>

      <FlexBox
        fillWidth
        flex={1}
        fxDirection={'row'}
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
        overflow={'hidden'}
        style={{ minHeight: 24 }}
      >
        <CellText $isTitle={!value} $weight={500}>
          {value || t('undefined')}
        </CellText>
      </FlexBox>
    </Cell>
  );
};

export const ProductStatusChangerCell: RenderOverviewCellComponent<IProduct> = ({ cell, data }) => {
  const [canEdit, setCanEdit] = useState(false);
  const [current, setCurrent] = useState<ProductStatusEnum | undefined>(data?.approved);

  const service = useAppServiceProvider()[ServiceName.products];

  const currentStatusData = useMemo(() => getStatusData(current), [current]);

  const canAccept = useMemo(() => {
    return current !== data?.approved;
  }, [current, data?.approved]);
  const handleCancelPress = () => {
    setCurrent(data?.approved ?? (productStatusesData[0].value as never));
    setCanEdit(false);
  };

  const handleAcceptPress = () => {
    service.updateById({
      data: { _id: data?._id, data: { approved: current }, refreshCurrent: true },
      onSuccess: () => {
        setCanEdit(false);
        ToastService.success('Product updated');
      },
    });
  };

  useEffect(() => {
    if (data?.approved) {
      setCurrent(data.approved);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Cell style={{ minHeight: 'max-content' }}>
      <CellHeader
        title={cell?.title}
        onCancelPress={handleCancelPress}
        onEditPress={() => setCanEdit(true)}
        editMode={canEdit}
      />

      <FlexBox
        fillWidth
        flex={1}
        justifyContent={'flex-end'}
        alignItems={'stretch'}
        overflow={'hidden'}
        style={{ minHeight: 24 }}
        gap={8}
      >
        {canEdit ? (
          <>
            <Changer
              disabled={!canEdit}
              options={productStatusesData}
              currentOption={{ value: current }}
              onChange={e => setCurrent(e?.value as never)}
            />

            <FlexBox fxDirection={'row'} gap={8} fillWidth>
              <ButtonIcon variant={'outlinedSmall'} disabled={!canAccept} onClick={handleCancelPress}>
                {t('Cancel')}
              </ButtonIcon>

              <ButtonIcon variant={'filledSmall'} disabled={!canAccept} flex={1} onClick={handleAcceptPress}>
                {t('Ok')}
              </ButtonIcon>
            </FlexBox>
          </>
        ) : (
          <Tag
            style={{
              alignSelf: 'flex-end',
              borderColor: currentStatusData?.backgroundColor,
              backgroundColor: currentStatusData?.backgroundColor,
            }}
          >
            <CellText $isTitle={!current} $weight={600} $align={'right'}>
              {t(current || 'undefined')}
            </CellText>
          </Tag>
        )}
      </FlexBox>
    </Cell>
  );
};

export const ProductDefaultsCell: RenderOverviewCellComponent<IProduct> = ({ data, cell, setOverlayContent }) => {
  const theme = useTheme();
  const warehouse = data?.warehouse;
  const supplier = data?.supplier;

  const renderVariationTags = useMemo(() => {
    const variation = data?.variation;
    const tagsData: { title: string; value?: number | string }[] = [
      { title: t('Label'), value: variation?.label },
      { title: t('Bar-code'), value: variation?.barCode },
      {
        title: t('SKU'),
        value: variation?.sku,
      },
      {
        title: t('Props q-ty'),
        value: variation?.properties?.length,
      },
    ];

    return tagsData.map((item, index) => {
      return (
        <FlexBox
          key={item?.title}
          fxDirection={'row'}
          justifyContent={'space-between'}
          padding={'4px 6px'}
          gap={6}
          fillWidth
        >
          <Text $size={11}>{`${item?.title}: `}</Text>
          <Text $size={12} $weight={600} $align={'right'}>
            {item?.value ?? '---'}
          </Text>
        </FlexBox>
      );
    });
  }, [data?.variation]);

  const priceInfoCellsData = useMemo(() => createPriceOverviewTagsData(data?.price), [data?.price]);

  const renderPriceInfo = useMemo(() => {
    return priceInfoCellsData.map((item, index) => {
      return (
        <FlexBox
          key={item?.title}
          fxDirection={'row'}
          justifyContent={'space-between'}
          padding={'4px 6px'}
          gap={6}
          fillWidth
        >
          <Text $size={11}>{`${item?.title}: `}</Text>
          <Text $size={12} $weight={600}>
            {numberWithSpaces(item?.amount || 0)}
            {checks.isNum(item?.percentage) && ` | ${numberWithSpaces(item?.percentage)}%`}
          </Text>
        </FlexBox>
      );
    });
  }, [priceInfoCellsData]);

  return (
    <Cell style={{ minHeight: 'max-content' }}>
      <CellHeader
        title={cell?.title}
        onOpenOverlayPress={() => {
          setOverlayContent({
            RenderComponent: FormProductDefaultsOverlay,
          });
        }}
      />

      <FlexBox fillWidth>
        <CellText $size={13} $weight={600} style={{ color: theme?.fontColorHeader }}>
          {t('warehouse')}
        </CellText>

        <FlexBox fillWidth flexWrap={'wrap'} fxDirection={'row'}>
          {[
            { label: t('Label'), value: warehouse?.label },
            { label: t('Code'), value: warehouse?.code },
          ].map(info => (
            <FlexBox fxDirection={'row'} justifyContent={'space-between'} padding={'4px 6px'} gap={6} fillWidth>
              <Text $size={11}>{`${info.label}`}</Text>
              <Text $size={12} $weight={600}>
                {info?.value || '---'}
              </Text>
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>

      <FlexBox fillWidth>
        <CellText $size={13} $weight={600} style={{ color: theme?.fontColorHeader }}>
          {t('supplier')}
        </CellText>

        {[
          { label: t('Label'), value: supplier?.label },
          { label: t('Code'), value: supplier?.code },
        ].map(info => (
          <FlexBox fxDirection={'row'} justifyContent={'space-between'} padding={'4px 6px'} gap={6} fillWidth>
            <Text $size={11}>{`${info.label}`}</Text>
            <Text $size={12} $weight={600}>
              {info?.value || '---'}
            </Text>
          </FlexBox>
        ))}
      </FlexBox>

      <FlexBox fillWidth gap={6}>
        <CellText $size={13} $weight={600} style={{ color: theme?.fontColorHeader }}>
          {t('variation')}
        </CellText>

        <FlexBox fillWidth>{renderVariationTags}</FlexBox>
      </FlexBox>

      <FlexBox fillWidth gap={6}>
        <CellText $size={13} $weight={600} style={{ color: theme?.fontColorHeader }}>
          {t('price')}
        </CellText>
        <FlexBox fillWidth>{renderPriceInfo}</FlexBox>
      </FlexBox>
    </Cell>
  );
};
export const CategoriesCell: RenderOverviewCellComponent<IProduct> = ({ cell, setOverlayContent, data }) => {
  const categories = useDirectoriesSelector(ApiDirType.CATEGORIES_PROD).directory;
  const selectedCategoryIds = useMemo(() => {
    return data?.categories?.map(el => el._id) ?? [];
  }, [data?.categories]);

  const renderItems = useMemo(() => {
    return categories.map((c, index) => {
      return <NotActiveTreeDataItem key={`cat_${c._id}`} selectedIds={selectedCategoryIds} item={c} />;
    });
  }, [categories, selectedCategoryIds]);

  return (
    <Cell style={{ minHeight: 'max-content' }}>
      <CellHeader
        title={cell?.title}
        openOverlayButtonTitle={'Змінити'}
        onOpenOverlayPress={() => {
          setOverlayContent({
            RenderComponent: FormProductCategoriesOverlay,
          });
        }}
      />

      <FlexBox
        fillWidth
        fxDirection={'row'}
        justifyContent={'flex-end'}
        flexWrap={'wrap'}
        // overflow={'hidden'}
        gap={8}
        style={{ height: 'max-content', minHeight: 26 }}
      >
        {renderItems}
      </FlexBox>
    </Cell>
  );
};

const NotActiveTreeDataItem: React.FC<{
  item: IProductCategoryDirItem;
  lvl?: number;
  index?: number;
  selectedIds: string[];
}> = ({ item, lvl = 0, selectedIds }) => {
  const renderChildren = useMemo(() => {
    return item?.childrenList?.map((item, index) => {
      return (
        <NotActiveTreeDataItem
          key={`item_lvl_${lvl}_${item._id}`}
          item={item}
          index={index}
          lvl={lvl + 1}
          selectedIds={selectedIds}
        />
      );
    });
  }, [item?.childrenList, lvl, selectedIds]);

  const isSelected = useMemo(() => {
    return selectedIds.includes(item._id);
  }, [item._id, selectedIds]);
  return (
    <>
      {isSelected && (
        <CategoryItem fxDirection={'row'} alignItems={'center'} padding={'0 2px 0 12px'} gap={2}>
          {item?.parent?.label && `${item?.parent?.label}/`}
          {`${item?.label}`}
        </CategoryItem>
      )}
      {renderChildren}
    </>
  );
};

export const VariationsTemplateCell: RenderOverviewCellComponent = ({ cell, setOverlayContent, data }) => {
  return (
    <Cell padding={'4px'}>
      <CellHeader
        title={cell.title}
        openOverlayButtonTitle={'Перегляд'}
        onOpenOverlayPress={() => {
          setOverlayContent({ RenderComponent: FormCreateVariation, props: { create: true } });
        }}
      />

      <FlexBox
        fillWidth
        fxDirection={'row'}
        gap={8}
        height={'24px'}
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
        overflow={'hidden'}
      >
        <CellText $disabled={!data?.template?.label} $weight={500}>{`${data?.template?.label}`}</CellText>
      </FlexBox>
    </Cell>
  );
};

interface OverviewPropertyComponentProps {
  item: IProperty;
  selectedItems?: string[];
  data?: IProduct;
  index: number;
}

export const ImagesCell: RenderOverviewCellComponent<IProduct> = ({ data, cell, setOverlayContent }) => {
  const renderImageSets = useMemo(() => {
    return data?.images?.map((set, index) => {
      return (
        <ImagesSetBox key={`set_${set?._id || index}`} fxDirection={'row'} gap={2} overflow={'auto'}>
          {formAddImageSetTabs.map(el => (
            <ImagePreviewSmall key={`img_${el.value}`} src={set[el.value] || ''} title={el.label} disabled />
          ))}
        </ImagesSetBox>
      );
    });
  }, [data?.images]);

  return (
    <Cell style={{ minHeight: 'max-content', padding: '4px 0' }}>
      <CellHeader
        title={cell?.title}
        onOpenOverlayPress={() => {
          setOverlayContent({ RenderComponent: FormProductImages });
        }}
      />

      <FlexBox gap={2} height={'max-content'} padding={'8px 0'} style={{ minHeight: 26 }}>
        {renderImageSets}
      </FlexBox>
    </Cell>
  );
};

export const StaticProperties: RenderOverviewCellComponent<IProduct> = ({ cell, setOverlayContent, data }) => {
  const templates = useProductsSelector().properties;

  const template = useMemo(() => {
    return templates.find(t => t._id === data?.template?._id);
  }, [data?.template?._id, templates]);

  const availableProperties = useMemo(() => {
    return template?.childrenList?.filter(prop => !prop.isSelectable);
  }, [template?.childrenList]);

  const selectedItems = useMemo(() => {
    return data?.properties?.map(p => p._id);
  }, [data?.properties]);

  const renderProperties = useMemo(() => {
    return availableProperties?.map((prop, index) => {
      return (
        <OverviewPropertyComponent
          key={`prop-${prop?._id}`}
          {...{ index, setOverlayContent, item: prop, selectedItems }}
        />
      );
    });
  }, [availableProperties, setOverlayContent, selectedItems]);

  // const renderPropertiesFromVariations = useMemo(() => {
  //   const propsFromVariations = data?.variations?.map(vr => vr.properties)?.flat(1);
  //
  //
  //   const valuesSet: Record<string, IPropertyValue> = Object.assign(
  //     {},
  //     ...(propsFromVariations?.map(value => (value ? { [value?._id]: value } : null)) ?? [])
  //   );
  //
  //   return Object.values(valuesSet).map(el => {
  //     return <FlexBox key={`prop_value_${el._id}`}>{el.label}</FlexBox>;
  //   });
  // }, [data?.variations]);

  return (
    <Cell
      padding={'4px 4px 8px'}
      gap={8}
      className={'PROPERTIES_LIST_CELL'}
      style={{ minHeight: renderProperties && renderProperties?.length > 0 ? 'max-content' : 50 }}
    >
      <CellHeader
        title={cell?.title}
        onOpenOverlayPress={() => {
          if (!template) return;

          setOverlayContent({
            RenderComponent: FormSelectPropertiesOverlay,
          });
        }}
      />

      <FlexBox fillWidth gap={8} alignItems={renderProperties && renderProperties?.length > 0 ? 'stretch' : 'flex-end'}>
        {renderProperties && renderProperties?.length > 0 ? (
          renderProperties
        ) : (
          <CellText $weight={500}>{t('undefined')}</CellText>
        )}

        {/*{renderPropertiesFromVariations}*/}
      </FlexBox>
    </Cell>
  );
};

const OverviewPropertyComponent: React.FC<OverviewPropertyComponentProps> = ({ item, selectedItems }) => {
  const renderValues = useMemo(() => {
    return item.childrenList
      ?.filter(el => selectedItems?.includes(el._id))
      ?.map((value, index) => {
        return (
          <CategoryItem key={`prop-v-${value._id}`} className={'PROP_VALUE'} maxWidth={'130px'}>
            {value.label}
          </CategoryItem>
        );
      });
  }, [item.childrenList, selectedItems]);

  return (
    <FlexBox className={'PROPERTY'} gap={8} alignItems={'flex-end'}>
      <FlexBox alignItems={'center'} fxDirection={'row'} fillWidth gap={8}>
        <CellText $size={13} $weight={600}>
          {item?.label}
        </CellText>
      </FlexBox>

      <FlexBox fxDirection={'row'} flexWrap={'wrap'} fillWidth gap={6}>
        {renderValues && renderValues?.length > 0 ? renderValues : <Text $size={12}>{'---'}</Text>}
      </FlexBox>
    </FlexBox>
  );
};

const CellHeader = ({
  title = 'Title',
  openOverlayButtonTitle = t('Change'),
  onOpenOverlayPress,
  editButtonText = t('Change'),
  onEditPress,
  acceptButtonText = t('Ok'),
  onAcceptPress,
  editMode = false,
  canAccept = false,
  cancelButtonText = t('Cancel'),
  onCancelPress,
}: {
  title?: string;
  openOverlayButtonTitle?: string;
  onOpenOverlayPress?: () => void;
  editButtonText?: string;
  onEditPress?: () => void;
  acceptButtonText?: string;
  onAcceptPress?: () => void;
  cancelButtonText?: string;
  onCancelPress?: () => void;
  editMode?: boolean;
  editable?: boolean;
  canAccept?: boolean;
}) => {
  return (
    <FlexBox fxDirection={'row'} justifyContent={'space-between'}>
      <CellText $isTitle $size={12} style={{ marginRight: 'auto' }}>
        {title}
      </CellText>

      {onOpenOverlayPress && (
        <CellHeaderButton type={'button'} onClick={onOpenOverlayPress}>
          {openOverlayButtonTitle}
        </CellHeaderButton>
      )}

      {!editMode && onEditPress && (
        <CellHeaderButton type={'button'} onClick={onEditPress}>
          {editButtonText}
        </CellHeaderButton>
      )}

      {editMode && onCancelPress && (
        <CellHeaderButton type={'button'} onClick={onCancelPress}>
          {cancelButtonText}
        </CellHeaderButton>
      )}

      {editMode && onAcceptPress && (
        <CellHeaderButton type={'button'} disabled={!canAccept} onClick={onAcceptPress}>
          {acceptButtonText}
        </CellHeaderButton>
      )}
    </FlexBox>
  );
};

const CellHeaderButton = styled.button`
  display: flex;
  align-items: center;

  border: 0;
  background-color: transparent;

  font-family: inherit;
  font-weight: 600;
  font-size: 12px;
  padding: 0 6px;
  color: ${p => p.theme.accentColor.base};

  cursor: pointer;

  &[disabled] {
    pointer-events: none;
    color: ${p => p.theme.modalBorderColor};
  }
`;

const Cell = styled(FlexBox)`
  min-height: 50px;
  height: max-content;

  padding: 4px;
  gap: 4px;

  //overflow: hidden;

  &:not(:first-child) {
    border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  }
`;

const Tag = styled(FlexBox)`
  justify-content: center;
  align-items: center;

  padding: 4px 8px;
  min-height: 28px;
  color: #fcfcfc;

  background-color: ${p => p.theme.fieldBackgroundColor};

  //background-color: #f1f1f1;

  border-radius: 4px;
  border: 1px solid ${p => p.theme.modalBorderColor};
`;

const CellText = styled(Text)<{ $isTitle?: boolean }>`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;

  color: ${p =>
    p.$isTitle
      ? p.theme.globals.inputPlaceholderColor
      : p.$disabled
      ? p.theme.globals.inputPlaceholderColor
      : undefined};
`;
const ImagesSetBox = styled(FlexBox)`
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

// const DefaultTag = styled(FlexBox)`
//   justify-content: center;
//
//   border-radius: 2px;
//   padding: 4px 12px;
//   height: 28px;
//
//   background-color: ${p => p.theme.fieldBackgroundColor};
// `;
const CategoryItem = styled(FlexBox)`
  align-items: center;
  justify-content: center;

  flex-direction: row;

  padding: 4px;

  font-weight: 500;
  font-size: 12px;
  color: ${p => p.theme.fontColorSidebar};

  min-height: 28px;

  border-radius: 2px;
  //background-color: ${p => p.theme.field.backgroundColor};
  border: 1px solid ${p => p.theme.accentColor.base};
`;

export function createPriceOverviewTagsData(
  price?: IPriceListItem
): { title: string; amount?: number; percentage?: number }[] {
  return [
    { title: t('Input'), amount: price?.in },
    { title: t('Output'), amount: price?.out },
    {
      title: t('Commission'),
      ...price?.commission,
    },
    {
      title: t('Markup'),
      ...price?.markup,
    },
    {
      title: t('Discount'),
      ...price?.discount,
    },
    {
      title: t('Bonus'),
      ...price?.bonus,
    },
    {
      title: t('Cashback'),
      ...price?.cashback,
    },
  ];
}
