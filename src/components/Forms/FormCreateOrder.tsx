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
import ProductCardSimpleOverview from '../Products/ProductCardSimpleOverview';
import { ContractorsTypesEnum } from '../../redux/contractors/contractors.types';
import { useModalFormCreateCounterparty } from '../../hooks/modalHooks';

export interface FormCreateOrderProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrder>;
}
const useContractorsDirectorySelectorByType = <T extends ContractorsTypesEnum = any>(type: T) => {
  const { directory: customers } = useDirectoriesSelector<ApiDirType.CONTRACTORS, ContractorsTypesEnum.CUSTOMER>(
    ApiDirType.CONTRACTORS
  );

  return useMemo(() => customers.filter(el => el.type === type), [type, customers]);
};

export interface FormCreateOrderState extends Omit<IOrder, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

const FormCreateOrder: React.FC<FormCreateOrderProps> = ({ defaultState, onSubmit, ...props }) => {
  const { directory: paymentsMethods } = useDirectoriesSelector(ApiDirType.METHODS_PAYMENT);
  const { directory: shipmentMethods } = useDirectoriesSelector(ApiDirType.METHODS_SHIPMENT);
  const { directory: communicationMethods } = useDirectoriesSelector(ApiDirType.METHODS_COMMUNICATION);
  const customers = useContractorsDirectorySelectorByType(ContractorsTypesEnum.CUSTOMER);
  const onCreateCounterparty = useModalFormCreateCounterparty();
  const managers = usePermissionsAsDirItemOptions();
  const [isReceiverInfo, setIsReceiverInfo] = useState(false);

  const {
    formState: { isValid },
    register,
    registerSelect,
    handleSubmit,
  } = useAppForm<FormCreateOrderState>({ defaultValues: defaultState });

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
          <FormAccordeonItem renderHeader={'Вміст'}>{renderProducts}</FormAccordeonItem>

          <FormAccordeonItem open renderHeader={'Замовник'}>
            <CustomSelect
              {...registerSelect('customer', {
                options: customers,
                label: 'Замовник',
                placeholder: 'Оберіть замовника',
                required: true,
                getLabel: o => `${o?.name} ${o?.secondName}`,
                onCreatePress: () =>
                  onCreateCounterparty({
                    defaultState: { type: ContractorsTypesEnum.CUSTOMER },
                    isFilterByTypeOn: false,
                  }),
              })}
            />

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
                {'Встановити отримувача'}
              </ButtonIcon>
            )}
          </FormAccordeonItem>

          {isReceiverInfo && (
            <FormAccordeonItem renderHeader={'Отримувач'} open={isReceiverInfo}>
              <CustomSelect
                {...registerSelect('receiver', {
                  options: customers,
                  label: 'Отримувач',
                  placeholder: 'Оберіть отримувача',
                  required: true,
                  getLabel: o => `${o?.name} ${o?.secondName}`,
                  onCreatePress: () =>
                    onCreateCounterparty({
                      defaultState: { type: ContractorsTypesEnum.CUSTOMER },
                      isFilterByTypeOn: false,
                    }),
                })}
              />

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
                {'Видалити отримувача'}
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

export default FormCreateOrder;
