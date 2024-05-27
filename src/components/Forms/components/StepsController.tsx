import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { FilterOption } from '../../atoms/TabSelector';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { checks } from '../../../utils';
import { t } from '../../../lang';
import { useMediaQuery } from 'react-responsive';
import { MaybeNull } from '../../../types/utils.types';

export type StepChangeEvent<V = any, D = any> = {
  option: FilterOption<V, D>;
  value: V;
  index: number;
  name?: string;
};
export type StepChangeHandler<V = any, D = any> = (event: StepChangeEvent<V, D>) => void;
export interface StepsControllerProps<V = any> {
  steps?: FilterOption<V>[];
  currentIndex?: number;
  onNextPress?: StepChangeHandler<V>;
  onPrevPress?: StepChangeHandler<V>;

  onCancelPress?: () => void;
  onAcceptPress?: () => void;

  canGoNext?: boolean;
  canAccept?: boolean;
  canSubmit?: boolean;

  isLoading?: boolean;

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
  submitButton = false,
  acceptButton,
  arrowButtons = true,
  isLoading,
}: StepsControllerProps<V>) => {
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const [current, setCurrent] = useState<number>(currentIndex);

  const prevData = useMemo((): { label?: MaybeNull<string>; value: V } | null => {
    if (!steps) return null;
    return steps[current - 1] ? { label: steps[current - 1]?.label, value: steps[current - 1]?.value } : null;
  }, [current, steps]);
  const nextData = useMemo((): { label?: MaybeNull<string>; value: V } | null => {
    if (!steps) return null;

    return steps[current + 1] ? { label: steps[current + 1]?.label, value: steps[current + 1]?.value } : null;
  }, [current, steps]);

  const handlePrevPress = useCallback(() => {
    if (steps) {
      if (onPrevPress) {
        if (current === 0) {
          onCancelPress && onCancelPress();
          return;
        } else {
          const newValue = current - 1;
          onPrevPress && onPrevPress({ option: steps[newValue], value: steps[newValue].value, index: newValue });
        }
      } else {
        setCurrent(prev => {
          if (prev === 0) {
            return prev;
          } else {
            return prev - 1;
          }
        });
      }
    }
  }, [current, onCancelPress, onPrevPress, steps]);

  const handleNextPress = useCallback(() => {
    if (steps) {
      if (onNextPress) {
        const newValue = current + 1;
        if (newValue === steps.length) {
          return onAcceptPress && onAcceptPress();
        } else {
          return onNextPress({ option: steps[newValue], value: steps[newValue].value, index: newValue });
        }
      } else {
        setCurrent(prev => {
          return prev + 1 === steps.length ? prev + 1 : prev;
        });
      }
    }
  }, [current, onAcceptPress, onNextPress, steps]);

  useEffect(() => {
    if (checks.isNotUnd(currentIndex)) {
      setCurrent(currentIndex);
    }
  }, [currentIndex]);

  return (
    <Container fxDirection={'row'} gap={8} fillWidth>
      {cancelButton && !isTablet && (
        <ActionButton variant={'defaultSmall'} isLoading={isLoading} onClick={onCancelPress}>
          {t('Cancel')}
        </ActionButton>
      )}

      {arrowButtons && (
        <ArrowButton
          variant={isMobile ? 'onlyIconFilled' : 'filledSmall'}
          icon={'SmallArrowLeft'}
          onClick={handlePrevPress}
          disabled={isLoading || !prevData}
        >
          {prevData?.label}
        </ArrowButton>
      )}

      {arrowButtons && (
        <ArrowButton
          variant={isMobile ? 'onlyIconFilled' : 'filledSmall'}
          endIcon={'SmallArrowRight'}
          onClick={handleNextPress}
          disabled={isLoading || !canGoNext || !nextData}
        >
          {nextData?.label}
        </ArrowButton>
      )}

      {(submitButton || acceptButton) && (
        <ActionButton
          variant={'filledSmall'}
          type={canSubmit && submitButton ? 'submit' : 'button'}
          onClick={onAcceptPress}
          isLoading={isLoading}
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
  padding-top: 0;
  padding-bottom: 0;

  flex: 1;

  min-width: min-content;
  height: 100%;
`;
const ArrowButton = styled(ButtonIcon)`
  min-width: 34px;
  height: 100%;
  // color: ${p => p.theme.accentColor.base};
  // fill: ${p => p.theme.accentColor.base};
  // background-color: ${p => p.theme.accentColor.light};
  @media screen and (min-width: 480px) {
    flex: 1;
  }
`;
export default StepsController;
