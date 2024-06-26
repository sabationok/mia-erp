import { forwardRef } from 'react';
import InputLabel, { InputLabelProps } from './InputLabel';
import InputText from './InputText';

import { IBase } from '../../../redux/app-redux.types';
import styled from 'styled-components';

export interface SelectOption extends Partial<IBase> {
  value: any;
  label?: string;
  getLabel?: (opt: Omit<SelectOption, 'getLabel'>) => string;
}

interface SelectProps {
  options?: SelectOption[];
  name?: string;
  onSelect?: (value: SelectOption['value'], option: SelectOption) => void;
  RenderInput: React.FC<any>;
  labelProps?: InputLabelProps;
}

const Select: React.ForwardRefRenderFunction<any, SelectProps> = (
  { name, RenderInput, labelProps },
  ref: React.Ref<any>
) => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <InputLabel {...labelProps}>
      <OptionsBox>
        <InputText />
      </OptionsBox>
    </InputLabel>
  );
};

const OptionsBox = styled.div`
  position: relative;

  width: 100%;
`;

export default forwardRef(Select);
