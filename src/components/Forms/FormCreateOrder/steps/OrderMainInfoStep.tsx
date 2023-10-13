import FlexBox from '../../../atoms/FlexBox';
import { useDirectoriesSelector } from '../../../../redux/selectors.store';
import { ApiDirType } from '../../../../redux/APP_CONFIGS';
import { useEffect, useMemo, useState } from 'react';
import FormAccordeonItem from '../../components/FormAccordeonItem';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import TextareaPrimary from '../../../atoms/Inputs/TextareaPrimary';
import styled from 'styled-components';
import Changer from '../../../atoms/Changer';
import { CreateOrdersGroupFormData } from '../../../../redux/orders/orders.types';
import { FilterOption } from '../../../ModalForm/ModalFilter';
import CheckBox from '../../../TableList/TebleCells/CellComponents/CheckBox';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../lang';
import { useAppForm } from '../../../../hooks';
import { checks } from '../../../../utils';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import ButtonGroup from '../../../atoms/ButtonGroup';
import { enumToFilterOptions } from '../../../../utils/fabrics';
import { ICustomer } from '../../../../redux/customers/customers.types';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import SelectCustomerModal from '../components/SelectCustomerModal';

const buttonGroupOptions = enumToFilterOptions({ 'The same': 'The same', Another: 'Another' });

export interface FormCreateOrderMainInfoProps {}

const OrderMainInfoStep: React.FC<FormCreateOrderMainInfoProps> = ({ form }) => {
  const { register, setValue, getValues, watch } = useAppForm<CreateOrdersGroupFormData>();
  const modalS = useModalService();
  const [hasReceiverInfo, setHasReceiverInfo] = useState(0);

  const formValues = watch();

  const { directory: paymentsMethods } = useDirectoriesSelector(ApiDirType.METHODS_PAYMENT);
  const { directory: shipmentMethods } = useDirectoriesSelector(ApiDirType.METHODS_SHIPMENT);
  const { directory: communicationMethods } = useDirectoriesSelector(ApiDirType.METHODS_COMMUNICATION);

  const registerTableValueSelect = (name: string) => (value: any) => {
    setValue(name, value);
  };

  useEffect(() => {
    return () => {
      console.log('OrderMainInfoStep before unload', getValues());
    };
  }, []);

  return (
    <Container flex={1} padding={'8px 0'}>
      <FlexBox padding={'0 16px 8px'}>
        <InputLabel label={t('Manager')} required></InputLabel>

        <InputLabel label={t('Status')}>
          <Changer
            options={[
              { _id: '1', value: '1', label: 'Нове', color: 'lightGreen' },
              { _id: '2', value: '2', label: 'Взято у роботу', color: 'lightGreen' },
              // { _id: '4', value: '4', label: 'Пакування', color: 'lightGrey' },
              // { _id: '5', value: '5', label: 'Відвантажено', color: 'lightBlue' },
              { _id: '6', value: '6', label: 'Скасовано замовником', color: 'lightBlue' },
              { _id: '7', value: '7', label: 'Скасовано менеджером', color: 'lightBlue' },
              { _id: '9', value: '9', label: 'Активне', color: 'orange' },
              { _id: '8', value: '8', label: 'Завершено успішно', color: 'lightGreen' },
              { _id: '10', value: '10', label: 'Архів', color: 'lightGrey' },
            ]}
          />
        </InputLabel>
      </FlexBox>

      <FlexBox style={{ position: 'relative' }}>
        <FormAccordeonItem
          contentContainerStyle={{ padding: '8px', gap: 8 }}
          open
          renderHeader={`${t('Customer')} | ${t('Receiver')}`}
        >
          {formValues?.customer && <CustomerInfoComponent info={formValues.customer} />}

          <ButtonIcon
            variant={'outlinedSmall'}
            onClick={() => {
              const m = modalS.open({
                ModalChildren: SelectCustomerModal,
                modalChildrenProps: {
                  onSelect: i => {
                    setValue('customer', i);
                    m?.close && m?.close();
                  },
                },
              });
            }}
          >
            {!formValues?.customer ? 'Select customer' : 'Change customer'}
          </ButtonIcon>

          <ButtonGroup options={buttonGroupOptions} onChangeIndex={setHasReceiverInfo} />

          {hasReceiverInfo > 0 && formValues?.receiver && <CustomerInfoComponent info={formValues.receiver} />}

          {hasReceiverInfo > 0 && (
            <ButtonIcon
              variant={'outlinedSmall'}
              onClick={() => {
                const m = modalS.open({
                  ModalChildren: SelectCustomerModal,
                  modalChildrenProps: {
                    onSelect: i => {
                      setValue('receiver', i);
                      m?.close && m?.close();
                    },
                  },
                });
              }}
            >
              {!formValues?.receiver ? 'Select receiver' : 'Change receiver'}
            </ButtonIcon>
          )}
        </FormAccordeonItem>

        <FormAccordeonItem
          contentContainerStyle={{ padding: '0 8px 8px' }}
          open
          renderHeader={`${t('Shipment')} | ${t('Delivery')}`}
        >
          <InputLabel label={t('Shipment method')} required>
            <CheckboxesListSelector
              options={shipmentMethods.map(el => ({ ...el, value: el._id }))}
              onChangeIndex={i => {
                setValue('shipmentMethod', shipmentMethods[i]);
              }}
            />
          </InputLabel>

          <InputLabel label={t('Destination')} required>
            <TextareaPrimary
              maxLength={250}
              required
              placeholder={t('Type destination address')}
              {...register('destination', { required: true })}
            />
          </InputLabel>
        </FormAccordeonItem>

        <FormAccordeonItem contentContainerStyle={{ padding: '0 8px 8px' }} open renderHeader={'Оплата'}>
          <InputLabel label={t('Payment method')}>
            <CheckboxesListSelector
              options={paymentsMethods.map(el => ({ ...el, value: el._id }))}
              onChangeIndex={i => {
                setValue('paymentMethod', paymentsMethods[i]);
              }}
            />
          </InputLabel>
        </FormAccordeonItem>

        <FormAccordeonItem contentContainerStyle={{ padding: '0 8px 8px' }} open renderHeader={'Додаткова інформація'}>
          <InputLabel label={'Коментар'}>
            <TextareaPrimary maxLength={250} placeholder={'Введіть коментар до замовлення'} {...register('comment')} />
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
  );
};
const Container = styled(FlexBox)`
  position: relative;
  overflow: auto;
`;

const CheckboxesListSelector = ({
  options,
  onChangeIndex,
  currentIndex,
}: {
  onChangeIndex?: (index: number) => void;
  options?: Partial<FilterOption>[];
  currentIndex?: number;
}) => {
  const [current, setCurrent] = useState(0);

  const handleSetCurrent = (idx: number) => {
    setCurrent(idx);
    onChangeIndex && onChangeIndex(idx);
  };

  useEffect(() => {
    if (!checks.isUnd(currentIndex)) {
      setCurrent(currentIndex);
    }
  }, [currentIndex]);
  return (
    <FlexBox fillWidth>
      {options?.map((o, idx) => {
        return (
          <FlexBox
            key={`m-opt_${o.value}`}
            fxDirection={'row'}
            gap={8}
            padding={'2px 4px'}
            alignItems={'center'}
            onClick={() => {
              handleSetCurrent(idx);
            }}
          >
            <CheckBox checked={idx === current} size={'22px'} />

            <Text>{o?.label}</Text>
          </FlexBox>
        );
      })}
    </FlexBox>
  );
};
const CustomerInfoComponent = ({ info }: { info?: ICustomer }) => {
  const renderCells = useMemo(() => {
    if (!info) return undefined;

    return Object.entries(info).map(([k, v]) => {
      const value = checks.isArray(v) ? v.join(', ') : v;

      return (
        <FlexBox key={k} gap={4} padding={'4px'}>
          <Text $size={12}>{t(k)}</Text>
          <Text $align={'right'}>{value}</Text>
        </FlexBox>
      );
    });
  }, [info]);

  return <FlexBox fillWidth>{renderCells}</FlexBox>;
};
export default OrderMainInfoStep;
