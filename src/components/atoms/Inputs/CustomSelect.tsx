import InputLabel, { InputLabelProps } from './InputLabel';
import {
  forwardRef,
  InputHTMLAttributes,
  memo,
  RefCallback,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isUndefined } from 'lodash';
import styled, { css } from 'styled-components';
import FlexBox, { FlexFieldSet, FlexLi, FlexUl } from '../FlexBox';
import ButtonIcon from '../ButtonIcon';
import { IEmbeddedName, MaybeNull } from '../../../types/utils.types';
import { nanoid } from '@reduxjs/toolkit';
import CheckBox from 'components/TableList/TebleCells/CellComponents/CheckBox';
import { useCloseByBackdropClick } from '../../../hooks/useCloseByEscapeOrClickOnBackdrop.hook';
import InputText from './InputText';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface CustomSelectBaseProps<Option extends CustomSelectOptionBase = CustomSelectOptionBase> {
  InputComponent?: React.FC<InputHTMLAttributes<HTMLSelectElement>>;
  valueKey?: string;
  valuePath?: string;

  inputControl?: UseFormRegisterReturn & { value?: string };
  ref?: RefCallback<any>;

  labelProps?: Omit<InputLabelProps, 'onSelect'>;

  onSelect?: CustomSelectHandler<Option>;

  error?: { message?: string } & Record<string, any>;
  isTouched?: boolean;
  isDirty?: boolean;

  options?: Option[];
  getOptions?: () => Option[];
  validateOption?: (option: Option) => boolean;

  onClear?: () => void;

  handleOpenState?: (prevState: boolean) => boolean;
  open?: boolean;

  selectedOption?: Option;
  selectedValue?: string | number;
  keepOpen?: boolean;

  fieldMode?: boolean;

  dropDownIsAbsolute?: boolean;

  onCreatePress?: () => void;
}

export type CustomSelectHandler<Option = CustomSelectOption, Value = any> = (
  option: Option,
  value?: Value,
  index?: number
) => void;

export type CustomSelectProps<Option extends CustomSelectOption = CustomSelectOption> = CustomSelectBaseProps<Option> &
  Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'onSelect'> &
  Pick<InputLabelProps, 'label' | 'required' | 'error' | 'success'> &
  Pick<CustomSelectItemProps, 'getLabel' | 'treeMode'>;

const CustomSelect = <Ref = any, Value = any, Option extends CustomSelectOption<Value> = CustomSelectOption<Value>>(
  {
    InputComponent,
    inputControl,
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
    fieldMode = true,
    required,
    getLabel,
    onCreatePress,
    dropDownIsAbsolute = true,
    treeMode,
    multiple = true,
    selectedValue,
    onChange,
    disabled,
    label,
    error,
    success,
    ...props
  }: CustomSelectProps<Option>,
  _ref: React.ForwardedRef<Ref>
) => {
  const [_currentOption, setCurrentOption] = useState<CustomSelectOption | undefined>(selectedOption);

  const labelRef = useRef<HTMLFieldSetElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef(null);

  const [isOpen, setIsOpen] = useState<boolean>(keepOpen || open);

  const _compId = useMemo(() => (id ? id : `_${nanoid(5)}`), [id]);

  const handleOpenState = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const isActiveCheck = useCallback(
    <Option extends CustomSelectOption>(option: Option) => {
      const currentOption = selectedOption || _currentOption;

      const key = option._id || option?.value;
      const activeKey = currentOption?._id || currentOption?.value;

      return key === activeKey;
    },
    [_currentOption, selectedOption]
  );

  const onSelectOption = useCallback(
    (option: Option, value?: Value, index?: number) => {
      if (onSelect) {
        onSelect(option, option?.value, index);
      } else {
        setCurrentOption(option);
      }

      setIsOpen(false);
    },
    [onSelect]
  );

  const handleOnClear = useCallback(() => {
    if (onClear) {
      onClear();
    }
    setCurrentOption(undefined);
    setIsOpen(false);
  }, [onClear]);

  const renderOptions = useMemo(
    () =>
      !!options?.length ? (
        options?.map((opt, idx) => {
          const key = opt._id || opt?.value;

          return (
            <CustomSelectItem<any, Option>
              key={`select-opt-${key || idx}`}
              index={idx}
              option={opt as never}
              isActive={isActiveCheck(opt)}
              isActiveCheck={isActiveCheck}
              level={0}
              getLabel={getLabel}
              treeMode={treeMode}
              onSelect={onSelectOption}
            />
          );
        })
      ) : (
        <NoOptions fillWidth fxDirection={'row'} alignItems={'center'} justifyContent={'center'}>
          <span>{'Опції відсутні'}</span>
        </NoOptions>
      ),
    [getLabel, isActiveCheck, onSelectOption, options, treeMode]
  );

  useEffect(() => {
    if (inputRef.current && _currentOption) {
      inputRef.current.value = _currentOption?.label || _currentOption?.name;
    }
  }, [_currentOption]);

  useEffect(() => {
    if (!isUndefined(selectedOption)) {
      setCurrentOption(selectedOption);
    }
  }, [selectedOption]);

  // useEffect(() => {
  //   if (!isUndefined(selectedValue)) {
  //     setCurrentOption(
  //       options?.find((el: CustomSelectOptionBase) => el.value === selectedValue || el?._id === selectedValue)
  //     );
  //   }
  // }, [options, selectedValue]);

  useCloseByBackdropClick(setIsOpen, `data-select=${_compId}`, { disabled: !isOpen });

  return (
    <InputLabel
      id={_compId}
      className={'select-box'}
      data-select={_compId}
      direction={'vertical'}
      required={required}
      ref={labelRef}
      disabled={disabled}
      {...{ label, error, success }}
      {...labelProps}
    >
      <FlexBox className={'SelectOptionsListContainer'} fillWidth style={{ position: 'relative' }}>
        <LabelInner fieldMode={fieldMode} error={!!error} success={!!success} isActive={isOpen}>
          <StyledInput
            disabled={fieldMode}
            fieldMode={fieldMode}
            required={required}
            id={id}
            {...inputControl}
            placeholder={props.placeholder}
            ref={inputRef}
          />

          <ActionsBox fxDirection={'row'} gap={6} fillHeight alignItems={'center'} padding={'0 8px 0 0'}>
            {onClear && _currentOption && (
              <ButtonIcon
                variant={'onlyIconNoEffects'}
                className={'clearBtn'}
                icon={'close'}
                size={'26px'}
                onClick={handleOnClear}
                disabled={disabled}
              />
            )}

            <ButtonIcon
              variant={'onlyIconNoEffects'}
              className={'openBtn'}
              icon={!isOpen ? 'SmallArrowDown' : 'SmallArrowUp'}
              size={'26px'}
              iconSize={'100%'}
              onClick={keepOpen ? undefined : handleOpenState}
              disabled={disabled}
            />
          </ActionsBox>
        </LabelInner>

        <OptionsList isOpen={isOpen} ref={listBoxRef}>
          <FlexBox fillWidth overflow={'auto'}>
            {renderOptions}

            {onCreatePress && (
              <FlexBox padding={'8px'}>
                <CreateButton variant={'defaultMiddle'} icon={'plus'} iconSize={'20px'} onClick={onCreatePress}>
                  <span>{'Створити'}</span>
                </CreateButton>
              </FlexBox>
            )}
          </FlexBox>
        </OptionsList>
      </FlexBox>
    </InputLabel>
  );
};

const OptionsList = styled(FlexUl)<{
  isOpen?: boolean;
  inView?: boolean;
  intersectionRatio?: number;
  isInAbsolute?: boolean;
}>`
  font-size: 14px;
  overflow: hidden;

  width: 100%;

  position: absolute;
  top: 115%;
  left: 0;
  z-index: 70;

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.modalBorderColor};

  background-color: ${({ theme }) => theme.modalBackgroundColor};
  box-shadow:
    0 3px 4px 4px rgba(21, 21, 21, 0.15),
    0 3px 4px 4px rgba(220, 220, 220, 0.15);
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
  ${p =>
    p.isOpen
      ? css`
          max-height: calc(30px * 4);
          @media screen and (max-width: 480px) {
            max-height: calc(38px * 4);
          }
          opacity: 1;
        `
      : css`
          opacity: 0;
          max-height: 0;
          pointer-events: none;
          visibility: hidden;
        `};
`;

const LabelInner = styled(FlexFieldSet)<{
  error?: boolean;
  success?: boolean;
  fieldMode?: boolean;
}>`
  flex: 1;
  flex-direction: row;
  align-items: center;

  position: relative;

  padding: 0;
  margin: 0;

  width: 100%;

  color: ${({ error, success, theme }) =>
    (error && theme.globals.colors.error) || (success && theme.globals.colors.success) || 'inherit'};

  background-color: ${({ theme, fieldMode = 'true' }) => (fieldMode ? theme.field.backgroundColor : 'transparent')};
  border-radius: 4px;

  border: 1px solid
    ${({ error, success, fieldMode = true, theme }) =>
      (error && theme.globals.colors.error) ||
      (success && theme.globals.colors.success) ||
      (fieldMode && theme.field.backgroundColor) ||
      theme.input.borderColor};

  &:hover {
    border-color: ${({ theme }) => theme.accentColor.base};
    //box-shadow: 0 0 3px ${({ theme }) => theme.accentColor.base};
  }

  &:focus,
  &:focus-within,
  &:focus-visible {
    border-color: ${({ theme }) => theme.accentColor.base};
    outline: 1px solid ${({ theme }) => theme.accentColor.base};
    box-shadow: 0 0 5px ${({ theme }) => theme.accentColor.base};
  }

  ${p =>
    p.isActive
      ? css`
          border-color: ${({ theme }) => theme.accentColor.base};
          outline: 1px solid ${({ theme }) => theme.accentColor.base};
          box-shadow: 0 0 5px ${({ theme }) => theme.accentColor.base};
        `
      : ''}
  &::placeholder {
    font-size: inherit;
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }

  transition: all ${p => p.theme.globals.timingFunctionMain};

  &[disabled] {
    pointer-events: none;
    opacity: 70%;
  }

  @media screen and (max-width: 480px) {
    height: 34px;
    font-size: 16px;
  }
`;

const StyledInput = styled(InputText)<{ fieldMode?: boolean }>`
  flex: 1;

  //padding: 4px 8px;

  background-color: transparent;
  border-radius: inherit;
  border: 0;
  outline: none;
  box-shadow: unset;

  &:hover,
  &:focus,
  &:focus-visible {
    border: 0;
    outline: none;

    box-shadow: unset;
  }
`;

const NoOptions = styled(FlexBox)`
  min-height: 46px;

  justify-content: center;
  align-items: center;

  font-weight: 700;
  line-height: 1.55;
`;

const ActionsBox = styled(FlexBox)`
  //position: absolute;
  //right: 0;

  max-height: 100%;

  color: ${({ theme }) => theme.accentColor.base};
  fill: ${({ theme }) => theme.accentColor.base};
`;

const CreateButton = styled(ButtonIcon)`
  color: ${({ theme }) => theme.accentColor.base};
  fill: ${({ theme }) => theme.accentColor.base};
`;

export default memo(forwardRef(CustomSelect));

export type CustomSelectOptionBase<Value = any> = {
  _id?: string;
  id?: string;
  value?: Value;

  label?: MaybeNull<string | any>;
  name?: MaybeNull<string | IEmbeddedName>;

  // secondName?: string;
};
export type CustomSelectOption<Value = any> = {
  parent?: MaybeNull<CustomSelectOption<Value>>;
  childrenList?: MaybeNull<CustomSelectOption<Value>[]>;
} & CustomSelectOptionBase<Value>;

export type CustomSelectItemProps<Value = any, Option extends CustomSelectOption<Value> = CustomSelectOption<Value>> = {
  index: number;
  level: number;

  isActive?: boolean;
  treeMode?: boolean;

  option: Option;
  isActiveCheck?: (option: Option) => boolean;
  getLabel?: (option: Option) => React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onSelect?: (option: Option, value?: Value, index?: number) => void;
};
const CustomSelectItem = <Value = any, Option extends CustomSelectOption<Value> = CustomSelectOption<Value>>(
  props: CustomSelectItemProps<Value, Option>
) => {
  const { getLabel, onClick, treeMode, option, onSelect, index, level = 0, isActive, isActiveCheck } = props;

  const renderChildren = useMemo(() => {
    return option?.childrenList?.map((ch, index) => {
      return (
        <CustomSelectItem<Value, Option>
          {...props}
          key={`select-opt_${ch?._id}`}
          option={ch as never}
          index={index}
          level={level + 1}
          isActive={isActiveCheck && isActiveCheck(ch as never)}
        />
      );
    });
  }, [option?.childrenList, isActiveCheck, props, level]);

  const renderLabel = useMemo(() => {
    return getLabel && option ? getLabel(option) ?? '---' : option?.label || option?.name;
  }, [getLabel, option]);

  return (
    <FlexLi>
      <Option
        className={'selectOption'}
        justifyContent={'flex-start'}
        id={option?._id}
        gap={8}
        fillWidth
        fxDirection={'row'}
        padding={'8px 10px'}
        isActive={isActive}
        onClick={event => {
          onClick && onClick(event);
          onSelect && onSelect(option, option?.value, index);
        }}
      >
        {treeMode && <CheckBox size={'16px'} checked={isActive} />}

        <span className={'inner'}>{renderLabel}</span>
      </Option>

      {treeMode && (
        <FlexUl padding={'0 0 0 8px'} className={'childrenList'}>
          {renderChildren}
        </FlexUl>
      )}
    </FlexLi>
  );
};

const SelectOptionCss = css<{ isActive?: boolean }>`
  min-height: 30px;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    color: ${({ theme }) => theme.accentColor.hover};
    background-color: ${({ theme }) => theme.accentColor.extraLight};
  }

  ${p =>
    p.isActive
      ? css`
          color: ${({ theme }) => theme.accentColor.hover};
          background-color: ${({ theme }) => theme.accentColor.extraLight};
        `
      : ''}

  padding: 4px 8px;

  font-weight: ${({ isActive }) => (isActive ? 700 : '')};

  & .inner {
    height: max-content;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  @media screen and (max-width: 480px) {
    min-height: 38px;
  }
`;
const Option = styled(FlexBox)`
  ${SelectOptionCss};
`;
