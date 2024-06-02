import InputLabel, { InputLabelProps } from './InputLabel';
import { forwardRef, InputHTMLAttributes, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isUndefined, pick } from 'lodash';
import styled, { css } from 'styled-components';
import FlexBox, { FlexFieldSet } from '../FlexBox';
import { RefCallBack } from 'react-hook-form';
import ButtonIcon from '../ButtonIcon';
import { IEmbeddedName, MaybeNull } from '../../../types/utils.types';
import { useCloseByBackdropClick } from '../../../hooks/useCloseByEscapeOrClickOnBackdrop.hook';
import { nanoid } from '@reduxjs/toolkit';
import CheckBox from 'components/TableList/TebleCells/CellComponents/CheckBox';
import InputText from './InputText';

export interface CustomSelectBaseProps<Option extends CustomSelectOptionBase = CustomSelectOptionBase> {
  InputComponent?: React.FC<InputHTMLAttributes<HTMLInputElement>>;
  valueKey?: string;
  onSelect?: CustomSelectHandler;

  options?: CustomSelectOption<Option>[];
  getOptions?: () => CustomSelectOption<Option>[];
  onClear?: () => void;
  handleOpenState?: (prevState: boolean) => boolean;
  open?: boolean;
  ref?: RefCallBack;
  selectedOption?: CustomSelectOption<Option>;
  selectedValue?: string | number;
  keepOpen?: boolean;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'>;
  labelProps?: Omit<InputLabelProps, 'onSelect'>;
  fieldMode?: boolean;
  treeMode?: boolean;
  multipleMode?: boolean;
  validateOption?: (option: CustomSelectOption<Option>) => boolean;
  getLabel?: <Data = any>(option: CustomSelectOption<Data>) => React.ReactNode;
  dropDownIsAbsolute?: boolean;
  onCreatePress?: () => void;
}

export type CustomSelectOnClickHandler = <Option = any>(option?: Option, value?: keyof Option, index?: number) => void;

export type CustomSelectHandler<Option = any> = (option: Option, value?: keyof Option, index?: number) => void;

export type CustomSelectOptionBase = {
  _id?: string;
  id?: string;
  label?: MaybeNull<string | any>;
  name?: MaybeNull<string | IEmbeddedName>;
  secondName?: string;
  value?: string | number;
};
export type CustomSelectOption<Data = any> = {
  parent?: MaybeNull<CustomSelectOption<Data>>;
  childrenList?: MaybeNull<CustomSelectOption<Data>[]>;
} & CustomSelectOptionBase &
  Data;
export interface CustomSelectItemProps extends CustomSelectOption {
  index: number;
  isActive?: boolean;
  currentOptionId?: string;
  currentOptionValue?: string | number;
  treeMode?: boolean;
  option?: CustomSelectOption<CustomSelectOptionBase>;
  level: number;
  isActiveOption?: <Data = any>(option: Data) => boolean;
  getLabel?: <Data = any>(option: CustomSelectOption<Data>) => React.ReactNode;
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
  isActive,
  ...props
}) => {
  const renderChildren = useMemo(() => {
    return option?.childrenList?.map((ch, index) => {
      const isActive =
        (option?._id && option?._id === currentOptionId) ||
        (option?.value && option?.value === currentOptionValue) ||
        false;

      return (
        <CustomSelectOptionComponent
          key={`select-opt_${ch?._id}`}
          option={ch}
          index={index}
          onSelect={onSelect}
          treeMode={treeMode}
          getLabel={getLabel}
          level={level + 1}
          isActive={isActive}
          currentOptionId={currentOptionId}
          currentOptionValue={currentOptionValue}
        />
      );
    });
  }, [
    option?.childrenList,
    option?._id,
    option?.value,
    currentOptionId,
    currentOptionValue,
    onSelect,
    treeMode,
    getLabel,
    level,
  ]);

  const renderLabel = useMemo((): undefined | string | number | null => {
    return getLabel && option ? getLabel(option) : option?.label || option?.name;
  }, [getLabel, option]);

  return (
    <>
      <Option
        justifyContent={'flex-start'}
        gap={8}
        fillWidth
        fxDirection={'row'}
        padding={'5px 8px'}
        onClick={() => onSelect && onSelect(index, option)}
        isActive={isActive}
        {...props}
      >
        {treeMode && <CheckBox size={'16px'} checked={isActive} />}

        <span className={'inner'}>{renderLabel}</span>
      </Option>

      {treeMode && <FlexBox padding={'0 0 0 8px'}>{renderChildren}</FlexBox>}
    </>
  );
};

export type CustomSelectProps<OptionData extends CustomSelectOptionBase = CustomSelectOptionBase> =
  CustomSelectBaseProps<OptionData> &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'> &
    Omit<InputLabelProps, 'onSelect'>;
// : React.ForwardRefRenderFunction<any, CustomSelectProps>
const CustomSelect = <Ref = any, Option extends CustomSelectOptionBase = CustomSelectOptionBase>(
  {
    InputComponent,
    inputProps = {},
    labelProps = {},
    selectedOption,
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
    dropDownIsAbsolute = true,
    treeMode,
    selectedValue,
    onChange,
    ...props
  }: CustomSelectProps<Option>,
  _ref: React.ForwardedRef<Ref>
) => {
  const [currentOption, setCurrentOption] = useState<CustomSelectOption | undefined>(selectedOption);
  const [isOpen, setIsOpen] = useState<boolean>(keepOpen || open);
  const labelRef = useRef<HTMLLabelElement>(null);

  const selectId = useMemo(() => (id ? id : `_${nanoid(5)}`), [id]);

  const handleOpenState = useCallback(() => {
    !keepOpen && setIsOpen(prev => !prev);
  }, [keepOpen]);

  const inputCurrentValue = useMemo(() => {
    return currentOption ? currentOption?.label || currentOption?.name || undefined : undefined;
  }, [currentOption]);

  const onSelectOption = useCallback(
    (index: number, option?: any) => {
      if (onSelect && valueKey && valueKey && option[valueKey]) {
        onSelect(option, option[valueKey], index);
        return;
      }
      if (onSelect) {
        onSelect(option, option?.value, index);
      } else {
        setCurrentOption(option);
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
          getLabel={getLabel}
          treeMode={treeMode}
          onSelect={onSelectOption}
          currentOptionId={currentOption?._id}
          currentOptionValue={currentOption?.value}
        />
      )),
    [currentOption?._id, currentOption?.value, getLabel, onSelectOption, options, treeMode]
  );

  useEffect(() => {
    if (!isUndefined(selectedOption)) {
      setCurrentOption(selectedOption);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (!isUndefined(selectedValue)) {
      setCurrentOption(
        options?.find((el: CustomSelectOptionBase) =>
          el.value ? el.value === selectedValue : el?._id === selectedValue
        )
      );
    }
  }, [options, selectedValue]);

  useCloseByBackdropClick(setIsOpen, `data-select=${selectId}`, { disabled: !isOpen });

  return (
    <FlexBox id={selectId} className={'select-box'} fillWidth data-select={selectId}>
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
        <FlexBox fillWidth style={{ position: 'relative' }}>
          <LabelInner fieldMode={fieldMode} error={!!props.error} success={!!props.success}>
            <StyledInput
              disabled={!fieldMode}
              required={required}
              // ref={_ref}

              name={name}
              onBlur={props.onBlur}
              id={id}
              placeholder={props.placeholder}
              {...inputProps}
              // defaultValue={inputCurrentValue}
              value={inputCurrentValue}
              onChange={() => {}}
            />

            <IconsBox fxDirection={'row'} gap={6} fillHeight alignItems={'center'} padding={'0 8px 0 0'}>
              {onClear && currentOption && (
                <ButtonIcon
                  variant={'onlyIconNoEffects'}
                  className={'clearBtn'}
                  icon={'close'}
                  size={'20px'}
                  onClick={handleOnClear}
                  disabled={props.disabled}
                />
              )}

              <ButtonIcon
                variant={'onlyIconNoEffects'}
                className={'openBtn'}
                icon={!isOpen ? 'SmallArrowDown' : 'SmallArrowUp'}
                size={'24px'}
                iconSize={'100%'}
                onClick={handleOpenState}
                disabled={props.disabled}
              />
            </IconsBox>
          </LabelInner>

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
                <CreateButton variant={'defaultSmall'} icon={'plus'} iconSize={'16px'} onClick={onCreatePress}>
                  <span>{'Створити'}</span>
                </CreateButton>
              )}
            </FlexBox>
          </Options>
        </FlexBox>
      </InputLabel>
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
  box-shadow: 0 3px 4px 4px rgba(21, 21, 21, 0.15), 0 3px 4px 4px rgba(99, 99, 99, 0.15);
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
`;

const SelectOptionCss = css<{ isActive?: boolean }>`
  min-height: 30px;
  height: max-content;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    color: ${({ theme }) => theme.accentColor.hover};
  }

  padding: 4px 8px;

  //cursor: default;

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
const Option = styled(FlexBox)<{ isActive?: boolean }>`
  ${SelectOptionCss}
`;

const LabelInner = styled(FlexFieldSet)<{
  error?: boolean;
  success?: boolean;
  fieldMode?: boolean;
}>`
  flex: 1;
  flex-direction: row;
  align-items: center;

  padding: 0;
  margin: 0;

  width: 100%;

  color: ${({ error, success, theme }) =>
    (error && theme.globals.colors.error) || (success && theme.globals.colors.success) || 'inherit'};

  background-color: ${({ theme, fieldMode = 'true' }) => (fieldMode ? theme.field.backgroundColor : 'transparent')};
  border-radius: 4px;

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

const StyledInput = styled(InputText)`
  flex: 1;

  //padding: 4px 8px;
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

// const dropdownRef = useRef<HTMLDivElement>(null);
// const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({});
// useLayoutEffect(() => {
//   const getAncestor = (element: HTMLElement | null) => {
//     while (element) {
//       const style = window.getComputedStyle(element);
//
//       if (style.overflow === 'auto') {
//         return element;
//       }
//       element = element.parentElement;
//     }
//     return element;
//   };
//
//   if (isOpen) {
//     const dropdown = dropdownRef.current;
//     const dropdownRect = dropdown?.getBoundingClientRect();
//
//     if (dropdownRect) {
//       if (dropdown) {
//         const ancestor = getAncestor(dropdown);
//         const ancestorRect = ancestor?.getBoundingClientRect();
//
//         console.log({ dropdown, dropdownRect });
//         console.log({ ancestor, ancestorRect });
//
//         if (ancestorRect) {
//           // Перевіряємо, чи випадаючий список виходить за межі вікна браузера
//           if (dropdownRect.bottom > ancestorRect?.bottom) {
//             // Позиціонуємо список зверху
//             setDropdownStyle({ top: '100%', bottom: 'auto' });
//           } else {
//             setDropdownStyle({ top: 'auto', bottom: '100%' });
//             // Позиціонуємо список знизу
//           }
//         }
//       }
//     }
//   }
// }, [isOpen]);
