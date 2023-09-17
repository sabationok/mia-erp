import FlexBox from '../../atoms/FlexBox';
import { IProductImage } from '../../../redux/products/products.types';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';
import { useModalService } from '../../ModalProvider/ModalProvider';
import FormAddImageSet, { FormAddImageSetData, formAddImageSetTabs, ImageSetSrcType } from './FormAddImageSet';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';

export interface FormProductImagesProps {
  onSetImage?: (image: IProductImage) => void;
  onSelect?: (imageInfo: IProductImage) => void;
  initialData?: IProductImage[];
}
const FormProductImages: React.FC<FormProductImagesProps> = ({ onSetImage, initialData }) => {
  const modalS = useModalService();
  const [formData, setFormData] = useState<Partial<IProductImage>[]>([]);

  const handleAddImageSet = (info: FormAddImageSetData) => {
    setFormData(prev => [...prev, info]);
  };

  const handleAddImageToSet = useCallback((uri: string, type: ImageSetSrcType, setId?: string, setIndex?: number) => {
    setFormData(prev => {
      return prev.map((set, index) => {
        if (set._id === setId || setIndex === index) {
          return { ...set, [type as never]: uri };
        }
        return set;
      });
    });
  }, []);
  const handleRemoveImageFromSetSet = (setId?: string, setIndex?: number, imgType?: ImageSetSrcType) => {
    setFormData(prev =>
      prev.map((set, index) => {
        if (set._id === setId || setIndex === index) {
          return { ...set, [imgType as never]: '' };
        }
        return set;
      })
    );
  };

  const renderImagePreviews = useMemo(() => {
    return formData?.map((imageInfo, index) => {
      const renderInnerData = formAddImageSetTabs.map(el => {
        return (
          <ImageSmallPreview
            key={`small-prev_${el.value}`}
            src={imageInfo[el.value as never]}
            title={el.label}
            onEditPress={() => {
              modalS.open({
                ModalChildren: FormAddImageSet,
                modalChildrenProps: {
                  defaultState: imageInfo,
                  type: el.value,
                  onSubmit: data => {
                    el.value &&
                      data[el.value] &&
                      handleAddImageToSet(data[el.value] || '', el.value, imageInfo._id, index);
                  },
                },
              });
            }}
            onDeletePress={() => {
              handleRemoveImageFromSetSet('', index, el.value);
            }}
          />
        );
      });

      return (
        <FlexBox key={`imgs-set_${imageInfo._id || index}`} overflow={'auto'} gap={6} fxDirection={'row'}>
          {renderInnerData}
        </FlexBox>
      );
    });
  }, [formData, modalS]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <FlexBox fillWidth>
      <FlexBox padding={'8px 8px 0'} fxDirection={'row'} gap={8} justifyContent={'space-between'}>
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

      <FlexBox gap={8} padding={'8px 0'} overflow={'hidden'}>
        {renderImagePreviews}
      </FlexBox>
    </FlexBox>
  );
};
export interface ImageSmallPreviewProps {
  src: string;
  title: string;
  type?: string;
  onDeletePress?: () => void;
  onEditPress?: () => void;
  onAddNewPress?: () => void;
}
const ImageSmallPreview = ({ type, title, src, onDeletePress, onEditPress, onAddNewPress }: ImageSmallPreviewProps) => {
  return (
    <ImageSmallPreviewBox
      className={`ImagePreview_${title}`}
      fillWidth
      overflow={'hidden'}
      gap={4}
      height={'115px'}
      border={'1px solid lightgrey'}
      borderRadius={'2px'}
      style={{ position: 'relative' }}
    >
      <ImagePreviewTop
        className={'top'}
        fxDirection={'row'}
        gap={6}
        style={{ fill: '#fff' }}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={'2px 4px'}
        fillWidth
      >
        <ButtonIcon
          variant={'onlyIcon'}
          icon={'plus'}
          size={'18px'}
          disabled={!onAddNewPress}
          onClick={onAddNewPress}
        />
        <ButtonIcon variant={'onlyIcon'} icon={'edit'} size={'18px'} disabled={!onEditPress} onClick={onEditPress} />
        <ButtonIcon
          variant={'onlyIcon'}
          icon={'delete'}
          size={'18px'}
          disabled={!onDeletePress}
          onClick={onDeletePress}
        />
      </ImagePreviewTop>

      {src && <img src={src} alt={title} style={{ width: '100%' }} />}

      <ImagePreviewBottom padding={'4px'} fillWidth>
        <Text $size={12} $weight={500} color={'#fff'}>
          {title}
        </Text>
      </ImagePreviewBottom>
    </ImageSmallPreviewBox>
  );
};

const ImageSmallPreviewBox = styled(FlexBox)`
  &:hover {
    & .top {
      transform: translateY(0);
    }
  }
`;

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
const ImagePreviewTop = styled(FlexBox)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;

  min-height: 24px;

  transform: translateY(-100%);

  background-color: rgba(26, 26, 26, 0.2);
  backdrop-filter: blur(3px);

  transition: all ${p => p.theme.globals.timingFnMain};
`;
const ImagePreviewBottom = styled(FlexBox)`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;

  background-color: rgba(26, 26, 26, 0.2);
  backdrop-filter: blur(3px);
`;

export default FormProductImages;
