import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { OrderTypeEnum } from '../../../../redux/orders/orders.types';
import { t } from '../../../../lang';
import { enumToFilterOptions } from '../../../../utils/fabrics';
import { CreatedModal } from '../../../ModalProvider/ModalProvider';
import styled from 'styled-components';
import { ModalHeader, OverlayFooter } from '../../../atoms';
import ButtonsGroup from '../../../atoms/ButtonsGroup';
import FlexBox from '../../../atoms/FlexBox';
import { FormEventHandler, useEffect, useState } from 'react';

export interface SelectOrderTypeModalProps extends Partial<CreatedModal> {
  onSubmit?: AppSubmitHandler<{ type: OrderTypeEnum }>;
  onSelect?: (type: OrderTypeEnum) => void;
}
const options = enumToFilterOptions(OrderTypeEnum);
const SelectOrderTypeModal: React.FC<SelectOrderTypeModalProps> = ({ onClose, onSelect, onSubmit, ...p }) => {
  const [current, setCurrent] = useState<number>(0);

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();

    onSubmit && onSubmit({ type: options[current].value });

    onClose && onClose();
  };

  useEffect(() => {
    console.log({ current, onSelect, onSubmit });
  }, [current]);

  return (
    <Form {...p} onSubmit={handleSubmit}>
      <ModalHeader title={t('Select order type')} onClose={onClose} />

      <Content padding={'8px'} gap={8}>
        <ButtonsGroup
          options={options}
          onSelect={info => {
            setCurrent(info.index);
          }}
        />
      </Content>

      <OverlayFooter canSubmit />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 360px;
  max-width: 100%;

  border-radius: 2px;
  padding: 0 8px;

  background-color: ${p => p.theme.modalBackgroundColor};

  @media screen and (min-width: 480px) {
  }
`;

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

export default SelectOrderTypeModal;
