import FlexBox from '../../../atoms/FlexBox';
import { OfferImageSlotEntity } from '../../../../types/offers/offers.types';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../../../atoms/Text';
import { useModalService } from '../../../../Providers/ModalProvider/ModalProvider';
import AddImageSetModal, { FormAddImageSetData } from './AddImageSetModal';
import ImagePreviewSmall from '../../../atoms/ImagePreviewSmall';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { t } from '../../../../i18e';
import { formAddImageSetTabs } from '../../../../data';
import { ImageSetSrcType } from '../../../../types/offers/offer-images.types';
import { isNumber } from 'lodash';
import UploadOfferImageModal from './UploadOfferImageModal';

export interface FormOfferImagesComponentProps {
  onChangeState?: (state: Partial<OfferImageSlotEntity>[]) => void;
  initialData?: Partial<OfferImageSlotEntity>[];
  renderHeader?: React.ReactNode;
  canEditOrder?: boolean;
  onClose?: () => void;
  hideLabel?: boolean;
  contentContainerStyle?: React.CSSProperties;
  FooterComponent?: React.FC<{ onAddNewImageSetPress: () => void }>;
  HeaderComponent?: React.FC;

  onlyPreviews?: boolean;

  offerId?: string;
}

const FormOfferImagesComponent: React.FC<FormOfferImagesComponentProps> = ({
  onChangeState,
  renderHeader,
  initialData,
  canEditOrder = true,
  onClose,
  FooterComponent,
  contentContainerStyle,
  hideLabel,
  onlyPreviews = true,
  offerId,
}) => {
  const modalS = useModalService();
  const [formData, setFormData] = useState<Partial<OfferImageSlotEntity>[]>([]);

  useEffect(() => {
    if (!initialData) {
      return;
    } else {
      setFormData(initialData);
    }
  }, [initialData]);
  const handleAddImageSet = (info: FormAddImageSetData) => {
    if (onChangeState) {
      const updatedData = [...(initialData ?? []), { ...info, order: formData.length + 1 }];
      onChangeState(updatedData);
    } else {
      setFormData(prev => {
        return [...prev, { ...info, order: formData.length + 1 }];
      });
    }
  };
  const handleChangeOrder = useCallback(
    (currentSetOrder: number, increment: number) => {
      setFormData(prev => {
        const newOrder = currentSetOrder + increment;

        return prev.map((set, index) => {
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
      });
    },
    [formData.length]
  );

  const handleAddImageToSet = useCallback(
    ({ setIndex, type, uri }: { setId?: string; setIndex?: number; uri?: string; type?: ImageSetSrcType }) => {
      if (onChangeState && initialData) {
        const updatedData = initialData?.map((set, index) => {
          if (setIndex === index) {
            return { ...set, [type as never]: uri };
          }
          return set;
        });
        onChangeState(updatedData);
      } else {
        setFormData(prev => {
          const updatedData = prev.map((set, index) => {
            if (setIndex === index) {
              return { ...set, [type as never]: uri };
            }
            return set;
          });
          return updatedData;
        });
      }
    },
    [initialData, onChangeState]
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
    modalS.create(AddImageSetModal, {
      onSubmit: data => {
        handleAddImageSet(data);
      },
    });
  };
  const handleUploadNewImgModalOpen = () => {
    modalS.create(UploadOfferImageModal, {
      offerId: offerId,
      onSuccess: data => {
        handleAddImageSet({
          img_preview: data.url,
        });
      },
    });
  };

  const renderImageSets = useMemo(() => {
    let dataForRender = formData;
    try {
      dataForRender = [...formData].sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));
    } catch (e) {
      dataForRender = formData;
    }

    return dataForRender?.map((slot, slotIndex) => {
      const renderPreviews = (onlyPreviews ? formAddImageSetTabs.slice(0, 1) : formAddImageSetTabs).map(
        (el, imgIndex) => {
          return (
            <ImagePreviewSmall
              key={`small-prev_${imgIndex}`}
              src={slot[el?.value as never]}
              title={el.label ?? ''}
              onEditPress={() => {
                modalS.open({
                  ModalChildren: AddImageSetModal,
                  modalChildrenProps: {
                    defaultState: slot,
                    type: el.value,
                    onSubmit: data => {
                      el.value &&
                        data[el.value] &&
                        handleAddImageToSet({
                          setId: slot?._id,
                          setIndex: slotIndex,
                          uri: data[el.value],
                          type: el.value,
                        });
                    },
                  },
                });
              }}
              onDeletePress={() => {
                handleRemoveImageFromSet({ setId: '', setIndex: slotIndex, type: el.value });
              }}
            />
          );
        }
      );

      return (
        <ImagesSetBox
          key={`images-set_${slot?._id || slotIndex}`}
          gap={6}
          fxDirection={'row'}
          maxWidth={'100%'}
          overflow={'hidden'}
        >
          {dataForRender?.length > 1 && canEditOrder && !onlyPreviews && (
            <SlotOrderChanger
              currentOrder={slot?.order}
              canMoveUp={(slot?.order ?? 0) > 1}
              onMoveUpPress={() => {
                isNumber(slot.order) && handleChangeOrder(slot.order, -1);
              }}
              canMoveDown={(slot?.order ?? 0) < formData.length}
              onMoveDownPress={() => {
                isNumber(slot.order) && handleChangeOrder(slot.order, +1);
              }}
            />
          )}

          <FlexBox className={'scrollBox'} overflow={'auto'} gap={6} fxDirection={'row'}>
            {renderPreviews}
          </FlexBox>
        </ImagesSetBox>
      );
    });
  }, [canEditOrder, formData, handleAddImageToSet, handleChangeOrder, handleRemoveImageFromSet, modalS, onlyPreviews]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData as Required<OfferImageSlotEntity>[]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <FlexBox maxWidth={'100%'} overflow={'hidden'} flex={1}>
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
            {!hideLabel && t('Images')}
          </Text>

          <ButtonIcon type={'button'} variant={'textExtraSmall'} onClick={onClose || handleAddNewSet}>
            {onClose ? t('Close') : t('Add')}
          </ButtonIcon>
        </FlexBox>
      )}

      <FlexBox
        gap={6}
        padding={'8px 0'}
        style={contentContainerStyle}
        fxDirection={onlyPreviews ? 'row' : 'column'}
        flexWrap={onlyPreviews ? 'wrap' : 'unset'}
      >
        {renderImageSets}
      </FlexBox>

      <FlexBox padding={'16px 8px'}>
        <ButtonIcon variant={'filled'} sizeType={'middle'} onClick={handleUploadNewImgModalOpen}>
          {'Upload'}
        </ButtonIcon>
      </FlexBox>

      {FooterComponent && <FooterComponent onAddNewImageSetPress={handleAddNewSet} />}
    </FlexBox>
  );
};

const ImagesSetBox = styled(FlexBox)`
  & .scrollBox {
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
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

export default FormOfferImagesComponent;
