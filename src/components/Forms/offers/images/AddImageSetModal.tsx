import { OfferImageSlotEntity } from '../../../../types/offers/offers.types';
import ModalForm, { ModalFormProps } from '../../../ModalForm';
import { ChangeEventHandler, useRef, useState } from 'react';
import { FilterOption } from '../../../atoms/TabSelector';
import FlexBox from '../../../atoms/FlexBox';
import SvgIcon from '../../../atoms/SvgIcon';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import InputText from '../../../atoms/Inputs/InputText';
import ButtonsGroup from '../../../atoms/ButtonsGroup';
import styled from 'styled-components';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { ImageSetSrcType } from '../../../../types/offers/offer-images.types';
import { formAddImageSetTabs } from 'data';

export interface FormAddImageSetData extends Partial<Omit<OfferImageSlotEntity, '_id' | 'createdAt' | 'updatedAt'>> {}

export interface AddImageSetModalProps extends Omit<ModalFormProps<any, any, FormAddImageSetData>, 'onSubmit'> {
  onSubmit?: (data: Partial<FormAddImageSetData> , setId?: string, setIndex?: number) => void;
  setId?: string;
  setIndex?: number;
  type?: ImageSetSrcType;
}

const AddImageSetModal = ({
  title,
  fillHeight = true,
  onSubmit,
  onClose,
  defaultState,
  type,
  ...props
}: AddImageSetModalProps) => {
  const [current, setCurrent] = useState<FilterOption<ImageSetSrcType> | undefined>(formAddImageSetTabs[0]);
  const [formData, setFormData] = useState<FormAddImageSetData>(defaultState || {});
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmitForm = () => {
    onSubmit && onSubmit(formData);
    onClose && onClose();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleClear = () => {
    const key = current?.value;
    key && setFormData(prev => ({ ...prev, [key]: '' }));
  };

  return (
    <ModalForm
      title={title || 'Додати новий сет зображень'}
      fillHeight={fillHeight}
      {...props}
      width={'360px'}
      onClose={onClose}
      onSubmit={handleSubmitForm}
    >
      <FormContentGrid>
        <FlexBox fillWidth fillHeight alignItems={'center'} overflow={'hidden'}>
          {current?.value && formData[current?.value] ? (
            <Image src={formData[current?.value] as never} />
          ) : (
            <AddImageBox disabled>
              <SvgIcon icon={'plus'} size={'56px'} />

              <input name={'img_preview'} type={'file'} className={'visually-hidden'} disabled />
            </AddImageBox>
          )}
        </FlexBox>

        {current?.value && (
          <FlexBox fxDirection={'row'} gap={6} alignItems={'flex-end'}>
            <InputLabel label={current?.label?.replace('img_', 'image ').toUpperCase()} required={current?.required}>
              <InputText
                ref={inputRef}
                name={current?.value}
                value={formData[current?.value] || ''}
                onChange={handleInputChange}
                placeholder={'Впишіть або вставте посилання на зображення'}
                required={current?.required}
                autoFocus
              />
            </InputLabel>

            <ButtonIcon variant={'onlyIcon'} icon={'close'} size={'28px'} iconSize={'100%'} onClick={handleClear} />
          </FlexBox>
        )}

        <FlexBox padding={'8px 0'}>
          <ButtonsGroup
            options={formAddImageSetTabs}
            currentOption={current}
            // defaultIndex={type ? formAddImageSetTabs.findIndex(el => el.value === type) : 0}
            onSelect={info => {
              setCurrent(info.option);
              // inputRef.current?.focus({ preventScroll: true });
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
const AddImageBox = styled.label<{ disabled?: boolean }>`
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

  pointer-events: ${p => (p.disabled ? 'none' : 'all')};
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
export default AddImageSetModal;
