import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { FilterOption, FilterOptionSelectHandler } from '../../ModalForm/ModalFilter';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { useMemo, useState } from 'react';

export interface StepsControllerProps<V = any> {
  steps?: FilterOption<V>[];
  initialStepIndex?: number;
  onNextPress?: FilterOptionSelectHandler<V>;
  onPrevPress?: FilterOptionSelectHandler<V>;
}

const StepsController = <V = any,>({
  steps,
  initialStepIndex = 0,
  onNextPress,
  onPrevPress,
}: StepsControllerProps<V>) => {
  const [current, setCurrent] = useState<number>(initialStepIndex);
  const prevData = useMemo((): { label?: string; value: V } | null => {
    if (!steps) return null;
    return steps[current - 1] ? { label: steps[current - 1]?.label, value: steps[current - 1]?.value } : null;
  }, [current, steps]);
  const nextData = useMemo((): { label?: string; value: V } | null => {
    if (!steps) return null;

    return steps[current + 1] ? { label: steps[current + 1]?.label, value: steps[current + 1]?.value } : null;
  }, [current, steps]);

  const onPressHandler = (direction: -1 | 1) => () => {
    setCurrent(prev => {
      const newValue = prev + direction;

      if (steps) {
        if (direction > 0) {
          onNextPress && onNextPress(steps[newValue], steps[newValue].value, newValue);
        } else {
          onPrevPress && onPrevPress(steps[newValue], steps[newValue].value, newValue);
        }
      }
      return newValue;
    });
  };

  return (
    <Container fillWidth>
      <FlexBox fxDirection={'row'} padding={'4px 8px'} gap={8}>
        <ButtonIcon
          variant={'filledSmall'}
          icon={'SmallArrowLeft'}
          style={{ flex: 1 }}
          onClick={onPressHandler(-1)}
          disabled={!prevData}
        >
          {prevData?.label}
        </ButtonIcon>

        <ButtonIcon
          variant={'filledSmall'}
          endIcon={'SmallArrowRight'}
          style={{ flex: 1 }}
          onClick={onPressHandler(1)}
          disabled={!nextData}
        >
          {nextData?.label}
        </ButtonIcon>
      </FlexBox>
    </Container>
  );
};

const Container = styled(FlexBox)`
  min-height: 44px;
  border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
  border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
`;
export default StepsController;
