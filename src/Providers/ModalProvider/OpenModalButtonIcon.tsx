import ButtonIcon, { ButtonIconProps } from 'components/atoms/ButtonIcon/ButtonIcon';
import { IModalRenderItemParams, useModalProvider } from 'Providers/ModalProvider/ModalProvider';
import styled from 'styled-components';

interface ModalButtonProps {
  buttonIconProps?: Omit<ButtonIconProps, 'children'>;
  modalArgs?: IModalRenderItemParams;
  children?: React.ReactNode;
}

export type OpenModalButtonProps = ModalButtonProps;

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ buttonIconProps, modalArgs, children }) => {
  const modal = useModalProvider();
  return (
    <ButtonIcon
      size="26px"
      iconSize="20px"
      iconId="info"
      variant="filledLarge"
      onClick={() => {
        modal.openModal({
          ModalChildren: () => <TestModalText>Modal text</TestModalText>,
          ...modalArgs,
        });
      }}
      {...buttonIconProps}
    >
      {children}
    </ButtonIcon>
  );
};

const TestModalText = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  min-height: 100px;

  text-transform: uppercase;
  font-size: 18px;
  font-weight: 700;

  color: #212121;
  background-color: #fff;
`;

export default OpenModalButton;
