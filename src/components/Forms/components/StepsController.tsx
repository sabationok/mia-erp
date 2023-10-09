import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { FilterOption, FilterSelectHandler } from '../../ModalForm/ModalFilter';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { checks } from '../../../utils';
import { t } from '../../../lang';

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
}: StepsControllerProps<V>) => {
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
    <Container fxDirection={'row'} gap={8} fillWidth>
      {onCancelPress && (
        <ButtonIcon variant={'filledSmall'} style={{ flex: 1 }} onClick={onCancelPress}>
          {t('Cancel')}
        </ButtonIcon>
      )}

      {prevData && (
        <ButtonIcon
          variant={'filledSmall'}
          icon={'SmallArrowLeft'}
          style={{ flex: 1 }}
          onClick={handlePrevPress}
          disabled={!prevData}
        >
          {prevData?.label}
        </ButtonIcon>
      )}

      {nextData && (
        <ButtonIcon
          variant={'filledSmall'}
          endIcon={'SmallArrowRight'}
          style={{ flex: 1 }}
          onClick={handleNextPress}
          disabled={!nextData}
        >
          {nextData?.label}
        </ButtonIcon>
      )}

      {(canSubmit || onAcceptPress) && (
        <ButtonIcon
          variant={'filledSmall'}
          type={canSubmit ? 'submit' : 'button'}
          style={{ flex: 1 }}
          onClick={onAcceptPress}
          disabled={canSubmit ? !canSubmit : !canAccept}
        >
          {t('Accept')}
        </ButtonIcon>
      )}
    </Container>
  );
};

const Container = styled(FlexBox)`
  //min-height: 44px;
  // border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
  // border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
`;
export default StepsController;
