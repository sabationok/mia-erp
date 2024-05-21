import {
  IPriceListReqData,
  PriceListDto,
  PriceListEntity,
  PriceListType,
} from '../../../types/price-management/price-management.types';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { useAppForm } from '../../../hooks';
import { omit } from 'lodash';
import FlexBox from '../../atoms/FlexBox';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import { t } from '../../../lang';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../components/FormAfterSubmitOptions';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';

export interface FormCreatePriceListProps extends Omit<ModalFormProps<PriceListType>, 'onSubmit' | 'afterSubmit'> {
  defaultData?: Partial<PriceListEntity>;
  edit?: boolean;
  onSubmit?: AppSubmitHandler<
    IPriceListReqData,
    {
      onSuccess?: (data: PriceListEntity) => void;
      onError?: () => void;
    }
  >;
}

const FormCreatePriceList: React.FC<FormCreatePriceListProps> = ({
  filterOptions,
  onSubmit,
  defaultData,
  edit,
  ...props
}) => {
  const submitOptions = useAfterSubmitOptions();
  const {
    formState: { errors, isValid },
    register,
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
      { ...submitOptions.state }
    );

  return (
    <ModalForm
      isValid={isValid}
      onSubmit={handleSubmit(onValidSubmit)}
      title={'Create price list'}
      {...props}
      fitContentV
      onOptSelect={(_0, value) => {
        setValue('type', value);
      }}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <FlexBox fxDirection={'column'} padding={'0 2px 12px'}>
        <InputLabel label={t('label')} direction={'vertical'} error={errors.label} required>
          <InputText placeholder={t('label')} {...register('label')} required autoFocus />
        </InputLabel>

        <FlexBox fxDirection={'row'} gap={8}>
          <InputLabel label={t('timeFrom')} direction={'vertical'} error={errors.timeFrom} required>
            <InputText placeholder={t('timeFrom')} type={'datetime-local'} {...register('timeFrom')} />
          </InputLabel>

          <InputLabel label={t('timeTo')} direction={'vertical'} error={errors.timeTo} required>
            <InputText placeholder={t('timeTo')} type={'datetime-local'} {...register('timeTo')} />
          </InputLabel>
        </FlexBox>

        <InputLabel label={t('description')} direction={'vertical'} error={errors.description}>
          <TextareaPrimary placeholder={t('description')} {...register('description')} />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};

export default FormCreatePriceList;
