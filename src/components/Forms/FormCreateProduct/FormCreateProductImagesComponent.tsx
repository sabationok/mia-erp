import FlexBox from '../../atoms/FlexBox';
import { IProductImage } from '../../../redux/products/products.types';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';
import { useModalService } from '../../ModalProvider/ModalProvider';
import FormAddImageSet, { FormAddImageSetData, formAddImageSetTabs, ImageSetSrcType } from './FormAddImageSet';
import ImagePreviewSmall from '../../atoms/ImagePreviewSmall';

export interface FormProductImagesProps {
  onChangeState?: (state: Partial<IProductImage>[]) => void;
  initialData?: Partial<IProductImage>[];
  renderHeader?: React.ReactNode;
}

const FormCreateProductImagesComponent: React.FC<FormProductImagesProps> = ({
  onChangeState,
  renderHeader,
  initialData,
}) => {
  const modalS = useModalService();
  const [formData, setFormData] = useState<Partial<IProductImage>[]>([]);

  const handleAddImageSet = (info: FormAddImageSetData) => {
    setFormData(prev => {
      const updatedData = [...prev, info];
      onChangeState && onChangeState(updatedData);

      return updatedData;
    });
  };

  const handleAddImageToSet = useCallback(
    ({ setId, setIndex, type, uri }: { setId?: string; setIndex?: number; uri?: string; type?: ImageSetSrcType }) => {
      setFormData(prev => {
        const updatedData = prev.map((set, index) => {
          if ((setId && set?._id === setId) || setIndex === index) {
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

  const handleRemoveImageFromSet = useCallback(
    ({ setId, setIndex, type }: { setId?: string; setIndex?: number; type?: ImageSetSrcType }) => {
      const confirmed =
        type !== ImageSetSrcType.img_preview || window.confirm('Буде видалено цілий сет фото.\nПродовжити?');
      if (!confirmed) return;
      setFormData(prev => {
        const updatedData = prev
          .map((set, index) => {
            if ((setId && set._id === setId) || setIndex === index) {
              return { ...set, [type as never]: '' };
            }
            return set;
          })
          .filter(set => {
            return set.img_preview;
          });
        onChangeState && onChangeState(updatedData);
        return updatedData;
      });
    },
    [onChangeState]
  );

  const renderImageSets = useMemo(() => {
    return formData?.map((set, setIndex) => {
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
        <ImagesSetBox key={`imgs-set_${set?._id || setIndex}`} gap={6} fxDirection={'row'} fillWidth overflow={'auto'}>
          {renderPreviews}
        </ImagesSetBox>
      );
    });
  }, [formData, handleAddImageToSet, handleRemoveImageFromSet, modalS]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <FlexBox fillWidth>
      {renderHeader || (
        <FlexBox
          padding={'4px 8px'}
          height={'32px'}
          fxDirection={'row'}
          gap={8}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text $weight={600} $size={14}>
            {'Фото'}
          </Text>

          <AddImageSetButton
            type={'button'}
            onClick={() => {
              modalS.open({
                ModalChildren: FormAddImageSet,
                modalChildrenProps: {
                  onSubmit: data => {
                    handleAddImageSet(data);
                  },
                },
              });
            }}
          >
            {'Додати'}
          </AddImageSetButton>
        </FlexBox>
      )}

      <FlexBox gap={8} padding={'8px 0'} overflow={'hidden'}>
        {renderImageSets}
      </FlexBox>
    </FlexBox>
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

export default FormCreateProductImagesComponent;
