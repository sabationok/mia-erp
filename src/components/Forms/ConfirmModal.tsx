import styled from 'styled-components';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { IModalChildrenProps } from '../../Providers/ModalProvider/ModalProvider';

type Props = {
  fillHeight?: boolean;
  fillWidth?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onReject?: () => void;
  title?: string | number;
  text?: string | number;
  getTitle?: (value: string) => string;
} & IModalChildrenProps;
const ConfirmModal: React.FC<Props> = ({
  fillHeight,
  fillWidth,
  onConfirm,
  onReject,
  onClose,
  title,
  text,
  getTitle,
}) => {
  return (
    <Form {...{ fillHeight, fillWidth }}>
      <Top>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </Top>
      <Bottom>
        <ButtonIcon variant={'defaultSmall'}></ButtonIcon>
        <ButtonIcon variant={'filledSmall'}></ButtonIcon>
      </Bottom>
    </Form>
  );
};
const Form = styled.form<Pick<Props, 'fillWidth' | 'fillHeight'>>`
  display: flex;
  flex-direction: column;
  width: 480px;
  max-width: 100%;

  overflow: hidden;

  padding: 16px 20px;

  height: ${({ fillHeight }) => (fillHeight ? '100vh' : '')};

  background-color: ${({ theme }) => theme.modalBackgroundColor};
  border: 1px solid ${({ theme }) => theme.modalBorderColor};

  border-radius: 2px;
`;

const Top = styled.div`
  flex: 1;

  display: flex;
  gap: 8px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Text = styled.div`
  font-size: 16px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: 6px;
`;

export default ConfirmModal;
