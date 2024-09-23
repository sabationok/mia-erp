import ModalHeader from './ModalHeader';
import TabSelector, { ModalFormFilterProps } from '../atoms/TabSelector';
import ModalFooter from '../atoms/Modal/ModalFooter';

import styled from 'styled-components';
import { FormEvent, memo } from 'react';
import { useModal } from '../../Providers/ModalProvider/ModalComponent';
import { CreatedModal } from '../../Providers/ModalProvider/ModalProvider';

export interface ModalFormBaseProps<T = any>
  extends CreatedModal,
    Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSelect'> {
  footer?: boolean;
  // onClose?: () => void;
  defaultState?: Partial<T>;
  beforeSubmit?: () => void;
  afterSubmit?: () => void;
  beforeClose?: () => void;
  afterClose?: () => void;
  closeAfterSubmit?: boolean;
  isValid?: boolean;
  isLoading?: boolean;
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
  filterName?: any;
}

export type ModalFormProps<V = any, D = any, FormData = any> = ModalFormBaseProps<FormData> &
  ModalFormAddsProps &
  ModalFormFilterProps<V, D>;
const ModalForm: React.FC<ModalFormProps> = ({
  title = 'default modal title',
  footer = true,
  children,
  options,
  preventDefault,
  onSubmit,
  onResetPress,
  onOptSelect,
  defaultOption,
  extraFooter,
  extraHeader,
  isValid = true,
  isLoading = false,
  onClose,
  onFilterValueSelect,
  filterName,
  onReset,
  ...props
}) => {
  const modal = useModal();
  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (!onSubmit) return console.log('No passed "onSubmit" handler');

    if (typeof onSubmit === 'function') onSubmit(ev);
  }

  function handleReset(event: any) {
    const close = onClose ?? modal.onClose;
    close();

    if (!onReset) return console.log('No passed "onReset" handler');
    if (typeof onReset === 'function') onReset(event);
  }

  return (
    <ModalFormContainer className="modalForm" onSubmit={handleSubmit} onReset={handleReset} {...props}>
      <ModalHeader title={title}>
        {options && (
          <TabSelector
            onOptSelect={onOptSelect}
            options={options}
            preventDefault={preventDefault}
            defaultOption={defaultOption}
            onFilterValueSelect={onFilterValueSelect}
            name={filterName}
            optionProps={{ fitContentH: true }}
          />
        )}
        {extraHeader}
      </ModalHeader>

      <ModalMain className="main" filterOn={!!options}>
        {children}
      </ModalMain>

      {footer && (
        <ModalFooter hasOnSubmit={!!onSubmit} extraFooter={extraFooter} canSubmit={isValid} isLoading={isLoading} />
      )}
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
  padding: 0 8px;

  min-height: 200px;
  max-height: 90vh;

  color: ${p => p.theme.fontColorSidebar};
  width: ${({ width = '480px', fillWidth, fitContentH }) =>
    (fillWidth && '100vw') || (fitContentH && 'max-content') || width};
  height: ${({ height = '', fillHeight, fitContentV }) =>
    (fillHeight && '90vh') || (fitContentV && 'max-content') || height};

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
    width: ${p => (p.fillWidth ? '98vw' : '450px')};
  }
`;

const ModalMain = styled.main<{ filterOn: boolean }>`
  display: flex;
  flex-direction: column;

  overflow: auto;
  position: relative;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  width: 100%;

  background-color: ${({ theme }) => theme.modalBackgroundColor};

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  //border-right: 1px solid ${({ theme }) => theme.modalBorderColor};
  //border-left: 1px solid ${({ theme }) => theme.modalBorderColor};
`;

export default memo(ModalForm);
