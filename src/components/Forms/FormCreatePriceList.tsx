import {
  IPriceList,
  IPriceListItem,
  IPriceListItemReqData,
  IPriceListReqData,
  PriceListDto,
  PriceListItemDto,
  PriceListType,
} from '../../redux/priceManagement/priceManagement.types';
import ModalForm, { ModalFormProps } from '../ModalForm';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { useAppForm } from '../../hooks';
import { omit } from 'lodash';
import FlexBox from '../atoms/FlexBox';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import translate from '../../lang';
import FormCreateInner from './components/FormCreateInner';
import * as React from 'react';
import { useMemo, useState } from 'react';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';
import { usePriceListsSelector } from '../../redux/selectors.store';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';

export interface PriceListFormProps extends Omit<ModalFormProps<PriceListType>, 'onSubmit' | 'afterSubmit'> {
  defaultData?: Partial<IPriceList>;
  edit?: boolean;
  onSubmit?: AppSubmitHandler<
    IPriceListReqData,
    {
      onSuccess: (data: IPriceList) => void;
      onError: () => void;
    }
  >;
}

export interface FormCreatePriceProps extends Omit<ModalFormProps<PriceListType>, 'onSubmit' | 'afterSubmit'> {
  defaultState?: Partial<IPriceListItem>;
  onSubmit?: AppSubmitHandler<IPriceListItemReqData>;
  type?: PriceListType;
}

const usePriceListById = (_id?: string) => {
  const { lists } = usePriceListsSelector();
  return useMemo(() => {
    return lists.find(list => list._id === _id);
  }, [_id, lists]);
};

const FormCreatePrice: React.FC<FormCreatePriceProps> = ({ defaultState, type, onSubmit, ...props }) => {
  const {
    formState: { errors, isValid },
    formValues,
    register,
    registerSelect,
    clearAfterSave,
    closeAfterSave,
    toggleAfterSubmitOption,
    setValue,
    handleSubmit,
  } = useAppForm<PriceListItemDto>();
  const onValidSubmit = (data: PriceListItemDto) =>
    onSubmit &&
    onSubmit(
      {
        _id: defaultState?._id,
        data,
      },
      {
        clearAfterSave,
        closeAfterSave,
      }
    );
  return (
    <ModalForm fitContentV isValid {...props}>
      <FlexBox gap={4} padding={'0 16px 16px'}>
        <InputLabel label={translate('label')} direction={'vertical'} error={errors.label} required>
          <InputText placeholder={translate('label')} {...register('label')} required autoFocus />
        </InputLabel>
        {type === 'sales' && (
          <InputLabel label={translate('price')} direction={'vertical'} error={errors.price} required>
            <InputText placeholder={translate('price')} {...register('price')} required autoFocus />
          </InputLabel>
        )}
        {type === 'purchases' && (
          <InputLabel label={translate('cost')} direction={'vertical'} error={errors.cost} required>
            <InputText placeholder={translate('cost')} {...register('cost')} required autoFocus />
          </InputLabel>
        )}
      </FlexBox>
    </ModalForm>
  );
};
const FormCreatePriceList: React.FC<PriceListFormProps> = ({
  filterOptions,
  onSubmit,
  defaultData,
  edit,
  ...props
}) => {
  // const modalService = useModalProvider();
  const [isSuccess, setIsSuccess] = useState(false);
  // const [currentList, setCurrentList] = useState<IPriceList | undefined>();
  // const currentList = usePriceListById();
  const {
    formState: { errors, isValid },
    formValues,
    register,
    // registerSelect,
    clearAfterSave,
    closeAfterSave,
    toggleAfterSubmitOption,
    setValue,
    handleSubmit,
  } = useAppForm<PriceListDto>({
    defaultValues: omit(defaultData, ['createdAt', 'updatedAt', '_id']),
  });

  const onValidSubmit = (data: PriceListDto) =>
    onSubmit &&
    onSubmit(
      {
        data,
        _id: defaultData?._id,
      },
      {
        closeAfterSave,
        clearAfterSave,
        onSuccess: data => {},
        onError: () => {},
      }
    );

  const onAddPricesClick = () => {
    // const newPrice = { _id: nanoid(8).toString() };
    // toast.info(newPrice._id);
    // setValue('prices', Array.isArray(formValues.prices) ? [...formValues.prices, newPrice] : [newPrice]);
    // const modal = modalService.handleOpenModal({
    //   ModalChildren: FormCreatePrice,
    //   modalChildrenProps: {
    //     title: 'Add prices',
    //     type: formValues.type,
    //   },
    // });
  };
  return (
    <ModalForm
      isValid={isValid}
      onSubmit={handleSubmit(onValidSubmit)}
      title={'Create price list'}
      {...props}
      fitContentV
      filterOptions={filterOptions}
      defaultFilterValue={defaultData?.type}
      onOptSelect={(option, value) => {
        setValue('type', value);
      }}
      extraFooter={
        <FlexBox fxDirection={'column'} fillWidth>
          {isSuccess && <FormCreateInner buttonText={'Add prices'} onClick={onAddPricesClick} />}
          <FormAfterSubmitOptions
            {...{
              clearAfterSave,
              closeAfterSave,
              toggleOption: toggleAfterSubmitOption,
            }}
          />
        </FlexBox>
      }
    >
      <FlexBox fxDirection={'column'} gap={4} padding={'8px 16px 16px'}>
        <InputLabel label={translate('label')} direction={'vertical'} error={errors.label} required>
          <InputText placeholder={translate('label')} {...register('label')} required autoFocus />
        </InputLabel>

        <FlexBox fxDirection={'row'} gap={16}>
          <InputLabel label={translate('timeFrom')} direction={'vertical'} error={errors.timeFrom} required>
            <InputText placeholder={translate('timeFrom')} type={'datetime-local'} {...register('timeFrom')} />
          </InputLabel>

          <InputLabel label={translate('timeTo')} direction={'vertical'} error={errors.timeTo} required>
            <InputText placeholder={translate('timeTo')} type={'datetime-local'} {...register('timeTo')} />
          </InputLabel>
        </FlexBox>

        <InputLabel label={translate('description')} direction={'vertical'} error={errors.description}>
          <TextareaPrimary placeholder={translate('description')} {...register('description')} />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};

export default FormCreatePriceList;
