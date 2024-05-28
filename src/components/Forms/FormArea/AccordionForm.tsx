import FlexBox, { FlexFieldSet, FlexForm } from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import FormAreaFooter from './FormAreaFooter';
import { useEffect, useId, useState } from 'react';
import { isUndefined } from 'lodash';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import styled, { css, useTheme } from 'styled-components';
import { Property } from 'csstype';

export interface AccordionFormAreaProps {
  children?: React.ReactNode;
  renderFooter?: React.ReactNode;
  renderTitle?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
  expandable?: boolean;
  label?: string;
  onAcceptPress?: () => void;
  onResetPress?: () => void;
  isHeaderSticky?: boolean;

  hideFooter?: boolean;
  hideHeader?: boolean;
  hasOnSubmit?: boolean;
  hasOnReset?: boolean;

  canSubmit?: boolean;
  isEmpty?: boolean;

  maxHeight?: Property.MaxHeight;

  formId?: string;
}
export interface AccordionFormProps extends AccordionFormAreaProps {
  onSubmit?: AppSubmitHandler;
  onReset?: () => void;
}

export const AccordionForm = ({ isEmpty, onSubmit, onReset, children, formId, ...rest }: AccordionFormProps) => {
  const _formId = useId();

  return (
    <StyledForm onSubmit={onSubmit ?? (ev => ev.preventDefault())} onReset={onReset} maxWidth={'100%'} id={_formId}>
      <AccordionFormArea {...rest} hasOnReset={!!onReset} hasOnSubmit={!!onSubmit} formId={formId || _formId}>
        {children}
      </AccordionFormArea>
    </StyledForm>
  );
};
const StyledForm = styled(FlexForm)``;
export const AccordionFormArea = ({
  children,
  renderFooter,
  renderTitle,
  disabled,
  label = 'Form area',
  isLoading,
  hideHeader,
  isOpen = true,
  expandable = true,
  onAcceptPress,
  onResetPress,
  hasOnSubmit,
  hasOnReset,
  isHeaderSticky,
  hideFooter,
  canSubmit = true,
  maxHeight,
  formId,
}: AccordionFormAreaProps) => {
  const [_isOpen, _setIsOpen] = useState(isOpen);
  const theme = useTheme();
  const onToggleIsOpenHandler = () => {
    _setIsOpen(p => !p);
  };
  useEffect(() => {
    if (!isUndefined(isOpen)) {
      _setIsOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <FlexBox fillWidth style={{ position: 'relative' }} maxHeight={maxHeight} maxWidth={'100%'}>
      {!hideHeader && (
        <Header gap={8} fxDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <HeaderButton
            variant={'defNoEffects'}
            endIcon={!expandable ? undefined : _isOpen ? 'SmallArrowDown' : 'SmallArrowLeft'}
            endIconSize={'30px'}
            onClick={onToggleIsOpenHandler}
            justifyContent={'space-between'}
            disabled={!expandable}
            endIconStyles={{
              fill: theme.accentColor.base,
            }}
            style={{ borderBottom: `1px solid ${theme.modalBorderColor}`, height: '50px' }}
            flex={1}
          >
            {renderTitle || (
              <Text $size={14} $weight={600} $padding={'0 8px'}>
                {label}
              </Text>
            )}
          </HeaderButton>
        </Header>
      )}

      <ExpandableBox disabled={disabled} flex={1} isActive={_isOpen} maxHeight={maxHeight}>
        {_isOpen ? (
          <FlexBox padding={'8px'} maxWidth={'100%'} overflow={'hidden'}>
            {children}

            {hideFooter
              ? null
              : renderFooter || (
                  <FormAreaFooter
                    formId={formId}
                    hasOnSubmit={!!hasOnSubmit}
                    hasOnReset={!!hasOnReset}
                    isLoading={isLoading}
                    disabled={!canSubmit || disabled}
                    onAcceptPress={onAcceptPress}
                    onResetPress={onResetPress}
                  />
                )}
          </FlexBox>
        ) : null}
      </ExpandableBox>
    </FlexBox>
  );
};

const StickyCss = css`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 60;
`;

const Header = styled(FlexBox)<{ isSticky?: boolean }>`
  ${p => (p.isSticky ?? true ? StickyCss : '')}
  min-height: 36px;

  background-color: ${p => p.theme.modalBackgroundColor};
`;
const ExpandableBox = styled(FlexFieldSet)`
  overflow: hidden;
  max-width: 100%;

  max-height: ${p => (p.isActive ? '100%' : '0')};
  //transition: all ${p => p.theme.globals.timingFunctionMain};
`;
const HeaderButton = styled(ButtonIcon)`
  &[disabled] {
    opacity: 1;
    pointer-events: none;
  }
`;
