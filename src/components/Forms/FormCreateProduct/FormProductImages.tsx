import FlexBox from '../../atoms/FlexBox';
import { IProductImage } from '../../../redux/products/products.types';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { useModalService } from '../../ModalProvider/ModalProvider';
import { useForm } from 'react-hook-form';
import SvgIcon from '../../atoms/SvgIcon/SvgIcon';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import { FilterOption } from '../../ModalForm/ModalFilter';
import ButtonGroup from '../../atoms/ButtonGroup';

export interface FormProductImagesProps {
  onSetImage?: (image: IProductImage) => void;
  onSelect?: (imageInfo: IProductImage) => void;
  initialData?: IProductImage[];
}
const FormProductImages: React.FC<FormProductImagesProps> = ({ onSetImage, initialData }) => {
  const modalS = useModalService();
  const [formData, setFormData] = useState<Partial<IProductImage>[]>([]);

  const addImageInfo = (info: FormAddImageData) => {
    setFormData(prev => [...prev, info]);
  };
  const removeImageData = (index: number) => {
    setFormData(prev => prev.filter((_el, idx) => idx === index));
  };

  const renderImageInfo = (src: string, title: string) => {
    return (
      <FlexBox
        fillWidth
        overflow={'hidden'}
        gap={4}
        height={'115px'}
        border={'1px solid lightgrey'}
        borderRadius={'2px'}
        style={{ position: 'relative' }}
      >
        {src && <img src={src} alt={title} style={{ width: '100%' }} />}

        <ImageBottom padding={'4px'} fillWidth>
          <Text $size={12} $weight={500} color={'#fff'}>
            {title}
          </Text>
        </ImageBottom>
      </FlexBox>
    );
  };

  const ImageBottom = styled(FlexBox)`
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 5;

    background-color: rgba(26, 26, 26, 0.2);
    backdrop-filter: blur(3px);
  `;

  const renderImages = useMemo(() => {
    return formData?.map((imageInfo, index) => {
      const renderInnerData = formAddImageTabs.map(el => renderImageInfo(imageInfo[el.value] as never, el.label));

      return (
        <FlexBox width={'90px'} gap={6}>
          {renderInnerData}
        </FlexBox>
      );
    });
  }, [formData]);

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

        <ButtonIcon
          variant={'textExtraSmall'}
          onClick={() => {
            modalS.open({
              ModalChildren: FormAddImage,
              modalChildrenProps: {
                onSubmit: data => {
                  addImageInfo(data);
                },
              },
            });
          }}
        >
          {'Додати'}
        </ButtonIcon>
      </FlexBox>

      <FlexBox fxDirection={'row'} gap={8} padding={'8px 0'} overflow={'auto'}>
        {renderImages}
      </FlexBox>
    </FlexBox>
  );
};

const formAddImageTabs: FilterOption<keyof FormAddImageData>[] = [
  { label: 'Preview', value: 'img_preview', required: true },
  { label: '1x', value: 'img_1x' },
  { label: '2x', value: 'img_2x' },
  { label: 'Webp', value: 'webp' },
];

export interface FormAddImageData extends Omit<IProductImage, '_id' | 'createdAt' | 'updatedAt'> {}
export interface FormAddImageProps extends Omit<ModalFormProps, 'onSubmit'> {
  onSubmit?: (data: FormAddImageData) => void;
}
const FormAddImage = ({ title, fillHeight = true, onSubmit, onClose, ...props }: FormAddImageProps) => {
  const { register, watch, handleSubmit } = useForm<FormAddImageData>();
  const [current, setCurrent] = useState<FilterOption<keyof FormAddImageData> | undefined>(formAddImageTabs[0]);
  const formValues = watch();

  const onValid = (data: FormAddImageData) => {
    onSubmit && onSubmit(data);
    onClose && onClose();
  };

  const renderInput = useMemo(() => {
    return (
      current?.value && (
        <InputLabel label={current?.label?.replace('img_', 'image ').toUpperCase()} required={current?.required}>
          <InputText
            {...register(current?.value, { required: current?.required })}
            value={formValues[current?.value as never]}
            placeholder={'Впишіть або вставте посилання на зображення'}
            required={current?.required}
          />
        </InputLabel>
      )
    );
  }, [current?.label, current?.required, current?.value, formValues, register]);

  return (
    <ModalForm
      title={title || 'Додати нове зображення'}
      fillHeight={fillHeight}
      {...props}
      onSubmit={handleSubmit(onValid)}
    >
      <FormContentGrid>
        <FlexBox fillWidth fillHeight alignItems={'center'} overflow={'hidden'}>
          {current?.value && formValues[current?.value] ? (
            <Image src={formValues[current?.value] as never} />
          ) : (
            <AddImageBox>
              <SvgIcon icon={'plus'} size={'56px'} />

              <input name={'img_preview'} type={'file'} className={'visually-hidden'} />
            </AddImageBox>
          )}
        </FlexBox>

        {renderInput}

        <FlexBox padding={'8px 0'}>
          <ButtonGroup
            options={formAddImageTabs}
            onSelect={info => {
              setCurrent(info.option);
            }}
          />
        </FlexBox>
      </FormContentGrid>
    </ModalForm>
  );
};
const FormContentGrid = styled.div`
  flex: 1;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content min-content;
  gap: 6px;

  padding: 8px;
  overflow: hidden;
`;
const AddImageBox = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
  max-height: 100%;

  fill: ${p => p.theme.sideBarBorderColor};

  border-radius: 2px;
  border: 2px solid ${p => p.theme.sideBarBorderColor};

  transition: ${p => p.theme.globals.timingFnMui};
  &:hover {
    fill: ${p => p.theme.accentColor.base};
    border-color: ${p => p.theme.accentColor.light};
  }
`;

const Image = styled.img`
  //min-width: 100px;
  //max-width: 100px;
  //
  //height: 145px;

  max-height: 100%;
`;
export default FormProductImages;
