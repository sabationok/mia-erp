import * as React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { t } from '../../../lang';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import CheckBox from '../../TableList/TebleCells/CellComponents/CheckBox';
import { Text } from '../../atoms/Text';
import _ from 'lodash';

export interface UseFormSubmitOptions {
  closeAfterSave?: boolean;
  close?: boolean;
  clear?: boolean;
}
const initialOptions: UseFormSubmitOptions = {
  close: true,
  clear: true,
};
export type FormAfterSubmitOptionsControl = (option: keyof UseFormSubmitOptions) => void;
export interface FormAfterSubmitOptionsProps extends UseFormSubmitOptions {
  state?: UseFormSubmitOptions;
  onOptionsChange?: (options: FormAfterSubmitOptionsProps) => void;
  toggleOption?: FormAfterSubmitOptionsControl;
  control?: FormAfterSubmitOptionsControl;
}

export const useAfterSubmitOptions = () => {
  const [state, setState] = useState<UseFormSubmitOptions>({ ...initialOptions });

  const control: FormAfterSubmitOptionsControl = useCallback((option: keyof UseFormSubmitOptions) => {
    setState(prev => ({
      ...prev,
      [option]: !prev[option],
    }));
  }, []);

  return {
    state,
    control,
  };
};

const FormAfterSubmitOptions: React.FC<FormAfterSubmitOptionsProps> = ({ control, state }) => {
  const [{ close, clear }, setAfterSubmitOptions] = useState<FormAfterSubmitOptionsProps>(initialOptions);
  const toggleStateOption = (option: keyof UseFormSubmitOptions) => {
    if (control) {
      control(option);
    } else {
      setAfterSubmitOptions(prev => ({
        ...prev,
        [option]: !prev[option],
      }));
    }
  };

  useEffect(() => {
    if (!_.isUndefined(state)) {
      setAfterSubmitOptions(p => ({ ...p, ...state }));
    }
  }, [state]);

  return (
    <Container fillWidth gap={4} padding={'4px 8px'} alignItems={'center'}>
      <Text $size={12}>{`${t('afterSave')}: `}</Text>

      <FlexBox fxDirection={'row'} gap={8} flex={1}>
        <Label
          gap={8}
          flex={1}
          fxDirection={'row'}
          justifyContent={'center'}
          onClick={() => {
            toggleStateOption('clear');
          }}
        >
          <CheckBox size={'12px'} checked={clear} name={'clear'} />

          <Text $size={12} $weight={500}>
            {t('clear')}
          </Text>
        </Label>
        <Label
          gap={8}
          flex={1}
          fxDirection={'row'}
          justifyContent={'center'}
          onClick={() => {
            toggleStateOption('close');
          }}
        >
          <CheckBox size={'12px'} checked={close} name={'close'} />

          <Text $size={12} $weight={500}>
            {t('close')}
          </Text>
        </Label>
      </FlexBox>
    </Container>
  );
};

const Container = styled(FlexBox)`
  flex-direction: column;

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`;

const Label = styled(FlexBox)`
  cursor: pointer;
  user-select: none;
`;
export default memo(FormAfterSubmitOptions);
