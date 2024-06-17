import ButtonIcon from 'components/atoms/ButtonIcon';
import styled from 'styled-components';
import FlexBox from '../FlexBox';
import { t } from '../../../lang';
import { isUndefined } from 'lodash';
import { useModal } from '../../../Providers/ModalProvider/ModalComponent';

export interface IModalFooterProps {
  hasOnSubmit?: boolean;
  extraFooter?: React.ReactNode;
  canSubmit?: boolean;
  isLoading?: boolean;
}

const ModalFooter: React.FC<IModalFooterProps & React.HTMLAttributes<HTMLDivElement>> = ({
  hasOnSubmit,
  extraFooter,
  canSubmit = true,
  isLoading = false,
  ...props
}) => {
  const modal = useModal();
  return (
    <Footer {...props} className="modalFooter">
      {extraFooter && (
        <ExtraFooter fillWidth fxDirection={'row'}>
          {extraFooter}
        </ExtraFooter>
      )}

      <FlexBox fillWidth gap={8} fxDirection={'row'} justifyContent={'space-between'} padding={'8px'}>
        <ButtonIcon type="reset" variant={'defaultMiddle'} disabled={isLoading} onClick={modal.onClose}>
          {t('Close')}
        </ButtonIcon>

        {
          <ButtonIcon
            type={!isUndefined(canSubmit) || hasOnSubmit ? 'submit' : 'button'}
            variant={'filledMiddle'}
            isLoading={isLoading}
            disabled={!hasOnSubmit || !canSubmit}
          >
            {t('Save')}
          </ButtonIcon>
        }
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
  z-index: 80;

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
export default ModalFooter;
