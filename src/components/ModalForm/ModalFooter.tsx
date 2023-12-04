import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import { t } from '../../lang';

export interface IModalFooterProps {
  onSubmitPassed?: boolean;
  extraFooter?: React.ReactNode;
  isValid?: boolean;
  isLoading?: boolean;
}

const ModalFooter: React.FC<IModalFooterProps & React.HTMLAttributes<HTMLDivElement>> = ({
  onSubmitPassed,
  extraFooter,
  isValid = true,
  isLoading = false,
  ...props
}) => {
  return (
    <Footer {...props} className="modalFooter">
      {extraFooter && (
        <ExtraFooter fillWidth fxDirection={'row'}>
          {extraFooter}
        </ExtraFooter>
      )}

      <FlexBox fillWidth gap={8} fxDirection={'row'} justifyContent={'flex-end'} padding={'8px'}>
        {onSubmitPassed && (
          <ButtonIcon type="reset" variant={'defOutlinedSmall'}>
            {t('Close')}
          </ButtonIcon>
        )}

        <ButtonIcon
          type={onSubmitPassed ? 'submit' : 'reset'}
          variant={'filledSmall'}
          isLoading={isLoading}
          disabled={!isValid}
        >
          {isLoading ? t('Loading...') : onSubmitPassed ? t('Save') : t('Close')}
        </ButtonIcon>
      </FlexBox>
    </Footer>
  );
};

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: wrap;

  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 10;

  overflow: hidden;

  width: 100%;

  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;

  border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
  //border-left: 1px solid ${({ theme }) => theme.modalBorderColor};
  //border-right: 1px solid ${({ theme }) => theme.modalBorderColor};
  color: ${({ theme }) => theme.fontColorHeader};
  fill: ${({ theme }) => theme.fillColorHeader};
  background-color: ${({ theme }) => theme.modalBackgroundColor};
`;

const ExtraFooter = styled(FlexBox)`
  color: ${({ theme }) => theme.fontColorHeader};
  fill: ${({ theme }) => theme.fillColorHeader};
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
`;
export default ModalFooter;
