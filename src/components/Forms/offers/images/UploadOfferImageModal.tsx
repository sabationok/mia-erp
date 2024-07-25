import { OfferImageSlotEntity } from '../../../../types/offers/offers.types';
import { ChangeEventHandler, useEffect, useState } from 'react';
import FlexBox, { FlexForm, FlexLabel } from '../../../atoms/FlexBox';
import SvgIcon from '../../../atoms/SvgIcon';
import styled from 'styled-components';
import { apiCall, FilesApi } from '../../../../api';
import { usePermissionsSelector } from '../../../../redux/selectors.store';
import { useForm } from 'react-hook-form';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { Text } from '../../../atoms/Text';
import * as YUP from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import DrawerBase from '../../../atoms/OverlayBase';
import { t } from 'lang';
import { useLoaders } from '../../../../Providers/Loaders/useLoaders.hook';
import { CreatedModal } from '../../../../Providers/ModalProvider/ModalProvider';

export interface FormAddImageSetData extends Partial<Omit<OfferImageSlotEntity, '_id' | 'createdAt' | 'updatedAt'>> {}

export interface AddImageSetModalProps extends CreatedModal {
  onSuccess?: (data: Partial<FilesApi.UploadFileWithLinkDto>) => void;

  offerId?: string;
}
const acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'];
const maxSizeInBytes = 5 * 1024 * 1024;
const acceptedFormatsErrorMessage = `Only "${acceptedFormats.map(key => key.replace('image/', '').toUpperCase()).join(', ')}" formats are accepted`;
const validation = YUP.object().shape({
  file: YUP.mixed()
    .test('fileType', acceptedFormatsErrorMessage, (v: any) => {
      const value: File = v;
      return value && acceptedFormats.includes(value.type);
    })
    .test('fileSize', t('File size must be less than 5MB'), (v: any) => {
      const value: File = v;
      return value && value.size <= maxSizeInBytes;
    }),
});

const _undefinedOrNullRegExp = /(?:undefined\/|null\/)/g;

const UploadOfferImageModal = ({ onSuccess, onClose, offerId, ...props }: AddImageSetModalProps) => {
  const loaders = useLoaders<'getLink' | 'uploadingImg' | 'saveLink' | 'processing'>({
    processing: { content: 'Loading...' },
  });
  const permissionsState = usePermissionsSelector();
  const form = useForm<FilesApi.UploadFileWithLinkDto>({
    defaultValues: {
      mimeType: 'image/jpeg',
      type: 'image',
      offerId: offerId,
      fileName: [permissionsState.permission.company?._id, offerId].filter(key => !!key).join('/'),
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const FV = form.watch();
  const [preview, setPreview] = useState(''); // Стан для збереження URL зображення
  const file = form.watch('file');
  const handleSubmitForm = (fData: typeof FV) => {
    apiCall(FilesApi.Client.uploadFile, {
      data: { ...fData, mimeType: fData.file?.type },
      logError: true,
      logRes: true,
      onLoading: loaders.onLoading('processing'),
      onSuccess: data => {
        console.log(data);
        onSuccess && onSuccess(data);
        onClose && onClose();
      },
      onError: () => {
        console.error({ fData });
      },
    });
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { files } = e.target;
    if (files) {
      const file = files[0];

      form.setValue('file', file, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      form.setValue('mimeType', file.type, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    }

    form
      .trigger('file', {})
      .then(() => {
        form.clearErrors('file');
      })
      .catch(() => {
        form.resetField('file', { keepError: true });
        form.resetField('mimeType', { keepError: true });
      });
  };
  const handleClear = () => {
    form.unregister('file');
    // setPreview('')
  };

  useEffect(() => {
    if (file) {
      try {
        const objectUrl = URL.createObjectURL(file);

        setPreview(objectUrl);

        // Очищуємо URL при змінах або при видаленні файлу
        return () => URL.revokeObjectURL(objectUrl);
      } catch (e) {
        console.log(e);
      }
    } else {
      setPreview('');
    }
  }, [file]);
  useEffect(() => {
    console.log({ preview, file });
  }, [preview]);
  return (
    <DrawerBase title={'Завантажити зображення'} fillHeight width={'360px'} onClosePress={onClose}>
      <FormContentGrid
        onSubmit={form.handleSubmit(handleSubmitForm, errors => {
          console.error('Upload image form error', errors);
        })}
      >
        <FlexBox fillWidth fillHeight alignItems={'center'} overflow={'hidden'}>
          <AddImageBox>
            {preview ? (
              <ImageBox>
                <Image src={preview} />
              </ImageBox>
            ) : (
              <SvgIcon className={'icon'} icon={'plus'} size={'56px'} />
            )}

            <input
              accept={acceptedFormats.join(', ')}
              // ! {...form.register('files', { required: true })}
              name={'file'}
              onChange={handleInputChange}
              type={'file'}
              className={'visually-hidden'}
            />

            {form.formState.errors?.file && (
              <ErrorBox padding={'16px'}>
                <Text $weight={600} $size={13}>
                  {form.formState.errors?.file.message}
                </Text>
              </ErrorBox>
            )}
          </AddImageBox>
        </FlexBox>

        <FlexBox padding={'16px 0 0'} gap={12} fxDirection={'row'}>
          <ButtonIcon sizeType={'middle'} variant={'def'} onClick={onClose}>
            {t('Back')}
          </ButtonIcon>

          <ButtonIcon sizeType={'middle'} variant={'outlined'} onClick={handleClear} margin={'0 auto 0 0'}>
            {t('Clear')}
          </ButtonIcon>

          <ButtonIcon type={'submit'} sizeType={'middle'} variant={'filled'}>
            {t('Accept')}
          </ButtonIcon>
        </FlexBox>
      </FormContentGrid>
    </DrawerBase>
  );
};
const FormContentGrid = styled(FlexForm)`
  flex: 1;
  padding: 16px 8px;
  overflow: hidden;
`;
const AddImageBox = styled(FlexLabel)<{ disabled?: boolean }>`
  position: relative;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
  max-height: 100%;

  & .icon {
    fill: ${p => p.theme.sideBarBorderColor};
    transition: ${p => p.theme.globals.timingFnMui};
  }

  border-radius: 4px;
  border: 2px solid ${p => p.theme.sideBarBorderColor};

  transition: ${p => p.theme.globals.timingFnMui};

  &:hover {
    & .icon {
      fill: ${p => p.theme.accentColor.base};
    }

    border-color: ${p => p.theme.accentColor.light};
  }

  &[disabled] {
    pointer-events: none;
  }
`;

const Image = styled.img`
  //min-width: 100px;
  //max-width: 100px;
  //
  //height: 145px;
  width: 100%;
`;
const ImageBox = styled(FlexBox)`
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  aspect-ratio: 1/35;

  overflow: hidden;
`;

const ErrorBox = styled(FlexBox)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  backdrop-filter: blur(3px);
`;
export default UploadOfferImageModal;

// ? 2023 Любін Офіс
// ? Лівчиці / Курятник 1 / Курятник 2
