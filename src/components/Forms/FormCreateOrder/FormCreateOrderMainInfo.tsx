import FlexBox from '../../atoms/FlexBox';
import { UseAppFormReturn } from '../../../hooks/useAppForm.hook';
import { useDirectoriesSelector } from '../../../redux/selectors.store';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import usePermissionsAsDirItemOptions from '../../../hooks/usePermisionsAsWorkersOptions';
import { useCounterpartyDirectorySelectorByType } from '../../../hooks/selectorHooks.hooks';
import { ContractorsTypesEnum } from '../../../redux/contractors/contractors.types';
import { useModalFormCreateCounterparty } from '../../../hooks/modalHooks';
import { useState } from 'react';
import ButtonGroup from '../../atoms/ButtonGroup';
import { orderTypeFilterOptions } from '../../../data/orders.data';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import FormAccordeonItem from '../components/FormAccordeonItem';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import InputLabel from '../../atoms/Inputs/InputLabel';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';
import styled from 'styled-components';
import { FormCreateOrderState } from './FormCreateOrder';

export interface FormCreateOrderMainInfoProps
  extends Pick<UseAppFormReturn<FormCreateOrderState>, 'register' | 'registerSelect' | 'formState'> {}
const FormCreateOrderMainInfo: React.FC<FormCreateOrderMainInfoProps> = ({ register, registerSelect, formState }) => {
  const { directory: paymentsMethods } = useDirectoriesSelector(ApiDirType.METHODS_PAYMENT);
  const { directory: shipmentMethods } = useDirectoriesSelector(ApiDirType.METHODS_SHIPMENT);
  const { directory: communicationMethods } = useDirectoriesSelector(ApiDirType.METHODS_COMMUNICATION);
  const managers = usePermissionsAsDirItemOptions();
  const customers = useCounterpartyDirectorySelectorByType(ContractorsTypesEnum.CUSTOMER);
  const onCreateCounterparty = useModalFormCreateCounterparty();
  const [isReceiverInfo, setIsReceiverInfo] = useState(false);

  return (
    <Container flex={1} padding={'8px 0'}>
      <FlexBox padding={'0 16px 8px'}>
        <ButtonGroup options={orderTypeFilterOptions} />

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
        <FlexBox style={{ position: 'relative' }}>
          {/*<FormAccordeonItem renderHeader={'Вміст'}>{renderProducts}</FormAccordeonItem>*/}

          <FormAccordeonItem contentContainerStyle={{ padding: '0 8px 8px' }} open renderHeader={'Замовник'}>
            <CustomSelect
              {...registerSelect('customer', {
                options: customers,
                label: 'Замовник',
                placeholder: 'Оберіть замовника',
                required: true,
                getLabel: o => `${o?.name} ${o?.secondName} ${o?.label || ''}`,
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
            <FormAccordeonItem
              contentContainerStyle={{ padding: '0 8px 8px' }}
              renderHeader={'Отримувач'}
              open={isReceiverInfo}
            >
              <CustomSelect
                {...registerSelect('receiver', {
                  options: customers,
                  label: 'Отримувач',
                  placeholder: 'Оберіть отримувача',
                  required: true,
                  getLabel: o => `${o?.name} ${o?.secondName} ${o?.label || ''}`,
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

          <FormAccordeonItem contentContainerStyle={{ padding: '0 8px 8px' }} open renderHeader={'Відвантаження'}>
            <CustomSelect
              {...registerSelect('shipmentMethod', {
                options: shipmentMethods,
                label: 'Спосіб відвантаження',
                placeholder: 'Оберіть спосіб відвантаження',
                required: true,
              })}
            />

            <InputLabel label={'Місце призначення'} required>
              <TextareaPrimary
                maxLength={250}
                required
                placeholder={'Введіть інформацію про призначення'}
                {...register('destination', { required: true })}
              />
            </InputLabel>
          </FormAccordeonItem>

          <FormAccordeonItem contentContainerStyle={{ padding: '0 8px 8px' }} open renderHeader={'Оплата'}>
            <CustomSelect
              {...registerSelect('paymentMethod', {
                options: paymentsMethods,
                label: 'Спосіб оплати',
                placeholder: 'Оберіть спосіб оплати',
                required: true,
              })}
            />
          </FormAccordeonItem>

          <FormAccordeonItem
            contentContainerStyle={{ padding: '0 8px 8px' }}
            open
            renderHeader={'Додаткова інформація'}
          >
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
      </FlexBox>
    </Container>
  );
};
const Container = styled(FlexBox)`
  position: relative;
  overflow: auto;
`;
export default FormCreateOrderMainInfo;
