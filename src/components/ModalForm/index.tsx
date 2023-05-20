import ModalHeader from './ModalHeader';
import ModalFilter from './ModalFilter';
import ModalFooter from './ModalFooter';

import styled from 'styled-components';
import { FormEvent } from 'react';
import { useModal } from 'components/ModalProvider/ModalComponent';

export interface ModalFormProps
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'onReset'
  > {
  filterOptions?: FilterOpt[];
  footer?: boolean;
  preventFilter?: boolean;
  defaultFilterValue?: string | number;
  beforeSubmit?: <T = any>(args?: T) => void | any;
  onSubmit?: (ev: FormEvent<HTMLFormElement>) => void;
  afterSubmit?: <T = any>(args?: T) => void | any;
  beforeClose?: <T = any>(args?: T) => void | any;
  onReset?: <T = any>(args?: T) => void | any;
  afterClose?: <T = any>(args?: T) => void | any;
  onOptSelect?: (opt: FilterOpt, value: FilterOpt['value']) => void | any;
  closeAfterSubmit?: boolean;
}

export interface FilterOpt<V = any> extends Record<string, any> {
  _id?: string;
  label: string;
  name?: string;
  value: V | string | number | Date | any;
  getLabel?: () => any;
}

const ModalForm: React.FC<ModalFormProps> = ({
  title = 'default modal title',
  footer = true,
  children,
  beforeSubmit,
  filterOptions,
  defaultFilterValue,
  preventFilter,
  onSubmit,
  afterSubmit,
  beforeClose,
  onReset,
  afterClose,
  onOptSelect,
  closeAfterSubmit,
  ...props
}) => {
  const modal = useModal();

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    closeAfterSubmit && modal.onClose();

    if (!onSubmit) return console.log('No passed "onSubmit" handler');

    if (typeof beforeSubmit === 'function') beforeSubmit();
    if (typeof onSubmit === 'function') onSubmit(ev);
    if (typeof afterSubmit === 'function') afterSubmit();
  }

  function handleReset() {
    modal.onClose();
    // handleCloseModal();
    if (!onReset) return console.log('No passed "onReset" handler');
    if (typeof beforeClose === 'function') beforeClose();
    if (typeof onReset === 'function') onReset();
    if (typeof afterClose === 'function') afterClose();
  }

  function handleSelect(option: FilterOpt) {
    if (!onOptSelect) console.log('No passed "onSelect" handler', option);
    if (typeof onOptSelect === 'function') onOptSelect(option, option.value);
  }

  return (
    <ModalFormContainer
      className="modalForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
      {...props}
    >
      <ModalHeader title={title}>
        {filterOptions && handleSelect && (
          <ModalFilter
            onOptSelect={handleSelect}
            filterOptions={filterOptions}
            preventFilter={preventFilter}
            defaultFilterValue={defaultFilterValue}
          />
        )}
      </ModalHeader>

      <ModalMain className="main" filterOn={!!filterOptions}>
        <>{children}</>
      </ModalMain>

      {footer && <ModalFooter onSubmitPassed={!!onSubmit} />}
    </ModalFormContainer>
  );
};

const ModalFormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr max-content;

  position: relative;

  min-height: 250px;
  max-height: 100%;
  min-width: 250px;
  max-width: 100%;

  overflow: hidden;

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
    min-width: 450px;
  }
`;

const ModalMain = styled.main<{ filterOn: boolean }>`
  // display: grid;
  // grid-template-columns: 1fr;
  // grid-template-rows: ${({ filterOn }) => (filterOn ? '32px 1fr' : '1fr')};

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

export default ModalForm;
