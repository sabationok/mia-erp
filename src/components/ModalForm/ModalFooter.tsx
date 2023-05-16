import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';

export interface IModalFooterProps {
  onSubmitPassed?: boolean;
}

const ModalFooter: React.FC<IModalFooterProps & React.HTMLAttributes<HTMLDivElement>> =
  ({
     onSubmitPassed,
     ...props
   }) => {
    return (
      <Footer {...props} className='modalFooter'>
        {onSubmitPassed && (
          <ButtonIcon type='reset' variant='defOutlinedSmall'>
            Закрити
          </ButtonIcon>
        )}

        <ButtonIcon type={onSubmitPassed ? 'submit' : 'reset'} variant='filledSmall'>
          {onSubmitPassed ? 'Прийняти' : 'Закрити'}
        </ButtonIcon>
      </Footer>
    );
  };

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;

  position: sticky;
  bottom: 0;
  left: 0;

  padding: 8px;

  width: 100%;

  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;

  border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
  border-left: 1px solid ${({ theme }) => theme.modalBorderColor};
  border-right: 1px solid ${({ theme }) => theme.modalBorderColor};
  color: ${({ theme }) => theme.fontColorHeader};
  fill: ${({ theme }) => theme.fillColorHeader};
  background-color: ${({ theme }) => theme.modalBackgroundColor};

  @media screen and (min-width: 768px) {
    padding: 8px;
  }
`;
export default ModalFooter;
