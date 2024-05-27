import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { t } from '../../../lang';

export interface FormAreaFooterProps {
  hasOnSubmit?: boolean;
  hasOnReset?: boolean;
  extraFooter?: React.ReactNode;
  canSubmit?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onAcceptPress?: () => void;
  onResetPress?: () => void;
}

const FormAreaFooter: React.FC<FormAreaFooterProps & React.HTMLAttributes<HTMLDivElement>> = ({
  extraFooter,
  isLoading = false,
  disabled,
  hasOnSubmit = false,
  hasOnReset,
  onAcceptPress,
  onResetPress,
  ...props
}) => {
  return (
    <Footer {...props} className="modalFooter">
      {extraFooter && (
        <ExtraFooter fillWidth fxDirection={'row'}>
          {extraFooter}
        </ExtraFooter>
      )}

      <FlexBox fillWidth gap={8} fxDirection={'row'} justifyContent={'flex-end'} padding={'8px 0'}>
        {(hasOnReset || onResetPress) && (
          <ButtonIcon
            type={onResetPress ? 'button' : 'reset'}
            onClick={onResetPress}
            variant={'defaultMiddle'}
            isLoading={isLoading}
            disabled={disabled}
          >
            {isLoading ? t('Loading...') : t('Clear')}
          </ButtonIcon>
        )}

        <ButtonIcon
          type={onAcceptPress ? 'button' : 'submit'}
          onClick={onAcceptPress}
          variant={'filledMiddle'}
          isLoading={isLoading}
          disabled={disabled || !hasOnSubmit}
        >
          {isLoading ? t('Loading...') : t('Save')}
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

  //position: sticky;
  //bottom: 0;
  //left: 0;
  //z-index: 10;

  overflow: hidden;

  width: 100%;

  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;

  //box-shadow: 0px -3px 32.70000076293945px 0px rgba(0, 0, 0, 0.2);

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
export default FormAreaFooter;
