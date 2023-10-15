import FlexBox from './FlexBox';
import ButtonIcon from './ButtonIcon/ButtonIcon';
import { useEffect, useMemo, useState } from 'react';
import { FilterOpt, FilterOption } from '../ModalForm/ModalFilter';
import { isUndefined } from 'lodash';

export interface StatusChangerProps<V = any> {
  options?: FilterOpt[];
  onChange?: (event: ChangerEvent<V>) => void;
  currentIndex?: number;
}
export interface ChangerEvent<V = any> {
  index: number;
  value?: FilterOption<V>['value'];
  option?: FilterOption<V>;
}

const Changer: React.FC<StatusChangerProps> = ({ options = [], onChange, currentIndex }) => {
  const [current, setCurrent] = useState<number>(0);
  const currentStatus = useMemo(() => (options ? options[current] : null), [current, options]);
  const handleChange = (increment: number) => () => {
    if (current >= 0 && current + 1 <= options?.length) {
      setCurrent(prev => {
        const newIndex = prev + increment;
        onChange && onChange({ index: newIndex, value: options[newIndex]?.value, option: options[newIndex] });

        return newIndex;
      });
    }
  };
  useEffect(() => {
    if (!isUndefined(currentIndex) && current >= 0 && current + 1 <= options.length) {
      setCurrent(currentIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FlexBox fxDirection={'row'} fillWidth height={'28px'} alignItems={'center'} gap={8}>
      <ButtonIcon
        variant={'onlyIconNoEffects'}
        icon={'SmallArrowLeft'}
        iconSize={'28px'}
        disabled={current === 0}
        onClick={handleChange(-1)}
      />
      <FlexBox
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}
        style={{
          borderRadius: 2,
          fontSize: 14,
          fontWeight: 600,
          backgroundColor: 'rgb(228, 228, 228)',
          // color: '#fff',
          // backgroundColor: currentStatus?.color || 'lightgreen',
          height: '100%',
        }}
      >
        <span
          className={'inner'}
          style={{ textAlign: 'center', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          {currentStatus?.label}
        </span>
      </FlexBox>
      <ButtonIcon
        variant={'onlyIconNoEffects'}
        icon={'SmallArrowRight'}
        iconSize={'28px'}
        disabled={current + 1 === options.length}
        onClick={handleChange(1)}
      />
    </FlexBox>
  );
};
export default Changer;
