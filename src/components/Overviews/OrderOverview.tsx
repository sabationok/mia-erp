import ModalForm, { ModalFormProps } from '../ModalForm';
import { IOrder } from '../../redux/orders/orders.types';
import FlexBox from '../atoms/FlexBox';
import styled from 'styled-components';
import FormAccordeonItem from '../Forms/components/FormAccordeonItem';
import { FormCreateOrderTabs } from '../Forms/FormCreateOrder/FormCreateOrder';
import { useState } from 'react';

export interface OrderOverviewProps extends Omit<ModalFormProps, 'onSubmit'> {
  order?: IOrder;
}
const mainOrderInfo: { label?: string; getData?: (data: IOrder) => React.ReactNode | void }[] = [
  { label: 'ID', getData: o => o._id },
  { label: 'Статус', getData: o => o.status },
  { label: 'Тип', getData: o => '' },
  { label: 'Менеджер', getData: o => o.manager?.name },
  { label: 'Створив / Дата', getData: o => new Date(o.createdAt || '').getDate() },
  { label: 'Оновив / Дата', getData: o => new Date(o.deletedAt || '').getDate() },
];
export const OrderOverview: React.FC<OrderOverviewProps> = ({ order, ...props }) => {
  const [currenTab, setCurrentTab] = useState(0);

  return (
    <ModalForm
      filterOptions={FormCreateOrderTabs}
      onOptSelect={(_o, _v, index) => {
        setCurrentTab(index);
      }}
      fillHeight
      title={`Order: ${order?.code ? order?.code : '"code"'}`}
      {...props}
    >
      <Container flex={1}>
        {currenTab === 0 && (
          <FlexBox height={'max-content'}>
            <FormAccordeonItem open renderHeader={'Загальна інформація'}>
              {mainOrderInfo.map((el, idx) => (
                <InfoBox key={idx.toString()}>
                  <InfoBoxTitle>{el.label || 'Title'}</InfoBoxTitle>
                  <InfoBoxContent>{(order && el.getData && el.getData(order)) || '-'}</InfoBoxContent>
                </InfoBox>
              ))}
            </FormAccordeonItem>
            <FormAccordeonItem renderHeader={'Замовник'}></FormAccordeonItem>
            <FormAccordeonItem renderHeader={'Отримувач'}></FormAccordeonItem>
            <FormAccordeonItem renderHeader={'Інформація про відвантаження'}></FormAccordeonItem>
            <FormAccordeonItem renderHeader={'Інформація про оплату'}></FormAccordeonItem>
            <FormAccordeonItem renderHeader={'Додаткова інформація'}></FormAccordeonItem>
          </FlexBox>
        )}
      </Container>
    </ModalForm>
  );
};

const Container = styled(FlexBox)`
  overflow: auto;
`;

const InfoBox = styled(FlexBox)`
  border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
`;
const InfoBoxTitle = styled(FlexBox)`
  padding: 4px 8px;
  font-size: 11px;
  color: ${({ theme }) => theme.globals.inputPlaceholderColor};
`;
const InfoBoxContent = styled(FlexBox)`
  padding: 4px 8px;
  text-align: right;
  font-size: 14px;
  font-weight: 600;
`;

export default OrderOverview;
