import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { FilterOption, FilterSelectHandler } from '../../ModalForm/ModalFilter';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { checks } from '../../../utils';
import { t } from '../../../lang';
import { useMediaQuery } from 'react-responsive';

export interface StepsControllerProps<V = any> {
  steps?: FilterOption<V>[];
  currentIndex?: number;
  onNextPress?: FilterSelectHandler<V>;
  onPrevPress?: FilterSelectHandler<V>;

  onCancelPress?: () => void;
  onAcceptPress?: () => void;

  canGoNext?: boolean;
  canAccept?: boolean;
  canSubmit?: boolean;

  cancelButton?: boolean;
  submitButton?: boolean;
  acceptButton?: boolean;
  arrowButtons?: boolean;
}

const StepsController = <V = any,>({
  steps,
  currentIndex = 0,
  onNextPress,
  onPrevPress,
  onCancelPress,
  onAcceptPress,
  canGoNext = true,
  canAccept,
  canSubmit,
  cancelButton = true,
  submitButton = true,
  acceptButton,
  arrowButtons = true,
}: StepsControllerProps<V>) => {
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const [current, setCurrent] = useState<number>(currentIndex);

  const prevData = useMemo((): { label?: string; value: V } | null => {
    if (!steps) return null;
    return steps[current - 1] ? { label: steps[current - 1]?.label, value: steps[current - 1]?.value } : null;
  }, [current, steps]);
  const nextData = useMemo((): { label?: string; value: V } | null => {
    if (!steps) return null;

    return steps[current + 1] ? { label: steps[current + 1]?.label, value: steps[current + 1]?.value } : null;
  }, [current, steps]);

  const handlePrevPress = useCallback(() => {
    setCurrent(prev => {
      if (steps) {
        if (prev === 0) {
          onCancelPress && onCancelPress();
          return prev;
        } else {
          const newValue = prev - 1;
          onPrevPress && onPrevPress(steps[newValue], steps[newValue].value, newValue);
          return newValue;
        }
      }
      return prev;
    });
  }, [onCancelPress, onPrevPress, steps]);
  const handleNextPress = useCallback(() => {
    setCurrent(prev => {
      if (steps) {
        const newValue = prev + 1;
        if (newValue === steps.length) {
          onAcceptPress && onAcceptPress();
          return prev;
        } else {
          onNextPress && onNextPress(steps[newValue], steps[newValue].value, newValue);
          return newValue;
        }
      }

      return prev;
    });
  }, [onAcceptPress, onNextPress, steps]);

  useEffect(() => {
    if (checks.isNotUnd(currentIndex)) {
      setCurrent(currentIndex);
    }
  }, [currentIndex]);

  return (
    <Container fxDirection={'row'} gap={8} fillWidth overflow={'hidden'}>
      {cancelButton && !isTablet && (
        <ActionButton variant={'defOutlinedSmall'} onClick={onCancelPress}>
          {t('Cancel')}
        </ActionButton>
      )}

      {arrowButtons && (
        <ArrowButton
          variant={isMobile ? 'onlyIconFilled' : 'filledSmall'}
          icon={'SmallArrowLeft'}
          onClick={handlePrevPress}
          disabled={!prevData}
        >
          {prevData?.label}
        </ArrowButton>
      )}

      {arrowButtons && (
        <ArrowButton
          variant={isMobile ? 'onlyIconFilled' : 'filledSmall'}
          endIcon={'SmallArrowRight'}
          onClick={handleNextPress}
          disabled={!canGoNext || !nextData}
        >
          {nextData?.label}
        </ArrowButton>
      )}

      {(submitButton || acceptButton) && (
        <ActionButton
          variant={'filledSmall'}
          type={canSubmit && submitButton ? 'submit' : 'button'}
          onClick={onAcceptPress}
          disabled={canSubmit && submitButton ? !canSubmit : !canAccept}
        >
          {t('Accept')}
        </ActionButton>
      )}
    </Container>
  );
};

const Container = styled(FlexBox)`
  //min-height: 44px;
  // border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
  // border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
`;
const ActionButton = styled(ButtonIcon)`
  flex: 1;
  min-width: min-content;
`;
const ArrowButton = styled(ButtonIcon)`
  min-width: 34px;
  height: 100%;

  @media screen and (min-width: 480px) {
    flex: 1;
  }
`;
export default StepsController;
