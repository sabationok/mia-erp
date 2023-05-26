import InputLabel, { InputLabelProps } from './InputLabel';
import { forwardRef, InputHTMLAttributes, useCallback, useMemo, useRef, useState } from 'react';
import { isUndefined, omit, pick } from 'lodash';
import styled from 'styled-components';
import FlexBox, { FieldBox } from '../FlexBox';
import InputText from './InputText';
import SvgIcon from '../SvgIcon/SvgIcon';
import { RefCallBack } from 'react-hook-form';

const options: CustomSelectOption[] = [
  { value: 'test', _id: '113535131532', label: 'Тест' },
  {
    value: 'test',
    _id: 'sdfbsgbdfgdbfgbd',
    label: 'Тест 2',
  },
];

export interface CustomSelectBaseProps<OptType = any> {
  InputComponent?: React.FC<InputHTMLAttributes<HTMLInputElement>>;
  valueKey?: string;
  options?: CustomSelectOption<OptType>[];
  onSelect?: CustomSelectEventHandler<CustomSelectOption<OptType>>;
  handleOpenState?: (prevState: boolean) => boolean;
  open?: boolean;
  ref?: RefCallBack;
}

export type CustomSelectEventHandler<OptType = any> = <Option extends OptType = any>(
  value: keyof Option,
  option: Option
) => void;

interface CustomSelectOptionBaseProps {
  value?: string | number;
  label: string;
  onClick?: CustomSelectEventHandler;
}

export type CustomSelectOption<OptType = Record<string, any>> = CustomSelectOptionBaseProps & OptType;

export type CustomSelectProps = CustomSelectBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'> &
  Omit<InputLabelProps, 'onSelect'>;

const CustomSelect: React.ForwardRefRenderFunction<any, CustomSelectProps> = (
  { InputComponent, valueKey, options = [], name, onSelect, open = false, ...props },
  ref
) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [currentOption, setCurrentOption] = useState<any>();
  const labelRef = useRef<HTMLLabelElement>(null);

  const onHandleOpenState = useCallback((state?: boolean) => {
    setIsOpen(prev => {
      if (prev) labelRef.current?.focus();
      if (!isUndefined(state)) return state;
      return !prev;
    });
  }, []);

  const onSelectHandler = useCallback(
    (option?: any) => {
      if (options.length === 0) return;
      return () => {
        setCurrentOption(option);
        if (onSelect && valueKey && valueKey && option[valueKey]) {
          onSelect(option[valueKey], option);
        }
        onHandleOpenState();
      };
    },
    [onHandleOpenState, onSelect, options.length, valueKey]
  );

  const renderOptions = useMemo(
    () =>
      options.map(opt => (
        <Option
          key={opt._id}
          onClick={onSelectHandler(opt)}
          justifyContent={'flex-start'}
          fillWidth
          fxDirection={'row'}
          padding={'5px 8px'}
        >
          {opt.label}
        </Option>
      )),
    [onSelectHandler, options]
  );

  return (
    <FlexBox fillWidth gap={4} style={{ position: 'relative' }}>
      <InputLabel
        direction={'vertical'}
        ref={labelRef}
        {...pick(props, [
          'error',
          'success',
          'helperText',
          'label',
          'loading',
          'htmlFor',
          'uppercase',
          'align',
          'direction',
        ])}
        onClick={() => onHandleOpenState()}
      >
        {InputComponent ? (
          <InputComponent />
        ) : (
          <InputText
            disabled
            value={currentOption?.label || ''}
            ref={ref}
            {...omit({ ...pick(props, ['onChange', 'onBlur', 'name', 'id', 'ref']) }, ['error', 'success', 'loading'])}
          />
        )}

        <ArrowIcon icon={!isOpen ? 'SmallArrowDown' : 'SmallArrowUp'} size={'20px'} />
      </InputLabel>

      {options.length > 0 && <Options isOpen={isOpen}>{renderOptions}</Options>}
    </FlexBox>
  );
};

const Options = styled(FlexBox)<{ isOpen?: boolean; inView?: boolean; intersectionRatio?: number }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 100;
  font-size: 14px;

  max-height: ${({ isOpen }) => (isOpen ? '100px' : 0)};
  width: 100%;
  overflow: auto;

  background-color: ${({ theme }) => theme.fieldBackgroundColor};
  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
`;

const Option = styled(FieldBox)`
  min-height: 26px;
`;

const ArrowIcon = styled(SvgIcon)`
  position: absolute;
  top: 50%;
  right: 4px;
  z-index: 5;
  margin-top: -10px;

  color: ${({ theme }) => theme.accentColor.base};
  fill: ${({ theme }) => theme.accentColor.base};
`;
export default forwardRef(CustomSelect);
