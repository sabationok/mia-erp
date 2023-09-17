import { IProductImage } from '../../../redux/products/products.types';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FilterOption } from '../../ModalForm/ModalFilter';
import FlexBox from '../../atoms/FlexBox';
import SvgIcon from '../../atoms/SvgIcon/SvgIcon';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import ButtonGroup from '../../atoms/ButtonGroup';
import styled from 'styled-components';

export enum ImageSetSrcType {
  img_preview = 'img_preview',
  img_1x = 'img_1x',
  img_2x = 'img_2x',
  webp = 'webp',
}
export const formAddImageSetTabs: FilterOption<ImageSetSrcType>[] = [
  { label: 'Preview', value: ImageSetSrcType.img_preview, required: true },
  { label: '1x', value: ImageSetSrcType.img_1x },
  { label: '2x', value: ImageSetSrcType.img_2x },
  { label: 'Webp', value: ImageSetSrcType.webp },
];
export interface FormAddImageSetData extends Omit<IProductImage, '_id' | 'createdAt' | 'updatedAt'> {}
export interface FormAddImageProps extends Omit<ModalFormProps<any, any, FormAddImageSetData>, 'onSubmit'> {
  onSubmit?: (data: FormAddImageSetData, setId?: string, setIndex?: number) => void;
  setId?: string;
  setIndex?: number;
  type?: ImageSetSrcType;
}
const FormAddImageSet = ({
  title,
  fillHeight = true,
  onSubmit,
  onClose,
  defaultState,
  type,
  ...props
}: FormAddImageProps) => {
  const { register, watch, handleSubmit } = useForm<FormAddImageSetData>({ defaultValues: defaultState });
  const [current, setCurrent] = useState<FilterOption<ImageSetSrcType> | undefined>(formAddImageSetTabs[0]);
  const formValues = watch();

  const onValid = (data: FormAddImageSetData) => {
    onSubmit && onSubmit(data);
    onClose && onClose();
  };

  return (
    <ModalForm
      title={title || 'Додати новий сет зображень'}
      fillHeight={fillHeight}
      {...props}
      onClose={onClose}
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

        {current?.value && (
          <InputLabel label={current?.label?.replace('img_', 'image ').toUpperCase()} required={current?.required}>
            <InputText
              {...register(current?.value, { required: current?.required })}
              value={formValues[current?.value as never]}
              placeholder={'Впишіть або вставте посилання на зображення'}
              required={current?.required}
            />
          </InputLabel>
        )}

        <FlexBox padding={'8px 0'}>
          <ButtonGroup
            options={formAddImageSetTabs}
            defaultIndex={type ? formAddImageSetTabs.findIndex(el => el.value === type) : 0}
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
export default FormAddImageSet;
