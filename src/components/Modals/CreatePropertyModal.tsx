import { ModalFormProps } from '../ModalForm';
import { AppFormProvider } from '../../hooks/useAppForm.hook';
import { OfferTypeEnum } from '../../types/offers/offers.types';
import FlexBox from '../atoms/FlexBox';
import { t } from '../../lang';
import { useAppForm } from '../../hooks';
import { PropertyBaseEntity, PropertyFormData, PropertyLevelIsType } from '../../types/offers/properties.types';
import React from 'react';
import { getIdRef } from '../../utils';
import ModalBase from '../atoms/Modal';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { useOffersSelector } from '../../redux/selectors.store';
import { LoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import { PropertyCmsParamsFormArea } from '../Forms/offers/properties/PropertyCmsParamsFormArea';
import PropertyInfoFormArea from '../Forms/offers/properties/PropertyInfoFormArea';

export interface OfferPropertyModalProps
  extends Omit<ModalFormProps<OfferTypeEnum, any, PropertyBaseEntity>, 'onSubmit'> {
  create?: boolean;
  parent?: PropertyBaseEntity;
  edit?: boolean;
  updateId?: string;
  parentLevelIs?: PropertyLevelIsType;
  currentLevelIs?: PropertyLevelIsType;
}

export interface IPropertyFormData extends PropertyFormData {}

export type FormCreatePropertyLoaderKey = 'create' | 'update' | 'current';
const CreatePropertyModal: React.FC<OfferPropertyModalProps> = ({
  updateId,
  defaultState,
  parent,
  title,
  onClose,
  ...props
}) => {
  const dataMap = useOffersSelector().propertiesDataMap;
  const parentLevelIs: PropertyLevelIsType = { [parent?.levelType ?? 'group']: true };
  const currentLevelIs: PropertyLevelIsType = { [parent?.levelType ?? 'group']: true };

  const loaders = useLoaders<
    FormCreatePropertyLoaderKey,
    { current?: Partial<PropertyBaseEntity>; currentId?: string }
  >(
    {
      create: { content: 'Creating...' },
      update: { content: 'Updating...' },
      current: { content: 'Fetching...' },
    },
    { current: updateId ? dataMap?.[updateId] : undefined, currentId: updateId }
  );
  const currentProp = loaders.state?.currentId ? dataMap?.[loaders.state?.currentId] : undefined;

  const form = useAppForm<IPropertyFormData>({
    defaultValues: !defaultState
      ? undefined
      : ({
          isSelectable: parent?.isSelectable ?? false,
          ...defaultState,
          parent: parent ? getIdRef(parent) : undefined,
        } as IPropertyFormData),
    values: currentProp
      ? ({
          ...currentProp,
          parent: parent ? getIdRef(parent) : undefined,
        } as IPropertyFormData)
      : undefined,
  });

  const { formValues } = form;

  return (
    <ModalBase
      isLoading={loaders.hasLoading}
      fillHeight
      title={t(updateId ? 'Update property' : 'Create property')}
      onClose={onClose}
    >
      <AppFormProvider value={form}>
        <LoadersProvider value={loaders}>
          {/*<FlexBox>*/}

          <PropertyInfoFormArea
            updateId={updateId}
            parent={parent}
            parentLevelIs={parentLevelIs}
            currentLevelIs={currentLevelIs}
          />

          <FlexBox padding={'4px 8px 8px'} flex={1} gap={12} fillWidth>
            {formValues?._id && <PropertyCmsParamsFormArea levelIs={currentLevelIs} />}
          </FlexBox>

          {/*</FlexBox>*/}
        </LoadersProvider>
      </AppFormProvider>
    </ModalBase>
  );
};

export default CreatePropertyModal;
