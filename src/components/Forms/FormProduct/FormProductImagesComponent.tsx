import FlexBox from '../../atoms/FlexBox';
import { IProductImage } from '../../../redux/products/products.types';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';
import { useModalService } from '../../ModalProvider/ModalProvider';
import FormAddImageSet, { FormAddImageSetData, formAddImageSetTabs, ImageSetSrcType } from './FormAddImageSet';
import ImagePreviewSmall from '../../atoms/ImagePreviewSmall';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { checks as check } from '../../../utils';

export interface FormProductImagesComponentProps {
  onChangeState?: (state: Partial<IProductImage>[]) => void;
  initialData?: Partial<IProductImage>[];
  renderHeader?: React.ReactNode;
  canEditOrder?: boolean;
  onClose?: () => void;
  contentContainerStyle?: React.CSSProperties;
  FooterComponent?: React.FC<{ onAddNewImageSetPress: () => void }>;
  HeaderComponent?: React.FC;
}
export interface FormProductImagesRenderComponentProps {}

const FormProductImagesComponent: React.FC<FormProductImagesComponentProps> = ({
  onChangeState,
  renderHeader,
  initialData,
  canEditOrder = true,
  onClose,
  FooterComponent,
  contentContainerStyle,
}) => {
  const modalS = useModalService();
  // const [isEditOrderMode,setIsEditOrderMode]=useState(false)
  const [formData, setFormData] = useState<(Partial<IProductImage> & { order: number })[]>([]);

  const handleAddImageSet = (info: FormAddImageSetData) => {
    setFormData(prev => {
      const updatedData = [...prev, { ...info, order: formData.length + 1 }];
      onChangeState && onChangeState(updatedData);

      return updatedData;
    });
  };
  const handleChangeOrder = (currentSetOrder: number, increment: number) => {
    setFormData(prev => {
      const newOrder = currentSetOrder + increment;

      const updateData = prev.map((set, index) => {
        if (newOrder > formData.length || newOrder < 1) {
          return set;
        }
        if (set.order === newOrder) {
          return { ...set, order: currentSetOrder };
        } else if (set.order === currentSetOrder) {
          return { ...set, order: newOrder };
        } else {
          return set;
        }
      });
      return updateData;
    });
  };

  const handleAddImageToSet = useCallback(
    ({ setId, setIndex, type, uri }: { setId?: string; setIndex?: number; uri?: string; type?: ImageSetSrcType }) => {
      setFormData(prev => {
        const updatedData = prev.map((set, index) => {
          if (setIndex === index) {
            return { ...set, [type as never]: uri };
          }
          return set;
        });
        onChangeState && onChangeState(updatedData);
        return updatedData;
      });
    },
    [onChangeState]
  );
  // TODO need refactoring
  const handleRemoveImageFromSet = useCallback(
    ({ setId, setIndex, type }: { setId?: string; setIndex?: number; type?: ImageSetSrcType }) => {
      const confirmed =
        type !== ImageSetSrcType.img_preview || window.confirm('Буде видалено цілий сет фото.\nПродовжити?');
      if (!confirmed) return;

      setFormData(prev => {
        const updatedData = prev
          .map((set, index) => {
            if (setIndex === index) {
              return { ...set, [type as never]: '' };
            }
            return set;
          })
          .filter(set => {
            return set.img_preview;
          })
          .map((set, index) => ({ ...set, order: index + 1 }));

        onChangeState && onChangeState(updatedData);
        return updatedData;
      });
    },
    [onChangeState]
  );

  const handleAddNewSet = () => {
    modalS.open({
      ModalChildren: FormAddImageSet,
      modalChildrenProps: {
        onSubmit: data => {
          handleAddImageSet(data);
        },
      },
    });
  };

  const renderImageSets = useMemo(() => {
    let dataForRender = formData;
    try {
      const sorted = formData.sort((a, b) => a?.order! - b?.order!);
      dataForRender = sorted;
    } catch (e) {}

    return dataForRender?.map((set, setIndex) => {
      const renderPreviews = formAddImageSetTabs.map(el => {
        return (
          <ImagePreviewSmall
            key={`small-prev_${el.value}`}
            src={set[el.value as never]}
            title={el.label}
            onEditPress={() => {
              modalS.open({
                ModalChildren: FormAddImageSet,
                modalChildrenProps: {
                  defaultState: set,
                  type: el.value,
                  onSubmit: data => {
                    el.value &&
                      data[el.value] &&
                      handleAddImageToSet({ setId: set?._id, setIndex, uri: data[el.value], type: el.value });
                  },
                },
              });
            }}
            onDeletePress={() => {
              handleRemoveImageFromSet({ setId: '', setIndex, type: el.value });
            }}
          />
        );
      });

      return (
        <ImagesSetBox
          key={`images-set_${set?._id || setIndex}`}
          gap={2}
          fxDirection={'row'}
          fillWidth
          overflow={'auto'}
        >
          {canEditOrder && (
            <SlotOrderChanger
              currentOrder={set?.order}
              canMoveUp={set?.order > 1}
              onMoveUpPress={() => {
                check.isNum(set.order) && handleChangeOrder(set.order, -1);
              }}
              canMoveDown={set?.order < formData.length}
              onMoveDownPress={() => {
                check.isNum(set.order) && handleChangeOrder(set.order, +1);
              }}
            />
          )}

          {renderPreviews}
        </ImagesSetBox>
      );
    });
  }, [canEditOrder, formData, handleAddImageToSet, handleChangeOrder, handleRemoveImageFromSet, modalS]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData as Required<IProductImage>[]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {renderHeader || (
        <FlexBox
          padding={'4px 8px'}
          height={'32px'}
          fxDirection={'row'}
          gap={2}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text $weight={600} $size={14}>
            {'Фото'}
          </Text>

          <AddImageSetButton type={'button'} onClick={onClose || handleAddNewSet}>
            {onClose ? 'Закрити' : 'Додати'}
          </AddImageSetButton>
        </FlexBox>
      )}

      <FlexBox gap={2} padding={'8px 0'} style={contentContainerStyle}>
        {renderImageSets}
      </FlexBox>

      {FooterComponent && <FooterComponent onAddNewImageSetPress={handleAddNewSet} />}
    </>
  );
};
const AddImageSetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${p => p.theme.accentColor.base};
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;

  background-color: transparent;
  border: 0;

  cursor: pointer;
`;

const ImagesSetBox = styled(FlexBox)`
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
const SlotOrderChanger = ({
  onMoveUpPress,
  onMoveDownPress,
  currentOrder,
  canMoveDown,
  canMoveUp,
}: {
  onMoveUpPress?: () => void;
  onMoveDownPress?: () => void;
  currentOrder?: number;
  canMoveDown?: boolean;
  canMoveUp?: boolean;
  inverse?: boolean;
}) => {
  return (
    <FlexBox
      style={{ minWidth: 'fit-content' }}
      fillHeight
      gap={6}
      justifyContent={'space-between'}
      overflow={'hidden'}
    >
      <ButtonIcon variant={'onlyIcon'} icon={'SmallArrowUp'} disabled={!canMoveUp} onClick={onMoveUpPress} />
      <Text $align={'center'} $weight={600}>
        {currentOrder || 0}
      </Text>
      <ButtonIcon variant={'onlyIcon'} icon={'SmallArrowDown'} disabled={!canMoveDown} onClick={onMoveDownPress} />
    </FlexBox>
  );
};

export default FormProductImagesComponent;
