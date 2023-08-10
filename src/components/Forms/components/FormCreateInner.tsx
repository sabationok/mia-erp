import FlexBox from '../../atoms/FlexBox';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';

export interface FormCreateInnerProps {
  buttonText?: string;
  onClick?: () => void;
}

const FormCreateInner: React.FC<FormCreateInnerProps> = ({ buttonText, onClick }) => {
  return (
    <Container fillHeight fillWidth padding={'8px'}>
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
export default FormCreateInner;
