import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import FormAreaFooter from './FormAreaFooter';
import { useEffect, useState } from 'react';
import { isUndefined } from 'lodash';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';

export interface FormAreaProps {
  label?: string;
  hideLabel?: boolean;

  children?: React.ReactNode;
  onSubmit?: AppSubmitHandler;
  onReset?: () => void;
  renderFooter?: React.ReactNode;
  renderTitle?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
  expandable?: boolean;
}

export const FormArea = ({
  children,
  renderFooter,
  renderTitle,
  disabled,
  label = 'Form area',
  onSubmit,
  isLoading,
  onReset,
  hideLabel,
  expandable = true,
  isOpen = true,
}: FormAreaProps) => {
  const [_isOpen, _setIsOpen] = useState(isOpen ?? true);

  const onToggleIsOpenHandler = () => {
    _setIsOpen(p => !p);
  };
  useEffect(() => {
    if (!isUndefined(isOpen)) {
      _setIsOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <FlexForm fillWidth onSubmit={onSubmit} onReset={onReset} style={{ position: 'relative' }}>
      {!hideLabel && (
        <Header
          padding={'8px 6px'}
          overflow={'hidden'}
          fxDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          {renderTitle || (
            <Text $size={14} $weight={600}>
              {label}
            </Text>
          )}

          <ButtonIcon
            variant={'onlyIconNoEffects'}
            icon={_isOpen ? 'SmallArrowUp' : 'SmallArrowDown'}
            onClick={onToggleIsOpenHandler}
          />
        </Header>
      )}

      <ExpandableBox isActive={_isOpen}>
        {children}

        {renderFooter || (
          <FormAreaFooter hasOnSubmit={!!onSubmit} hasOnReset={!!onReset} isLoading={isLoading} disabled={disabled} />
        )}
      </ExpandableBox>
    </FlexForm>
  );
};
const Header = styled(FlexBox)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 6;

  background-color: ${p => p.theme.modalBackgroundColor};
`;
const ExpandableBox = styled(FlexBox)`
  overflow: hidden;
  max-height: ${p => (p.isActive ? '100%' : '0')};
  padding: 0 8px;
  //transition: all ${p => p.theme.globals.timingFunctionMain};
`;
