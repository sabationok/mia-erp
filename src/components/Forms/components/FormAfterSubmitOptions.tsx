import * as React from 'react';
import { memo, useState } from 'react';
import t from '../../../lang';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { UseAppFormSubmitOptions } from '../../../hooks/useAppForm.hook';
import CheckBox from '../../TableList/TebleCells/CellComponents/CheckBox';

export interface FormAfterOptionsProps extends UseAppFormSubmitOptions {
  close?: boolean;
  clear?: boolean;
  onOptionsChange?: (options: FormAfterOptionsProps) => void;
  toggleOption?: (option: keyof UseAppFormSubmitOptions) => void;
}

const FormAfterSubmitOptions: React.FC<FormAfterOptionsProps> = ({ toggleOption, onOptionsChange, ...props }) => {
  const [{ closeAfterSave, clearAfterSave }, setAfterSubmitOptions] = useState<FormAfterOptionsProps>({
    closeAfterSave: props?.close || props?.closeAfterSave,
    clearAfterSave: props?.clear || props?.clearAfterSave,
  });
  const toggleStateOption = (option: keyof UseAppFormSubmitOptions) => {
    setAfterSubmitOptions(prev => {
      const newOptions = {
        ...prev,
        [option]: !prev[option],
      };
      onOptionsChange && onOptionsChange(newOptions);
      toggleOption && toggleOption(option);

      return newOptions;
    });
  };

  return (
    <Container fillWidth gap={4} padding={'4px 8px'} alignItems={'flex-start'}>
      <Label
        gap={8}
        fxDirection={'row'}
        onClick={() => {
          toggleStateOption('clearAfterSave');
        }}
      >
        <CheckBox
          size={'12px'}
          checked={clearAfterSave}
          name={'clearAfterSave'}
          onChange={() => {
            toggleStateOption('clearAfterSave');
          }}
        />

        <div>{t('clearAfterSave')}</div>
      </Label>
      <Label
        gap={8}
        fxDirection={'row'}
        onClick={() => {
          toggleStateOption('closeAfterSave');
        }}
      >
        <CheckBox
          size={'12px'}
          checked={closeAfterSave}
          name={'closeAfterSave'}
          onChange={() => {
            toggleStateOption('closeAfterSave');
          }}
        />

        <div>{t('closeAfterSave')}</div>
      </Label>
    </Container>
  );
};

const Container = styled(FlexBox)`
  min-height: 40px;
`;

const Label = styled(FlexBox)`
  cursor: pointer;
  user-select: none;
`;
export default memo(FormAfterSubmitOptions);
