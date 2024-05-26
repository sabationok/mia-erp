import FlexBox, { FlexFieldSet, FlexForm } from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import FormAreaFooter from './FormAreaFooter';
import { useEffect, useState } from 'react';
import { isUndefined } from 'lodash';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';

export interface AccordionFormAreaProps {
  children?: React.ReactNode;
  renderFooter?: React.ReactNode;
  renderTitle?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
  expandable?: boolean;
  hideFooter?: boolean;
  hideLabel?: boolean;
  label?: string;
  onAcceptPress?: () => void;
  onResetPress?: () => void;
  isHeaderSticky?: boolean;

  hasOnSubmit?: boolean;
  hasOnReset?: boolean;
}
export interface AccordionFormProps extends AccordionFormAreaProps {
  onSubmit?: AppSubmitHandler;
  onReset?: () => void;
}

export const AccordionForm = ({ onSubmit, onReset, children, ...rest }: AccordionFormProps) => {
  return (
    <FlexForm fillWidth onSubmit={onSubmit} onReset={onReset}>
      <AccordionFormArea {...rest} hasOnReset={!!onReset} hasOnSubmit={!!onSubmit}>
        {children}
      </AccordionFormArea>
    </FlexForm>
  );
};

export const AccordionFormArea = ({
  children,
  renderFooter,
  renderTitle,
  disabled,
  label = 'Form area',
  isLoading,
  hideLabel,
  isOpen = true,
  expandable = true,
  onAcceptPress,
  onResetPress,
  hasOnSubmit,
  hasOnReset,
  isHeaderSticky,
  hideFooter,
}: AccordionFormAreaProps) => {
  const [_isOpen, _setIsOpen] = useState(isOpen);

  const onToggleIsOpenHandler = () => {
    _setIsOpen(p => !p);
  };
  useEffect(() => {
    if (!isUndefined(isOpen)) {
      _setIsOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <FlexBox fillWidth style={{ position: 'relative' }}>
      {!hideLabel && (
        <Header
          gap={8}
          overflow={'hidden'}
          // style={{
          //   position: !isHeaderSticky ? 'sticky' : 'static',
          // }}
          fxDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          {renderTitle || (
            <Text $size={14} $weight={600} $padding={'8px'}>
              {label}
            </Text>
          )}

          {expandable && (
            <ButtonIcon
              size={'32px'}
              padding={'1px'}
              variant={'onlyIconNoEffects'}
              icon={_isOpen ? 'SmallArrowDown' : 'SmallArrowLeft'}
              iconSize={'100%'}
              onClick={onToggleIsOpenHandler}
            />
          )}
        </Header>
      )}

      <ExpandableBox disabled={disabled} isActive={_isOpen}>
        {_isOpen ? children : null}

        {hideFooter
          ? null
          : renderFooter || (
              <FormAreaFooter
                hasOnSubmit={!!hasOnSubmit}
                hasOnReset={!!hasOnReset}
                isLoading={isLoading}
                disabled={disabled}
                onAcceptPress={onAcceptPress}
                onResetPress={onResetPress}
              />
            )}
      </ExpandableBox>
    </FlexBox>
  );
};

const Header = styled(FlexBox)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 6;

  background-color: ${p => p.theme.modalBackgroundColor};
`;
const ExpandableBox = styled(FlexFieldSet)`
  overflow: hidden;
  max-height: ${p => (p.isActive ? '100%' : '0')};
  padding: 8px;
  //transition: all ${p => p.theme.globals.timingFunctionMain};
`;
