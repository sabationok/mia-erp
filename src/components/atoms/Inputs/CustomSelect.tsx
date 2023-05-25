import InputLabel, { InputLabelProps } from './InputLabel';
import { InputHTMLAttributes, useCallback, useMemo, useState } from 'react';
import { isUndefined } from 'lodash';
import styled from 'styled-components';
import FlexBox from '../FlexBox';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import InputText from './InputText';

const options: CustomSelectOption[] = [{ value: 'test', _id: '113535131532', label: 'Тест' }];

export interface CustomSelectBaseProps<OptType = any> {
  InputComponent?: React.FC<InputHTMLAttributes<HTMLInputElement>>;
  valueKey?: string;
  options?: CustomSelectOption<OptType>[];
  onSelect?: CustomSelectEventHandler<CustomSelectOption<OptType>>;
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
const CustomSelect: React.FC<CustomSelectProps> = ({
  InputComponent,
  direction = 'vertical',
  valueKey,
  name,
  onSelect,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentOption, setCurrentOption] = useState();

  const onHandleOpenState = useCallback((state?: boolean) => {
    if (!isUndefined(state)) return setIsOpen(state);
    setIsOpen(prev => !prev);
  }, []);

  const onSelectHandler = useCallback(
    (value?: string | number, option?: any) => {
      return () => {
        if (onSelect && valueKey && valueKey && option[valueKey]) {
          onSelect(option[valueKey], option);
        }
        onHandleOpenState();
      };
    },
    [onHandleOpenState, onSelect, valueKey]
  );

  const renderOptions = useMemo(
    () =>
      options.map(opt => (
        <Option
          key={opt.label}
          onClick={onSelectHandler('', opt)}
          justifyContent={'flex-start'}
          fillWidth
          fxDirection={'row'}
          padding={'5px 8px'}
        >
          {opt.label}
        </Option>
      )),
    [onSelectHandler]
  );
  return (
    <InputLabel label={'CustomSelectProps'} direction={direction}>
      {InputComponent ? <InputComponent name={name} /> : <InputText name={'CustomSelectProps'} onChange={onChange} />}

      <ArrowButton variant={'onlyIconNoEffects'} icon={'SmallArrowDown'} size={'24px'} />

      <Options>{renderOptions}</Options>
    </InputLabel>
  );
};

const Options = styled(FlexBox)`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;

  max-height: 300px;
  width: 100%;
  overflow: auto;

  background-color: ${({ theme }) => theme.backgroundColorLight};
  box-shadow: ${({ theme }) => theme.globals.shadowMain};
`;

const Option = styled(FlexBox)``;
const ArrowButton = styled(ButtonIcon)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;

  fill: ${({ theme }) => theme.accentColor.base};
`;
export default CustomSelect;
