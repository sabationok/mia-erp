import ModalHeader from './ModalHeader';
import ModalFilter from './ModalFilter';
import ModalFooter from './ModalFooter';

import styled from 'styled-components';
import { FormEvent } from 'react';
import { useModal } from 'components/ModalProvider/ModalComponent';

export interface ModalFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  filterOptions?: FilterOpt[];
  beforeSubmit?: () => void | any;
  afterSubmit?: () => void | any;
  beforeClose?: () => void | any;
  onReset?: () => void | any;
  afterClose?: () => void | any;
  onOptSelect?: (opt: FilterOpt) => void | any;
}
export interface FilterOpt extends Record<string, any> {
  _id?: string;
  label: string;
  name?: string;
  value: string;
}

const ModalForm: React.FC<ModalFormProps> = ({
  title = 'default modal title',
  children,
  beforeSubmit,
  filterOptions,
  onSubmit,
  afterSubmit,
  beforeClose,
  onReset,
  afterClose,
  onOptSelect,
  ...props
}) => {
  const modal = useModal();

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    modal.onClose();
    // handleCloseModal();

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
    if (typeof onOptSelect === 'function') onOptSelect(option);
  }

  return (
    <ModalFormContainer onSubmit={handleSubmit} onReset={handleReset} {...props}>
      <ModalHeader title={title} />

      <ModalMain filterOn={filterOptions ? true : false}>
        {filterOptions && <ModalFilter onOptSelect={handleSelect} filterOptions={filterOptions} />}

        <MainScroll>{children}</MainScroll>
      </ModalMain>

      <ModalFooter onSubmit={onSubmit} />
    </ModalFormContainer>
  );
};

const ModalFormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 28px 1fr max-content;

  position: relative;

  min-height: 100%;
  max-height: 100%;
  min-width: 250px;
  max-width: 100%;

  border-radius: 2px;
  overflow: hidden;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  fill: ${({ theme }) => theme.fillColor};
  color: ${({ theme }) => theme.fontColor};

  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  /* resize: both; */

  @media screen and (max-width: 480px) {
    width: 98vw;
  }

  @media screen and (min-width: 480px) {
    min-width: 450px;
  }
`;

const ModalMain = styled.main<{ filterOn: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${({ filterOn }) => (filterOn ? 'min-content 1fr' : '1fr')};

  overflow: hidden;
  /* position: relative; */

  height: 100%;
  max-width: 100%;
  width: 100%;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  border-right: 1px solid ${({ theme }) => theme.trBorderClr};
  border-left: 1px solid ${({ theme }) => theme.trBorderClr};
`;

const MainScroll = styled.div`
  overflow: auto;

  max-width: 100%;
  min-width: min-content;
  height: 100%;
  max-height: 100%;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
`;

export default ModalForm;
