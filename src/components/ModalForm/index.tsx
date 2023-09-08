import ModalHeader from './ModalHeader';
import ModalFilter, { ModalFormFilterProps } from './ModalFilter';
import ModalFooter from './ModalFooter';

import styled from 'styled-components';
import { FormEvent, memo } from 'react';

export interface ModalFormBaseProps<T = any>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onReset'> {
  onSubmit?: (ev: FormEvent<HTMLFormElement>) => void;
  onReset?: (args?: any) => void;
  footer?: boolean;
  onClose?: () => void;
  defaultState?: Partial<T>;
  beforeSubmit?: () => void;
  afterSubmit?: () => void;
  beforeClose?: () => void;
  afterClose?: () => void;
  closeAfterSubmit?: boolean;
  isValid?: boolean;
}

export interface ModalFormAddsProps {
  footer?: boolean;
  extraFooter?: React.ReactNode;
  extraHeader?: React.ReactNode;
  fillWidth?: boolean;
  fillHeight?: boolean;
  fitContentV?: boolean;
  fitContentH?: boolean;
  height?: string;
  width?: string;
}

export type ModalFormProps<V = any, D = any, DataType = any> = ModalFormBaseProps<DataType> &
  ModalFormAddsProps &
  ModalFormFilterProps<V, D>;
const ModalForm: React.FC<ModalFormProps> = ({
  title = 'default modal title',
  footer = true,
  children,
  beforeSubmit,
  filterOptions,
  preventFilter,
  onSubmit,
  afterSubmit,
  beforeClose,
  onReset,
  afterClose,
  onOptSelect,
  closeAfterSubmit,
  defaultOption,
  extraFooter,
  extraHeader,
  isValid = true,
  onClose,
  ...props
}) => {
  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    // closeAfterSubmit && onClose && onClose();

    if (!onSubmit) return console.log('No passed "onSubmit" handler');

    // if (typeof beforeSubmit === 'function') beforeSubmit();
    // if (typeof onSubmit === 'function') onSubmit(ev);
    // if (typeof afterSubmit === 'function') afterSubmit();
  }

  function handleReset() {
    onClose && onClose();
    // handleCloseModal();
    if (!onReset) return console.log('No passed "onReset" handler');
    // if (typeof beforeClose === 'function') beforeClose();
    // if (typeof onReset === 'function') onReset();
    // if (typeof afterClose === 'function') afterClose();
  }

  return (
    <ModalFormContainer className="modalForm" onSubmit={handleSubmit} onReset={handleReset} {...props}>
      <ModalHeader title={title}>
        {filterOptions && (
          <ModalFilter
            onOptSelect={onOptSelect}
            filterOptions={filterOptions}
            preventFilter={preventFilter}
            defaultOption={defaultOption}
          />
        )}
        {extraHeader}
      </ModalHeader>

      <ModalMain className="main" filterOn={!!filterOptions}>
        {children}
      </ModalMain>

      {footer && <ModalFooter onSubmitPassed={!!onSubmit} extraFooter={extraFooter} isValid={isValid} />}
    </ModalFormContainer>
  );
};

const ModalFormContainer = styled.form<
  Pick<ModalFormAddsProps, 'fillHeight' | 'fillWidth' | 'fitContentH' | 'fitContentV' | 'width' | 'height'>
>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr max-content;

  position: relative;

  min-height: 200px;
  max-height: 100%;

  width: ${({ width = '480px', fillWidth, fitContentH }) =>
    (fillWidth && '100vw') || (fitContentH && 'max-content') || width};
  height: ${({ height = '', fillHeight, fitContentV }) =>
    (fillHeight && '100vh') || (fitContentV && 'max-content') || height};

  min-width: 250px;
  max-width: 100%;

  //overflow: hidden;

  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  fill: ${({ theme }) => theme.fillColor};
  color: ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.modalBackgroundColor};

  border-radius: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
  /* resize: both; */

  @media screen and (max-width: 480px) {
    width: 98vw;
  }

  @media screen and (min-width: 480px) {
    width: 450px;
  }
`;

const ModalMain = styled.main<{ filterOn: boolean }>`
  // display: grid;
  // grid-template-columns: 1fr;
  // grid-template-rows: ${({ filterOn }) => (filterOn ? '32px 1fr' : '1fr')};
  display: flex;
  flex-direction: column;

  overflow: hidden;
  position: relative;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  width: 100%;

  background-color: ${({ theme }) => theme.modalBackgroundColor};

  border-right: 1px solid ${({ theme }) => theme.modalBorderColor};
  border-left: 1px solid ${({ theme }) => theme.modalBorderColor};
`;

export default memo(ModalForm);
