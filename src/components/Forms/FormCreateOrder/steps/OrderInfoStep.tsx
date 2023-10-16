import FlexBox from '../../../atoms/FlexBox';
import styled, { useTheme } from 'styled-components';
import { useMemo, useState } from 'react';
import { ICustomer } from '../../../../redux/customers/customers.types';
import { t } from '../../../../lang';
import { Text } from '../../../atoms/Text';
import FormAccordionItem from '../../components/FormAccordionItem';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import TextareaPrimary from '../../../atoms/Inputs/TextareaPrimary';
import { ICreateOrderBaseFormState } from '../../../../redux/orders/orders.types';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import { useDirectoriesSelector } from '../../../../redux/selectors.store';
import { ApiDirType } from '../../../../redux/APP_CONFIGS';
import Changer from '../../../atoms/Changer';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import SelectCustomerModal from '../components/SelectCustomerModal';
import ButtonGroup from '../../../atoms/ButtonGroup';
import { enumToFilterOptions } from '../../../../utils/fabrics';
import TagButtonsFilter from '../../../atoms/TagButtonsFilter';
import SelectManagerModal from '../components/SelectManagerModal';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { FormOrderStepBaseProps } from '../FormOrder.types';
import { orderStatuses } from '../../../../data/orders.data';
import CheckboxesListSelector from '../../../atoms/CheckboxesListSelector';

export interface OrderInfoStepProps extends FormOrderStepBaseProps {
  form: UseFormReturn<ICreateOrderBaseFormState>;
  isGroup?: boolean;
}
const buttonGroupOptions = enumToFilterOptions({ 'The same': 'The same', Another: 'Another' });

const OrderInfoStep: React.FC<OrderInfoStepProps> = ({ name, onFinish, isGroup, form }) => {
  const { register, setValue, watch, unregister } = form;
  const modalS = useModalService();

  const { directory: paymentsMethods } = useDirectoriesSelector(ApiDirType.METHODS_PAYMENT);
  const { directory: shipmentMethods } = useDirectoriesSelector(ApiDirType.METHODS_SHIPMENT);
  const { directory: communicationMethods } = useDirectoriesSelector(ApiDirType.METHODS_COMMUNICATION);

  const formValues = watch();

  const [hasReceiverInfo, setHasReceiverInfo] = useState(formValues.receiver ? 1 : 0);

  return (
    <Inputs flex={1} overflow={'auto'}>
      <FlexBox fillWidth gap={8} padding={'8px'} style={{ maxWidth: 480, width: '100%', margin: '0 auto' }}>
        <InputLabel label={t('manager')}>
          <CustomerInfoComponent info={formValues.manager?.user as never} isManager />
        </InputLabel>

        <ButtonIcon
          variant={'outlinedSmall'}
          onClick={() => {
            const m = modalS.open({
              ModalChildren: SelectManagerModal,
              modalChildrenProps: {
                onSelect: i => {
                  setValue('manager', i);
                  m?.onClose && m?.onClose();
                },
              },
            });
          }}
        >
          {t(!formValues?.manager ? 'Select manager' : 'Change manager')}
        </ButtonIcon>

        <InputLabel label={t('Status')}>
          <Changer
            options={orderStatuses}
            currentOption={{ value: formValues?.status }}
            onChange={({ value }) => {
              setValue('status', value);
            }}
          />
        </InputLabel>
      </FlexBox>

      <FlexBox padding={'0 2px'}>
        <StAccordionItem
          contentContainerStyle={{ padding: '8px', gap: 8 }}
          open
          renderHeader={
            <Text $ellipsisMode={true} $size={16} $weight={500}>{`${t('Customer')} | ${t('Receiver')}`}</Text>
          }
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
                    m?.onClose && m?.onClose();
                  },
                },
              });
            }}
          >
            {t(!formValues?.customer ? 'Select customer' : 'Change customer')}
          </ButtonIcon>

          <InputLabel label={t('Preferred communication methods')}>
            <BorderedBox fillWidth padding={'8px'}>
              <TagButtonsFilter
                multiple
                numColumns={3}
                values={formValues.customerCommunicationMethods}
                resetButtonLabel={t('Not needed')}
                options={communicationMethods.map(mtd => ({ ...mtd, value: mtd._id }))}
                resetButtonPosition={'start'}
                onChange={value => {
                  setValue('customerCommunicationMethods', value);
                }}
              />
            </BorderedBox>
          </InputLabel>

          <ButtonGroup
            options={buttonGroupOptions}
            onChangeIndex={i => {
              if (!i) {
                unregister('receiver');
                unregister('receiverCommunicationMethods');
              }
              setHasReceiverInfo(i);
            }}
            defaultIndex={hasReceiverInfo}
          />

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
                      m?.onClose && m?.onClose();
                    },
                  },
                });
              }}
            >
              {t(!formValues?.receiver ? 'Select receiver' : 'Change receiver')}
            </ButtonIcon>
          )}
          {hasReceiverInfo > 0 && formValues?.receiver && (
            <InputLabel label={t('Preferred communication methods')}>
              <BorderedBox fillWidth padding={'8px'}>
                <TagButtonsFilter
                  multiple
                  numColumns={3}
                  onChange={value => {
                    setValue('receiverCommunicationMethods', value);
                  }}
                  values={formValues.receiverCommunicationMethods}
                  resetButtonLabel={t('Not needed')}
                  options={communicationMethods.map(mtd => ({ ...mtd, value: mtd._id }))}
                  resetButtonPosition={'start'}
                />
              </BorderedBox>
            </InputLabel>
          )}
        </StAccordionItem>

        <StAccordionItem
          contentContainerStyle={{ padding: '0 8px 8px' }}
          open
          renderHeader={
            <Text $ellipsisMode={true} $size={16} $weight={500}>
              {`${t('Shipment')} | ${t('Delivery')}`}
            </Text>
          }
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
              placeholder={t('Enter destination address')}
              {...register('destination', { required: true })}
            />
          </InputLabel>
        </StAccordionItem>

        <StAccordionItem
          contentContainerStyle={{ padding: '0 8px 8px' }}
          open
          renderHeader={
            <Text $ellipsisMode={true} $size={16} $weight={500}>
              {t('Payment')}
            </Text>
          }
        >
          <InputLabel label={t('Payment method')} required>
            <CheckboxesListSelector
              options={paymentsMethods.map(el => ({ ...el, value: el._id }))}
              onChangeIndex={i => {
                setValue('paymentMethod', paymentsMethods[i]);
              }}
            />
          </InputLabel>
        </StAccordionItem>

        {!isGroup && (
          <StAccordionItem
            contentContainerStyle={{ padding: '0 8px 8px' }}
            open
            renderHeader={
              <Text $ellipsisMode={true} $size={16} $weight={500}>
                {t('Additionally')}
              </Text>
            }
          >
            <InputLabel label={t('Comment')}>
              <TextareaPrimary maxLength={250} placeholder={t('Enter comment for customer')} {...register('comment')} />
            </InputLabel>

            <InputLabel label={t('Service comment')}>
              <TextareaPrimary maxLength={250} placeholder={t('Enter service comment')} {...register('innerComment')} />
            </InputLabel>
          </StAccordionItem>
        )}
      </FlexBox>
    </Inputs>
  );
};
const Inputs = styled(FlexBox)``;

const BorderedBox = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
const StAccordionItem = styled(FormAccordionItem)`
  & .content {
    max-width: 480px;
    width: 100%;
    margin: auto;
  }
`;
export default OrderInfoStep;

function getCustomerInfoComponentCells({
  info,
  isReceiver,
  isManager,
}: {
  info?: ICustomer;
  isReceiver?: boolean;
  isManager?: boolean;
}) {
  return [
    { label: t('label'), getValue: (info?: ICustomer) => info?.label || '---', visible: !isManager },
    { label: t('name'), getValue: (info?: ICustomer) => info?.name || '---', visible: true },
    { label: t('secondName'), getValue: (info?: ICustomer) => info?.secondName || '---', visible: true },
    { label: t('email'), getValue: (info?: ICustomer) => info?.email || '---', visible: true },
    { label: t('taxCode'), getValue: (info?: ICustomer) => info?.taxCode || '---', visible: !isManager },
    {
      label: t('personalTaxCode'),
      getValue: (info?: ICustomer) => info?.personalTaxCode || '---',
      visible: !isManager,
    },
    { label: t('tags'), getValue: (info?: ICustomer) => info?.tags?.join(', ') || '---', visible: !isManager },
  ];
}
const CustomerInfoComponent = ({
  info,
  isReceiver,
  isManager,
}: {
  info?: ICustomer;
  isReceiver?: boolean;
  isManager?: boolean;
}) => {
  const theme = useTheme();
  const renderCells = useMemo(() => {
    if (!info) return undefined;

    return getCustomerInfoComponentCells({ info, isReceiver, isManager }).map(({ label, getValue, visible }) => {
      return (
        visible && (
          <FlexBox
            key={label}
            gap={4}
            padding={'4px'}
            flex={'1 1 50%'}
            maxWidth={'50%'}
            border={`1px solid ${theme.modalBorderColor}`}
          >
            <Text $size={12}>{label}</Text>
            <Text $align={'right'}>{getValue(info)}</Text>
          </FlexBox>
        )
      );
    });
  }, [info, isManager, isReceiver, theme.modalBorderColor]);

  return (
    <FlexBox fillWidth flexWrap={'wrap'} fxDirection={'row'} border={`1px solid ${theme.modalBorderColor}`}>
      {renderCells}
    </FlexBox>
  );
};
