import FlexBox from './FlexBox';
import ButtonIcon from './ButtonIcon';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'styled-components';
import { Text } from './Text';
import { IconIdType } from '../../img/sprite';
import { LangPack } from '../../lang';
import { checks } from '../../utils';

export interface ChangerOption<T = any, D = any> {
  _id?: string;
  value: T;
  data?: D;
  color?: string;
  icon?: IconIdType;
  backgroundColor?: string;
  label?: string;
  lang?: LangPack;
}

export interface StatusChangerProps<V = any, N = any> {
  name?: N;
  options?: ChangerOption<V>[];
  onChange?: (event: ChangerEvent<V, N>) => void;
  currentIndex?: number;
  currentOption?: ChangerOption<V>;
  colorIndicator?: boolean;
  disabled?: boolean;
}

export interface ChangerEvent<V = any, N = any> {
  index: number;
  name?: N;
  value: ChangerOption<V>['value'];
  option?: ChangerOption<V>;
}

const Changer = <V = any,>({
  options = [],
  colorIndicator = true,
  onChange,
  currentOption,
  currentIndex,
  disabled,
  name,
}: StatusChangerProps<V>): JSX.Element => {
  const [current, setCurrent] = useState<number>(0);
  const currentStatus = useMemo(() => (options ? options[current] : null), [current, options]);
  const theme = useTheme();

  useEffect(() => {
    if (checks.isFun(onChange) && checks.isUnd(currentOption ?? currentIndex)) {
      console.warn('Changer', 'You try to use uncontrolled "Changer" component\n', 'You need to pass option or index');
    }
  }, [onChange, currentOption, currentIndex]);
  const handleChange = (increment: number) => () => {
    if (checks.isFun(onChange)) {
      const newIndex = current + increment;
      onChange({ index: newIndex, value: options[newIndex]?.value, option: options[newIndex] });
      return;
    }

    if (current >= 0 && current + 1 <= options?.length) {
      setCurrent(prev => prev + increment);
    }
  };
  useEffect(() => {
    if (!checks.isUnd(currentIndex) && current >= 0 && current + 1 <= options.length) {
      setCurrent(currentIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    if (!checks.isUnd(currentOption)) {
      const index = options.findIndex(o => {
        if (currentOption?.value) {
          return o?.value === currentOption?.value;
        } else if (currentOption?._id) {
          return o?._id === currentOption?._id;
        }
        return false;
      });

      index >= 0 && index !== current && setCurrent(index);
    }

    // eslint-disable-next-line
  }, [currentOption]);

  return (
    <FlexBox fxDirection={'row'} fillWidth height={'28px'} alignItems={'center'} gap={8}>
      <ButtonIcon
        variant={'onlyIconNoEffects'}
        icon={'SmallArrowLeft'}
        iconSize={'28px'}
        disabled={disabled || current === 0}
        onClick={handleChange(-1)}
      />

      <FlexBox
        flex={1}
        alignItems={'stretch'}
        justifyContent={'center'}
        overflow={'hidden'}
        style={{
          borderRadius: 2,
          backgroundColor: theme.fieldBackgroundColor,
          color: theme.fontColorSidebar,
          height: '100%',
        }}
      >
        <FlexBox fillWidth fxDirection={'row'} justifyContent={'center'} alignItems={'center'} flex={1}>
          <Text $size={15} $weight={600} className={'inner'} $ellipsisMode={true}>
            {currentStatus?.label}
          </Text>
        </FlexBox>

        {colorIndicator && currentStatus?.color && (
          <FlexBox fillWidth height={'4px'} style={{ backgroundColor: currentStatus?.backgroundColor }} />
        )}
      </FlexBox>

      <ButtonIcon
        variant={'onlyIconNoEffects'}
        icon={'SmallArrowRight'}
        iconSize={'28px'}
        disabled={disabled || current + 1 === options.length}
        onClick={handleChange(1)}
      />
    </FlexBox>
  );
};
export default Changer;
