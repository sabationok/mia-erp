import ModalForm, { ModalFormProps } from '../ModalForm';
import { IOrder } from '../../redux/orders/orders.types';
import AccordeonList from '../SideBarContent/AccordeonList';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import FlexBox from '../atoms/FlexBox';
import styled from 'styled-components';

export interface OrderOverviewProps extends Omit<ModalFormProps, 'onSubmit'> {
  order?: IOrder;
}
export const OrderOverview: React.FC<OrderOverviewProps> = ({ order, ...props }) => {
  return (
    <ModalForm fillHeight title={`Order: ${order?.code ? order?.code : '"code"'}`} {...props}>
      <Container flex={1}>
        <AccordeonList
          options={[
            {
              title: 'Замовник',
              renderChildren: (
                <>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                </>
              ),
            },
            {
              title: 'Замовник',
              renderChildren: (
                <>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                </>
              ),
            },
            {
              title: 'Замовник',
              renderChildren: (
                <>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                </>
              ),
            },
            {
              title: 'Замовник',
              renderChildren: (
                <>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                </>
              ),
            },
            {
              title: 'Замовник',
              renderChildren: (
                <>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                </>
              ),
            },
            {
              title: 'Замовник',
              renderChildren: (
                <>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>{' '}
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>{' '}
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                  <InputLabel label={'Test'}>
                    <InputText placeholder={'Type test'} />
                  </InputLabel>
                </>
              ),
            },
            { title: 'Отримувач' },
            { title: 'Інформація про відвантаження' },
          ]}
        />
      </Container>
    </ModalForm>
  );
};

const Container = styled(FlexBox)`
  overflow: auto;
`;

export default OrderOverview;
