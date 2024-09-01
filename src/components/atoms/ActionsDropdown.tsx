import { useState } from 'react';
import FlexBox, { FlexLi, FlexUl } from './FlexBox';
import ButtonIcon from './ButtonIcon';
import { t } from '../../i18e';
import { Text } from './Text';
import styled, { css } from 'styled-components';
import { IconIdType } from '../../img/sprite';

export interface ActionsDropDownProps {
  actions?: ActionType[];
}
type ActionType = {
  danger?: boolean;
  warning?: boolean;
  title?: string;
  icon?: IconIdType;
  hidden?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress?: React.MouseEventHandler;
};
const ActionsDropdown = ({ actions }: ActionsDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FlexBox style={{ position: 'relative' }}>
      <ButtonIcon
        variant={'text'}
        sizeType={'extraSmall'}
        onClick={() => {
          setIsOpen(p => !p);
        }}
      >
        {t('Actions')}
      </ButtonIcon>

      {isOpen && (
        <ActionsList $isOpen={isOpen}>
          {!actions?.length ? (
            <FlexLi height={'32px'} fillWidth justifyContent={'center'} padding={'8px 16px'}>
              <Text $size={13} $weight={600}>
                {t('Actions list is empty')}
              </Text>
            </FlexLi>
          ) : (
            actions?.map((action, index) => {
              return action.hidden ? null : (
                <FlexLi key={action.title || index}>
                  <ButtonIcon
                    variant={'def'}
                    sizeType={'small'}
                    danger={action.danger}
                    warning={action.warning}
                    disabled={action.disabled}
                    isLoading={action.loading}
                    padding={'6px 10px'}
                    justifyContent={'flex-start'}
                    onClick={event => {
                      setIsOpen(p => !p);
                      action.onPress && action.onPress(event);
                    }}
                  >
                    {action.title}
                  </ButtonIcon>
                </FlexLi>
              );
            })
          )}
        </ActionsList>
      )}
    </FlexBox>
  );
};

const ActionsList = styled(FlexUl)<{ $isOpen?: boolean }>`
  position: absolute;
  top: calc(100%);
  right: 8px;
  z-index: 25;

  min-width: 110px;
  min-height: 32px;

  ${p =>
    p.$isOpen
      ? css`
          box-shadow: ${p => p.theme.globals.shadowMain};
          background-color: ${p => p.theme.modalBackgroundColor};
          border: 1px solid ${p => p.theme.modalBorderColor};
        `
      : ''}

  border-radius: 4px;
`;

export default ActionsDropdown;
