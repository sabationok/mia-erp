import InputLabel, { InputLabelProps } from '../InputLabel';
import { forwardRef, InputHTMLAttributes, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { omit, pick } from 'lodash';
import styled, { css } from 'styled-components';
import FlexBox, { FieldBox } from '../../FlexBox';
import { RefCallBack } from 'react-hook-form';
import { SelectItem } from '../../../TableList/tableTypes.types';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';
import { nanoid } from '@reduxjs/toolkit';
import CheckBox from '../../../TableList/TebleCells/CellComponents/CheckBox';

export interface CustomSelectBaseProps {
  InputComponent?: React.FC<InputHTMLAttributes<HTMLInputElement>>;
  valueKey?: string;
  options?: CustomSelectOption[];
  getOptions?: () => CustomSelectOption[];
  onSelect?: CustomSelectOnClickHandler<CustomSelectOption>;
  onClear?: () => void;
  handleOpenState?: (prevState: boolean) => boolean;
  open?: boolean;
  ref?: RefCallBack;
  selectValue?: CustomSelectOption;
  keepOpen?: boolean;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'>;
  labelProps?: Omit<InputLabelProps, 'onSelect'>;
  fieldMode?: boolean;
  treeMode?: boolean;
  multipleMode?: boolean;
  validateOption?: (option: CustomSelectOption) => boolean;
  getLabel?: (option: CustomSelectOption) => string;
  dropDownIsAbsolute?: boolean;
  onCreatePress?: () => void;
}

export type CustomSelectOnClickHandler<OptType = any> = <Option extends OptType = any>(
  option?: Option,
  value?: keyof Option,
  index?: number
) => void;

export interface CustomSelectOption {
  _id?: string;
  id?: string;
  label?: string;
  name?: string;
  secondName?: string;
  value?: string | number;
  parent?: CustomSelectOption;
  childrenList?: CustomSelectOption[];
}
export interface CustomSelectItemProps extends CustomSelectOption {
  index: number;
  isActive?: boolean;
  currentOptionId?: string;
  currentOptionValue?: string | number;
  treeMode?: boolean;
  option?: CustomSelectOption;
  level: number;
  getLabel?: (option: CustomSelectOption) => string;
  onClick?: CustomSelectOnClickHandler;
  onSelect?: (index: number, option?: any) => void;
}
const CustomSelectOptionComponent: React.FC<CustomSelectItemProps> = ({
  getLabel,
  treeMode,
  option,
  onSelect,
  onClick,
  index,
  currentOptionId,
  currentOptionValue,
  level = 0,
  ...props
}) => {
  const isActiveMemorized = useMemo(
    () =>
      (option?._id && option?._id === currentOptionId) ||
      (option?.value && option?.value === currentOptionValue) ||
      false,
    [currentOptionId, currentOptionValue, option?._id, option?.value]
  );
  const renderChildrenList = useMemo(() => {
    return option?.childrenList?.map((ch, index) => (
      <CustomSelectOptionComponent
        option={ch}
        index={index}
        onSelect={onSelect}
        treeMode={treeMode}
        getLabel={getLabel}
        level={level + 1}
        currentOptionId={currentOptionId}
        currentOptionValue={currentOptionValue}
      />
    ));
  }, [currentOptionId, currentOptionValue, level, onSelect, option?.childrenList, treeMode, getLabel]);

  return (
    <>
      <Option
        justifyContent={'flex-start'}
        gap={8}
        fillWidth
        fxDirection={'row'}
        padding={'5px 8px'}
        onClick={() => onSelect && onSelect(index, option)}
        isActive={isActiveMemorized}
        {...props}
      >
        {treeMode && <CheckBox size={'16px'} checked={isActiveMemorized} />}

        <span className={'inner'}>{getLabel && option ? getLabel(option) : option?.label || option?.name}</span>
      </Option>

      {treeMode && <FlexBox padding={'0 0 0 8px'}>{renderChildrenList}</FlexBox>}
    </>
  );
};

export type CustomSelectProps = CustomSelectBaseProps &
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
    getLabel,
    onCreatePress,
    dropDownIsAbsolute = false,
    treeMode,
    ...props
  },
  _ref
) => {
  const [currentOption, setCurrentOption] = useState<SelectItem | undefined>(selectValue);
  const [isOpen, setIsOpen] = useState<boolean>(keepOpen || open);
  const labelRef = useRef<HTMLLabelElement>(null);

  const selectId = useMemo(() => (id ? id : nanoid(5)), [id]);

  const handleOpenState = useCallback(() => {
    !keepOpen && setIsOpen(prev => !prev);
  }, [keepOpen]);

  // const isValidOption = useCallback(
  //   (option: CustomSelectOption) => {
  //     return options?.some((opt: { _id?: string }) => opt?._id === option?._id);
  //   },
  //   [options]
  // );

  const inputCurrentValue = useMemo(() => {
    return getLabel && currentOption
      ? getLabel(currentOption)
      : currentOption
      ? currentOption?.label || currentOption?.name
      : '';
  }, [currentOption, getLabel]);

  // const handleOnSelect = useCallback(
  //   (index: number, option?: any) => {
  //     if (!options || options?.length === 0) return;
  //
  //     return () => {
  //       setCurrentOption(option);
  //       if (onSelect && valueKey && valueKey && option[valueKey]) {
  //         onSelect(option, option[valueKey], index);
  //         return;
  //       }
  //       if (onSelect) {
  //         onSelect(option, option?.value, index);
  //       }
  //       !treeMode && handleOpenState();
  //     };
  //   },
  //   [handleOpenState, treeMode, onSelect, options, valueKey]
  // );
  const onSelectOption = useCallback(
    (index: number, option?: any) => {
      setCurrentOption(option);
      if (onSelect && valueKey && valueKey && option[valueKey]) {
        onSelect(option, option[valueKey], index);
        return;
      }
      if (onSelect) {
        onSelect(option, option?.value, index);
      }
      handleOpenState();
    },
    [handleOpenState, onSelect, valueKey]
  );

  const handleOnClear = useCallback(() => {
    setCurrentOption(undefined);
    setIsOpen(false);
    onClear && onClear();
  }, [onClear]);

  const renderOptions = useMemo(
    () =>
      options?.map((opt, idx) => (
        <CustomSelectOptionComponent
          key={`select-opt-${opt._id || opt?.value || idx}`}
          index={idx}
          option={opt}
          level={0}
          treeMode={treeMode}
          onSelect={onSelectOption}
          currentOptionId={currentOption?._id}
          currentOptionValue={currentOption?.value}
        />
      )),
    [currentOption?._id, currentOption?.value, onSelectOption, options, treeMode]
  );

  useEffect(() => {
    if (selectValue) return setCurrentOption(selectValue);
    if (!selectValue) return setCurrentOption(undefined);
  }, [selectValue]);

  return (
    <FlexBox fillWidth style={{ position: 'relative' }} data-select={selectId}>
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
              {...omit(
                { ...pick(props, [`${fieldMode ? 'onChange' : ''}`, 'onBlur', 'name', 'id', 'ref', 'placeholder']) },
                ['error', 'success', 'loading']
              )}
              {...inputProps}
              value={inputCurrentValue}
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

      <Options isOpen={isOpen} isInAbsolute={dropDownIsAbsolute}>
        <FlexBox fillWidth overflow={'auto'}>
          {options && options?.length > 0 ? (
            renderOptions
          ) : (
            <NoOptions fillWidth fxDirection={'row'} alignItems={'center'} justifyContent={'center'}>
              <span>{'Опції відсутні'}</span>
            </NoOptions>
          )}
          {onCreatePress && (
            <CreateButton variant={'defOutlinedSmall'} icon={'plus'} iconSize={'16px'} onClick={onCreatePress}>
              <span>{'Створити'}</span>
            </CreateButton>
          )}
        </FlexBox>
      </Options>
    </FlexBox>
  );
};

const Options = styled(FlexBox)<{
  isOpen?: boolean;
  inView?: boolean;
  intersectionRatio?: number;
  isInAbsolute?: boolean;
}>`
  ${({ isInAbsolute }) => {
    return isInAbsolute
      ? css`
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 500;
        `
      : '';
  }}

  font-size: 14px;
  overflow: hidden;

  max-height: ${({ isOpen }) => (isOpen ? '140px' : 0)};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};

  width: 100%;

  //margin-top: 6px;

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.fieldBackgroundColor};

  background-color: ${({ theme }) => theme.modalBackgroundColor};
  box-shadow: 0 10px 12px 5px rgba(21, 21, 21, 0.25), 0 10px 12px 4px rgba(211, 211, 211, 0.15);
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
`;

const Option = styled(FieldBox)<{ isActive?: boolean }>`
  min-height: 28px;
  height: max-content;

  cursor: default;

  font-weight: ${({ isActive }) => (isActive ? 700 : '')};
  background-color: ${({ theme }) => theme.modalBackgroundColor};

  & .inner {
    height: max-content;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
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
    outline: 1px solid ${({ theme }) => theme.accentColor.base};
  }

  &::placeholder {
    font-size: inherit;
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }

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
  margin-top: 8px;

  min-height: 28px;

  font-weight: 700;
  line-height: 1.3;
`;
const IconsBox = styled(FlexBox)`
  max-height: 100%;

  color: ${({ theme }) => theme.accentColor.base};
  fill: ${({ theme }) => theme.accentColor.base};
`;

const CreateButton = styled(ButtonIcon)`
  margin-top: 8px;

  color: ${({ theme }) => theme.accentColor.base};
  fill: ${({ theme }) => theme.accentColor.base};
`;

export default memo(forwardRef(CustomSelect));
