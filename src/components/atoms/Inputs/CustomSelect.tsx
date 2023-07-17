import InputLabel, { InputLabelProps } from './InputLabel';
import { forwardRef, InputHTMLAttributes, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { omit, pick } from 'lodash';
import styled from 'styled-components';
import FlexBox, { FieldBox } from '../FlexBox';
import { RefCallBack } from 'react-hook-form';
import { SelectItem } from '../../TableList/tableTypes.types';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import { nanoid } from '@reduxjs/toolkit';

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
  fieldMode?: boolean;
  validateOption?: (option: OptType) => boolean;
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
    fieldMode,
    required,
    ...props
  },
  ref
) => {
  const [currentOption, setCurrentOption] = useState<SelectItem | undefined>(selectValue);
  const [isOpen, setIsOpen] = useState<boolean>(keepOpen || open);
  const labelRef = useRef<HTMLLabelElement>(null);

  const uid = useMemo(() => nanoid(5), []);

  const handleOpenState = useCallback(() => {
    !keepOpen && setIsOpen(prev => !prev);
  }, [keepOpen]);

  const isValidOption = useCallback(
    (option: CustomSelectOption<{ _id?: string }>) => {
      return options?.some((opt: { _id?: string }) => opt?._id === option?._id);
    },
    [options]
  );

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
    setIsOpen(false);
    onClear && onClear();
  }, [onClear]);

  const renderOptions = useMemo(
    () =>
      options?.map((opt, idx) => (
        <Option
          key={`select-opt-${opt._id || opt?.value || idx}`}
          onClick={handleOnSelect(opt)}
          justifyContent={'flex-start'}
          fillWidth
          fxDirection={'row'}
          padding={'5px 8px'}
          isActive={
            (opt?._id && opt?._id === currentOption?._id) || (opt?.value && opt?.value === currentOption?.value)
          }
        >
          {opt.label || opt.name}
        </Option>
      )),
    [currentOption?._id, currentOption?.value, handleOnSelect, options]
  );

  useEffect(() => {
    const isValid = isValidOption(selectValue);

    if (selectValue && isValid) return setCurrentOption(selectValue);
    if (!selectValue || !isValid) return setCurrentOption(undefined);
  }, [isValidOption, selectValue]);

  return (
    <FlexBox fillWidth style={{ position: 'relative' }} data-select={id || uid}>
      <FlexBox fillWidth style={{ position: 'relative' }}>
        <InputLabel
          direction={'vertical'}
          required={required}
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
        >
          <LabelInner fieldMode={fieldMode} error={!!props.error} success={!!props.success}>
            <StyledInput
              disabled={!fieldMode}
              required={required}
              value={currentOption?.label || currentOption?.name || ''}
              ref={ref}
              {...omit(
                { ...pick(props, [`${fieldMode ? 'onChange' : ''}`, 'onBlur', 'name', 'id', 'ref', 'placeholder']) },
                ['error', 'success', 'loading']
              )}
              {...inputProps}
            />

            <IconsBox fxDirection={'row'} gap={6} fillHeight alignItems={'center'} padding={'0 8px 0 0'}>
              {onClear && currentOption && (
                <ButtonIcon
                  variant={'onlyIconNoEffects'}
                  className={'clearBtn'}
                  icon={'close'}
                  size={'20px'}
                  onClick={handleOnClear}
                />
              )}

              <ButtonIcon
                variant={'onlyIconNoEffects'}
                className={'clearBtn'}
                icon={!isOpen ? 'SmallArrowDown' : 'SmallArrowUp'}
                size={'24px'}
                iconSize={'100%'}
                onClick={handleOpenState}
              />
            </IconsBox>
          </LabelInner>
        </InputLabel>
      </FlexBox>

      <Options isOpen={isOpen}>
        <FlexBox fillWidth overflow={'auto'}>
          {options && options?.length > 0 ? (
            renderOptions
          ) : (
            <NoOptions fillWidth fxDirection={'row'} alignItems={'center'} justifyContent={'center'}>
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

  margin-top: 4px;

  border-radius: 2px;
  background-color: ${({ theme }) => theme.fieldBackgroundColor};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
`;

const Option = styled(FieldBox)<{ isActive?: boolean }>`
  min-height: 28px;

  font-weight: ${({ isActive }) => (isActive ? 700 : '')};
`;

const LabelInner = styled.fieldset<{
  error?: boolean;
  success?: boolean;
  fieldMode?: boolean;
}>`
  flex: 1;

  display: flex;
  align-items: center;

  padding: 0;
  margin: 0;

  width: 100%;
  min-height: 28px;

  color: ${({ error, success, theme }) =>
    (error && theme.globals.colors.error) || (success && theme.globals.colors.success) || 'inherit'};

  background-color: ${({ theme, fieldMode = 'true' }) => (fieldMode ? theme.field.backgroundColor : 'transparent')};
  border-radius: 2px;

  border: 1px solid
    ${({ error, success, fieldMode = 'true', theme }) =>
      (error && theme.globals.colors.error) ||
      (success && theme.globals.colors.success) ||
      (fieldMode && theme.field.backgroundColor) ||
      theme.input.borderColor};

  &:hover {
    border-color: ${({ theme }) => theme.accentColor.base};
    //box-shadow: 0 0 3px ${({ theme }) => theme.accentColor.base};
  }

  &:focus,
  &:focus-visible {
    border-color: ${({ theme }) => theme.accentColor.base};
    //box-shadow: 0 0 5px ${({ theme }) => theme.accentColor.base};
    outline: 1px solid ${({ theme }) => theme.accentColor.base};
  }

  &::placeholder {
    font-size: inherit;
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }

  //transition: border-color ${({ theme }) => theme.globals.timingFunctionMain};

  &[disabled] {
    pointer-events: none;
    opacity: 70%;
  }

  @media screen and (max-width: 480px) {
    height: 34px;
    font-size: 16px;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  height: 100%;

  padding: 4px 8px;
  color: inherit;
  font-weight: 500;

  background-color: transparent;
  border-radius: 0;
  border: 0;
  outline: none;

  &:hover,
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;
const NoOptions = styled(FlexBox)`
  min-height: 28px;

  font-weight: 700;
  line-height: 1.3;
`;
const IconsBox = styled(FlexBox)`
  //position: absolute;
  //top: 50%;
  //right: 4px;
  //z-index: 5;
  //transform: translateY(-50%);

  max-height: 100%;

  color: ${({ theme }) => theme.accentColor.base};
  fill: ${({ theme }) => theme.accentColor.base};
`;

export default memo(forwardRef(CustomSelect));
