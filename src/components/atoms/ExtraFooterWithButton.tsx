import FlexBox from './FlexBox';
import ButtonIcon from './ButtonIcon';
import styled from 'styled-components';

export interface FormCreateInnerProps {
  buttonText?: string;
  onClick?: () => void;
}

const ExtraFooterWithButton: React.FC<FormCreateInnerProps> = ({ buttonText, onClick }) => {
  return (
    <Container fillWidth padding={'8px'}>
      <ButtonIcon variant={'outlinedSmall'} onClick={onClick}>
        {buttonText || 'Create'}
      </ButtonIcon>
    </Container>
  );
};
const Container = styled(FlexBox)`
  min-height: 44px;
  border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
  border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
`;
export default ExtraFooterWithButton;
