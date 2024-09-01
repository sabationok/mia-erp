import FlexBox, { FlexFieldSet, FlexForm } from '../FlexBox';
import { Text } from '../Text';
import FormAreaFooter from './FormAreaFooter';
import { useEffect, useId, useState } from 'react';
import { isUndefined } from 'lodash';
import ButtonIcon from '../ButtonIcon';
import styled, { css, useTheme } from 'styled-components';
import { Property } from 'csstype';
import { LangTextKey, t } from '../../../i18e';
import ActionsDropdown, { ActionsDropDownProps } from '../ActionsDropdown';

export interface AccordionFormBaseProps {
  isLoading?: boolean;

  disabled?: boolean;

  isOpen?: boolean;

  expandable?: boolean;

  canSubmit?: boolean;

  onSubmit?: React.FormEventHandler;
  onReset?: () => void;
}
export interface AccordionFormAreaProps extends AccordionFormBaseProps {
  children?: React.ReactNode;
  renderFooter?: React.ReactNode;
  renderTitle?: React.ReactNode;
  label?: LangTextKey;
  onAcceptPress?: () => void;
  onResetPress?: () => void;
  isHeaderSticky?: boolean;

  hideFooter?: boolean;
  hideHeader?: boolean;
  hasOnSubmit?: boolean;
  hasOnReset?: boolean;

  isEmpty?: boolean;

  maxHeight?: Property.MaxHeight;

  formId?: string;
  actions?: ActionsDropDownProps['actions'];
}

export interface AccordionFormProps extends AccordionFormAreaProps {}

export const AccordionForm = ({ isEmpty, onSubmit, onReset, children, formId, ...rest }: AccordionFormProps) => {
  const _formId = useId();

  return (
    <StyledForm
      onSubmit={ev => {
        ev.preventDefault();
        ev.stopPropagation();

        onSubmit && onSubmit(ev);
      }}
      onReset={onReset}
      maxWidth={'100%'}
      id={_formId}
    >
      <AccordionFormArea
        {...rest}
        isOpen={!children ? false : rest.isOpen}
        hasOnReset={!!onReset}
        hasOnSubmit={!!onSubmit}
        formId={formId || _formId}
      >
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
  actions,
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
        <Header
          gap={8}
          fxDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          $isSticky={isHeaderSticky}
          $isOpen={_isOpen}
        >
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
            style={{ height: '50px' }}
            flex={1}
          >
            {renderTitle || (
              <Text $size={14} $weight={600} $padding={'0 8px'}>
                {t(label)}
              </Text>
            )}
          </HeaderButton>
        </Header>
      )}

      <ExpandableBox
        className={'ExpandableBox'}
        disabled={disabled}
        flex={1}
        isActive={_isOpen}
        maxHeight={maxHeight}
        maxWidth={'100%'}
      >
        {_isOpen ? (
          <>
            {actions && (
              <FlexBox
                borderBottom={`1px solid ${theme.modalBorderColor}`}
                alignItems={'center'}
                fxDirection={'row'}
                justifyContent={'flex-end'}
                gap={8}
                padding={'8px 0'}
                margin={'0 8px'}
              >
                <ActionsDropdown actions={actions} />
              </FlexBox>
            )}

            <FlexBox flex={1} maxWidth={'100%'} overflow={'hidden'} padding={'8px'}>
              {children}
            </FlexBox>

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
          </>
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

const Header = styled(FlexBox)<{ $isSticky?: boolean; $isOpen?: boolean }>`
  ${p => (p.$isSticky ?? true ? StickyCss : '')}
  min-height: 36px;

  backdrop-filter: ${p => (p.$isOpen ? 'blur(3px)' : '')};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
  //background-color: ${p => p.theme.modalBackgroundColor};
`;
const ExpandableBox = styled(FlexFieldSet)`
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  height: unset;

  max-height: ${p => (p.isActive ? '100%' : '0')};
  transition: all ${p => p.theme.globals.timingFunctionMain};

  //&::-webkit-scrollbar {
  //  width: 4px;
  //  height: 4px;
  //}
`;
const HeaderButton = styled(ButtonIcon)`
  &[disabled] {
    opacity: 1;
    pointer-events: none;
  }
`;
