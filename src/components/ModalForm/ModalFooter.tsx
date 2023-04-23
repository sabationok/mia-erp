import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';

import styled from 'styled-components';
import { ModalFormProps } from './ModalForm';

const ModalFooter: React.FC<Pick<ModalFormProps, 'onSubmit'> & React.ImgHTMLAttributes<HTMLDivElement>> = ({
                                                                                                             onSubmit,
                                                                                                             ...props
                                                                                                           }) => {
  return (
    <Footer {...props} className='modalFooter'>
      {onSubmit && (
        <ButtonIcon type='reset' variant='defOutlinedSmall'>
          Закрити
        </ButtonIcon>
      )}

      <ButtonIcon type={onSubmit ? 'submit' : 'reset'} variant='filledSmall'>
        {onSubmit ? 'Прийняти' : 'Закрити'}
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

  border-top: 1px solid ${({ theme }) => theme.trBorderClr};
  border-left: 1px solid ${({ theme }) => theme.trBorderClr};
  border-right: 1px solid ${({ theme }) => theme.trBorderClr};
  color: ${({ theme }) => theme.fontColorHeader};
  fill: ${({ theme }) => theme.fillColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  @media screen and (min-width: 768px) {
    padding: 8px;
  }
`;
export default ModalFooter;
