import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { IOrder } from '../../redux/orders/orders.types';
import { useAppForm } from '../../hooks';
import InputLabel from '../atoms/Inputs/InputLabel';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import CustomSelect from '../atoms/Inputs/CustomSelect';
import { useDirectoriesSelector } from '../../redux/selectors.store';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import FormAccordeonItem from './components/FormAccordeonItem';
import styled from 'styled-components';
import usePermissionsAsDirItemOptions from '../../hooks/usePermisionsAsWorkersOptions';
import { useMemo, useState } from 'react';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import InputText from '../atoms/Inputs/InputText';
import ProductCardSimpleOverview from '../Products/ProductCardSimpleOverview';

export interface FormCreateOrderProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrder>;
}

export interface FormCreateOrderState extends Omit<IOrder, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

const FormCreateOrder: React.FC<FormCreateOrderProps> = ({ onSubmit, ...props }) => {
  const { directory: paymentsMethods } = useDirectoriesSelector(ApiDirType.METHODS_PAYMENT);
  const { directory: shipmentMethods } = useDirectoriesSelector(ApiDirType.METHODS_SHIPMENT);
  const { directory: communicationMethods } = useDirectoriesSelector(ApiDirType.METHODS_COMMUNICATION);
  const managers = usePermissionsAsDirItemOptions();
  const [isReceiverInfo, setIsReceiverInfo] = useState(false);

  const {
    formState: { isValid },
    register,
    registerSelect,
    handleSubmit,
  } = useAppForm<FormCreateOrderState>({
    defaultValues: { receiver: { name: 'Петро' }, customer: { name: 'Іванка' } },
  });

  const onValid = (data?: FormCreateOrderState) => {
    console.log('FormCreateOrder');
    console.log(data);
  };
  const renderProducts = useMemo(() => {
    const list = [
      { _id: 'sdfbsdfb', label: 'Товар 1' },
      { _id: 'sdfbsdfb', label: 'Товар 2' },
      { _id: 'sdfbsdfb', label: 'Товар 3' },
      { _id: 'sdfbsdfb', label: 'Товар 4' },
    ];
    return list.map((p, idx) => <ProductCardSimpleOverview key={idx.toString()} product={p} />);
  }, []);
  return (
    <ModalForm fillHeight {...props} isValid={isValid} onSubmit={handleSubmit(onValid)}>
      <Container flex={1} padding={'8px 0'}>
        <FlexBox padding={'0 16px 8px'}>
          <CustomSelect
            {...registerSelect('manager', {
              options: managers,
              label: 'Менеджер',
              placeholder: 'Оберіть відповідального менеджера',
              required: true,
            })}
          />
        </FlexBox>

        <FlexBox>
          <FormAccordeonItem open renderHeader={'Вміст'}>
            {renderProducts}
          </FormAccordeonItem>
          <FormAccordeonItem open renderHeader={'Замовник'}>
            <InputLabel label={"Ім'я"} required>
              <InputText
                maxLength={250}
                placeholder={"Ім'я"}
                {...register('customer.name', { required: true })}
                required
              />
            </InputLabel>

            <InputLabel label={'Прізвище'} required>
              <InputText
                maxLength={250}
                placeholder={'Введіть прізвище'}
                required
                {...register('customer.secondName', { required: true })}
              />
            </InputLabel>

            <InputLabel label={'Телефон'} required>
              <InputText
                maxLength={250}
                placeholder={'Введіть телефон'}
                required
                {...register('customer.phone', { required: true })}
              />
            </InputLabel>

            <InputLabel label={'Емейл'}>
              <InputText maxLength={250} placeholder={'Введіть емейл'} type={'email'} {...register('customer.email')} />
            </InputLabel>

            <CustomSelect
              {...registerSelect('customerCommunicationMethod', {
                options: communicationMethods,
                label: 'Спосіб звязку',
                placeholder: "Оберіть спосіб зв'язку",
                required: true,
              })}
            />

            {!isReceiverInfo && (
              <ButtonIcon
                variant={'outlinedSmall'}
                style={{ marginTop: 8 }}
                onClick={() => {
                  setIsReceiverInfo(true);
                }}
              >
                {'Додати інформацію про отримувача'}
              </ButtonIcon>
            )}
          </FormAccordeonItem>

          {isReceiverInfo && (
            <FormAccordeonItem renderHeader={'Отримувач'} open={isReceiverInfo}>
              <InputLabel label={"Ім'я"} required={isReceiverInfo}>
                <InputText
                  maxLength={250}
                  placeholder={"Ім'я"}
                  {...register('receiver.name', { required: isReceiverInfo })}
                  required={isReceiverInfo}
                />
              </InputLabel>

              <InputLabel label={'Прізвище'} required={isReceiverInfo}>
                <InputText
                  maxLength={250}
                  placeholder={'Введіть прізвище'}
                  required={isReceiverInfo}
                  {...register('receiver.secondName', { required: isReceiverInfo })}
                />
              </InputLabel>

              <InputLabel label={'Телефон'} required={isReceiverInfo}>
                <InputText
                  required={isReceiverInfo}
                  maxLength={250}
                  placeholder={'Введіть телефон'}
                  {...register('receiver.phone', { required: isReceiverInfo })}
                />
              </InputLabel>

              <InputLabel label={'Емейл'}>
                <InputText
                  maxLength={250}
                  placeholder={'Введіть емейл'}
                  type={'email'}
                  {...register('receiver.email')}
                />
              </InputLabel>

              <CustomSelect
                {...registerSelect('receiverCommunicationMethod', {
                  options: communicationMethods,
                  label: 'Спосіб звязку',
                  placeholder: "Оберіть спосіб зв'язку",
                  required: true,
                })}
              />

              <ButtonIcon
                variant={'outlinedSmall'}
                style={{ marginTop: 8 }}
                onClick={() => {
                  setIsReceiverInfo(false);
                }}
              >
                {'Видалити інформацію про отримувача'}
              </ButtonIcon>
            </FormAccordeonItem>
          )}

          <FormAccordeonItem open renderHeader={'Інформація про відвантаження'}>
            <CustomSelect
              {...registerSelect('shipmentMethod', {
                options: shipmentMethods,
                label: 'Спосіб відвантаження',
                placeholder: 'Оберіть спосіб відвантаження',
                required: true,
              })}
            />

            <InputLabel label={'Місце призначення'}>
              <TextareaPrimary
                maxLength={250}
                required
                placeholder={'Введіть інформацію про призначення'}
                {...register('destination')}
              />
            </InputLabel>
          </FormAccordeonItem>

          <FormAccordeonItem open renderHeader={'Інформація про оплату'}>
            <CustomSelect
              {...registerSelect('paymentMethod', {
                options: paymentsMethods,
                label: 'Тип оплати',
                placeholder: 'Оберіть тип оплати',
                required: true,
              })}
            />
          </FormAccordeonItem>

          <FormAccordeonItem open renderHeader={'Додаткова інформація'}>
            <InputLabel label={'Коментар'}>
              <TextareaPrimary
                maxLength={250}
                placeholder={'Введіть коментар до замовлення'}
                {...register('comment')}
              />
            </InputLabel>

            <InputLabel label={'Службовий коментар'}>
              <TextareaPrimary
                maxLength={250}
                placeholder={'Цей коментар будть бачити лише працівники компанії'}
                {...register('innerComment')}
              />
            </InputLabel>
          </FormAccordeonItem>
        </FlexBox>
      </Container>
    </ModalForm>
  );
};

const Container = styled(FlexBox)`
  position: relative;
  overflow: auto;
`;
const GridBox = styled(FlexBox)`
  position: relative;

  min-height: max-content;
`;

export default FormCreateOrder;
