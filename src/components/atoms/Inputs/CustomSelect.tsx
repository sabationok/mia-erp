import InputLabel, { InputLabelProps } from './InputLabel';
import { forwardRef, InputHTMLAttributes, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { omit, pick } from 'lodash';
import styled from 'styled-components';
import FlexBox, { FieldBox } from '../FlexBox';
import InputText from './InputText';
import SvgIcon from '../SvgIcon/SvgIcon';
import { RefCallBack } from 'react-hook-form';
import { SelectItem } from '../../TableList/tableTypes.types';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

export interface CustomSelectBaseProps<OptType = any> {
  InputComponent?: React.FC<InputHTMLAttributes<HTMLInputElement>>;
  valueKey?: string;
  options?: CustomSelectOption<OptType>[];
  getOptions?: () => CustomSelectOption<OptType>[];
  onSelect?: CustomSelectOnClickHandler<CustomSelectOption<OptType>>;
  onClear?: () => void;
  handleOpenState?: (prevState: boolean) => boolean;
  open?: boolean;
  ref?: RefCallBack;
  selectValue?: OptType;
  keepOpen?: boolean;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'>;
  labelProps?: Omit<InputLabelProps, 'onSelect'>;
}

export type CustomSelectOnClickHandler<OptType = any> = <Option extends OptType = any>(
  option?: Option,
  value?: keyof Option
) => void;

interface CustomSelectOptionBaseProps extends SelectItem {
  onClick?: CustomSelectOnClickHandler;
}

export type CustomSelectOption<OptType = Record<string, any>> = CustomSelectOptionBaseProps & OptType;

export type CustomSelectProps<OptType = any> = CustomSelectBaseProps<OptType> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'> &
  Omit<InputLabelProps, 'onSelect'>;

const CustomSelect: React.ForwardRefRenderFunction<any, CustomSelectProps> = (
  {
    InputComponent,
    inputProps = {},
    labelProps = {},
    selectValue,
    keepOpen,
    valueKey,
    id,
    options,
    name,
    open = false,
    onSelect,
    onClear,
    ...props
  },
  ref
) => {
  const [currentOption, setCurrentOption] = useState<SelectItem | undefined>(selectValue);
  const [isOpen, setIsOpen] = useState<boolean>(keepOpen || open);
  const labelRef = useRef<HTMLLabelElement>(null);

  const uid = useMemo(() => Math.random().toFixed(5), []);

  const handleOpenState = useCallback(() => {
    !keepOpen && setIsOpen(prev => !prev);
  }, [keepOpen]);

  const handleOnSelect = useCallback(
    (option?: any) => {
      if (!options || options?.length === 0) return;
      return () => {
        setCurrentOption(option);
        if (onSelect && valueKey && valueKey && option[valueKey]) {
          onSelect(option, option[valueKey]);
          return;
        }
        if (onSelect) {
          onSelect(option, option?.value);
        }
        handleOpenState();
      };
    },
    [handleOpenState, onSelect, options, valueKey]
  );

  const handleOnClear = useCallback(() => {
    setCurrentOption(undefined);
    onClear && onClear();
  }, [onClear]);

  const renderOptions = useMemo(
    () =>
      options?.map(opt => (
        <Option
          key={opt._id}
          onClick={handleOnSelect(opt)}
          justifyContent={'flex-start'}
          fillWidth
          fxDirection={'row'}
          padding={'5px 8px'}
          isActive={opt?._id === currentOption?._id}
        >
          {opt.label || opt.name}
        </Option>
      )),
    [currentOption?._id, handleOnSelect, options]
  );

  useEffect(() => {
    if (uid) return;
    console.log('Render CustomSelect', id || uid);

    // function onMenuClose(ev: MouseEvent | KeyboardEvent) {
    //   const { target } = ev;
    //   if (target instanceof HTMLElement && !target?.closest(`[data-select="${id || uid}"]`)) setIsOpen(false);
    //   if (ev instanceof KeyboardEvent && ev?.code === 'Escape') setIsOpen(false);
    // }
    //
    // document.addEventListener('click', onMenuClose);
    // return () => {
    //   document.removeEventListener('click', onMenuClose);
    // };
  }, [id, uid]);

  useEffect(() => {
    if (selectValue) return setCurrentOption(selectValue);
    if (!selectValue) return setCurrentOption(undefined);
  }, [selectValue]);

  return (
    <FlexBox fillWidth gap={4} style={{ position: 'relative' }} data-select={id || uid}>
      <FlexBox fillWidth style={{ position: 'relative' }}>
        <InputLabel
          direction={'vertical'}
          ref={labelRef}
          {...pick(props, [
            'error',
            'success',
            'helperText',
            'loading',
            'label',
            'id',
            'uppercase',
            'align',
            'direction',
            'disabled',
          ])}
          {...labelProps}
          onClick={handleOpenState}
        >
          {InputComponent ? (
            <InputComponent />
          ) : (
            <InputText
              disabled
              value={currentOption?.label || currentOption?.name || ''}
              ref={ref}
              {...omit({ ...pick(props, ['onChange', 'onBlur', 'name', 'id', 'ref', 'placeholder']) }, [
                'error',
                'success',
                'loading',
              ])}
              {...inputProps}
              style={{ paddingRight: '60px' }}
            />
          )}
          <IconsBox fxDirection={'row'} gap={6}>
            {onClear && currentOption && (
              <ButtonIcon
                variant={'onlyIconNoEffects'}
                className={'clearIcon'}
                icon={'close'}
                size={'20px'}
                onClick={handleOnClear}
              />
            )}

            <SvgIcon className={'openIcon'} icon={!isOpen ? 'SmallArrowDown' : 'SmallArrowUp'} size={'20px'} />
          </IconsBox>
        </InputLabel>
      </FlexBox>

      <Options isOpen={isOpen}>
        <FlexBox fillWidth overflow={'auto'}>
          {options && options?.length > 0 ? (
            renderOptions
          ) : (
            <NoOptions fillWidth fxDirection={'row'} justifyContent={'center'}>
              Опції відсутні
            </NoOptions>
          )}
        </FlexBox>
      </Options>
    </FlexBox>
  );
};

const Options = styled(FlexBox)<{ isOpen?: boolean; inView?: boolean; intersectionRatio?: number }>`
  // position: absolute;
  // top: calc(100% + 4px);
  // left: 0;
  // z-index: ${({ isOpen }) => (isOpen ? 100 : 10)};
  font-size: 14px;

  max-height: ${({ isOpen }) => (isOpen ? '120px' : 0)};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  width: 100%;
  overflow: hidden;

  background-color: ${({ theme }) => theme.fieldBackgroundColor};
  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
`;

const Option = styled(FieldBox)<{ isActive?: boolean }>`
  min-height: 26px;

  font-weight: ${({ isActive }) => (isActive ? 700 : '')};
`;
const NoOptions = styled(FlexBox)`
  font-weight: 700;
  line-height: 1.3;
`;

const IconsBox = styled(FlexBox)`
  position: absolute;
  top: 50%;
  right: 4px;
  z-index: 5;

  max-height: 100%;

  transform: translateY(-50%);

  color: ${({ theme }) => theme.accentColor.base};
  fill: ${({ theme }) => theme.accentColor.base};
`;

export default memo(forwardRef(CustomSelect));
