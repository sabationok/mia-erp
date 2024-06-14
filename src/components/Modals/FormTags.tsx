import { TagTypeEnum } from '../../types/directories.types';
import { TagItemDto } from '../../types/tags.types';
import { useAppDispatch } from '../../redux/store.store';
import { useAppForm } from '../../hooks';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import _ from 'lodash';
import { createTagThunk, deleteTagThunk, updateTagThunk } from '../../redux/tags/tags.thunks';
import { toReqData } from '../../utils';
import ModalBase from '../atoms/Modal';
import { t } from '../../lang';
import { AccordionForm } from '../atoms/FormArea/AccordionForm';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import ButtonSwitch from '../atoms/ButtonSwitch';
import { Text } from '../atoms/Text';
import ButtonIcon from '../atoms/ButtonIcon';
import FlexBox, { FlexLabel } from '../atoms/FlexBox';
import { InputColor } from '../atoms/Inputs/InputColor';
import React from 'react';

export type ModalFormTagsProps = { type?: TagTypeEnum; defaultValues?: TagItemDto };

const ModalFormTags = ({ defaultValues }: ModalFormTagsProps) => {
  const dispatch = useAppDispatch();
  const _form = useAppForm<TagItemDto>({
    defaultValues: {
      isDisabled: false,
      isVisible: true,
      cmsConfigs: { colors: { font: '#fafafa', border: '#212121', background: '#212121' } },
      ...defaultValues,
    },
  });
  type LoadersKey = 'create' | 'update' | 'cms';

  const loaders = useLoaders<LoadersKey>();

  const canSubmit = Object.values(_.omit(_form.formState.dirtyFields, ['cmsConfigs'])).some(field => !!field);
  const canSubmitCms = Object.values(_form.formState.dirtyFields?.cmsConfigs ?? {}).some(field => !!field);
  const onValid = (fData: TagItemDto, loaderKey?: LoadersKey) => {
    if (fData._id) {
      dispatch(
        updateTagThunk({
          onLoading: loaders.onLoading(loaderKey || 'update'),
          data: { data: toReqData(fData) },
        })
      );
    } else {
      dispatch(
        createTagThunk({
          onLoading: loaders.onLoading(loaderKey || 'create'),
          data: { data: toReqData(fData) },
        })
      );
    }
  };

  return (
    <ModalBase
      title={'Tags form'}
      fillHeight
      width={'360px'}
      menuActions={[
        {
          title: t('Delete'),
          isVisible: !!_form.formValues._id,
          isDanger: true,
          onPress: () => {
            _form.formValues._id &&
              dispatch(
                deleteTagThunk({
                  data: { data: { _id: _form.formValues._id }, extra: { type: _form.formValues.type } },
                })
              );
          },
        },
      ]}
    >
      <AccordionForm
        label={defaultValues?.type ?? 'Main info'}
        expandable={false}
        canSubmit={canSubmit}
        isLoading={loaders.isLoading?.update || loaders.isLoading?.create}
        onSubmit={_form.handleSubmit(fData => {
          onValid(_.omit(fData, ['_id', 'cmsConfigs']));
        })}
      >
        <InputLabel label={'Label'}>
          <InputText {..._form.register('label')} placeholder={t('Label')} />
        </InputLabel>

        <InputLabel label={'Icon Url'}>
          <InputText {..._form.register('iconUrl')} placeholder={'Icon irl'} />
        </InputLabel>
        <InputLabel label={'Disabled'}>
          <ButtonSwitch
            value={_form.formValues.isDisabled}
            name={'isDisabled'}
            onChange={v => _form.setValue('isDisabled', v)}
          />
        </InputLabel>

        <InputLabel label={'Visibility'}>
          <ButtonSwitch
            value={_form.formValues.isVisible}
            name={'isVisible'}
            onChange={v => _form.setValue('isVisible', v)}
          />
        </InputLabel>
      </AccordionForm>

      <AccordionForm
        canSubmit={canSubmitCms}
        isLoading={loaders.isLoading.cms}
        disabled={!defaultValues?._id}
        isOpen={!!defaultValues?._id}
        expandable={!!defaultValues?._id}
        label={'Cms params'}
        onSubmit={_form.handleSubmit(fData => {
          const reqData = _.pick(fData, ['_id', 'cmsConfigs']);

          onValid(reqData, 'cms');

          console.log('TagsForm', reqData);
        })}
      >
        <InputLabel label={'Custom key'}>
          <InputText {..._form.register('cmsConfigs.key')} placeholder={t('Custom key')} />
        </InputLabel>

        <Text $padding={'12px 8px 0'} $size={15} $weight={500}>
          {t('Colors')}
        </Text>

        <FlexBox fxDirection={'row'} gap={12} fillWidth>
          <FlexBox padding={'8px'} height={'fit-content'}>
            <ButtonIcon
              variant={'outlinedMiddle'}
              style={{
                borderColor: _form.formValues.cmsConfigs?.colors?.border,
                color: _form.formValues.cmsConfigs?.colors?.font,
                backgroundColor: _form.formValues.cmsConfigs?.colors?.background,
              }}
            >
              {_form.formValues.label}
            </ButtonIcon>
          </FlexBox>

          <FlexBox gap={8} flex={1} padding={'8px'}>
            <FlexLabel alignItems={'center'} gap={8} justifyContent={'space-between'} fxDirection={'row'} fillWidth>
              <Text>{t('Text')}</Text>
              <InputColor
                {..._form.register('cmsConfigs.colors.font')}
                defaultValue={_form.formValues.cmsConfigs?.colors?.font}
                disabled={!defaultValues?._id}
              />
            </FlexLabel>

            <FlexLabel alignItems={'center'} gap={8} justifyContent={'space-between'} fxDirection={'row'} fillWidth>
              <Text>{t('Border')}</Text>
              <InputColor
                {..._form.register('cmsConfigs.colors.border')}
                defaultValue={_form.formValues.cmsConfigs?.colors?.border}
                disabled={!defaultValues?._id}
              />
            </FlexLabel>

            <FlexLabel alignItems={'center'} gap={8} justifyContent={'space-between'} fxDirection={'row'} fillWidth>
              <Text>{t('Background')}</Text>
              <InputColor
                {..._form.register('cmsConfigs.colors.background')}
                defaultValue={_form.formValues.cmsConfigs?.colors?.background}
                disabled={!defaultValues?._id}
              />
            </FlexLabel>
          </FlexBox>
        </FlexBox>
      </AccordionForm>
    </ModalBase>
  );
};
export default ModalFormTags;
