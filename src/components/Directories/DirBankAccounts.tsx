import ModalForm from '../ModalForm';
import { useEffect, useMemo, useState } from 'react';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { useFilteredLisData } from '../../hooks';
import { useFinancesSelector } from '../../redux/selectors.store';
import ModalFilter, { FilterOpt, FilterOption } from '../atoms/ModalFilter';
import DirListItem from './DirList/DirListItem';
import FlexBox from '../atoms/FlexBox';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { DirInTreeActionsCreatorType } from '../../types/dir.types';
import { RenderModalComponentChildrenProps } from '../ModalProvider/ModalComponent';
import ExtraFooterWithButton from '../atoms/ExtraFooterWithButton';
import { BankAccountDestinationType, IBankAccount } from '../../types/finances/bank-accounts.types';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { AppModuleName } from '../../redux/reduxTypes.types';

export interface DirBankAccountsCompProps extends RenderModalComponentChildrenProps {
  createParentTitle?: string;
  dirType?: ApiDirType;
  filterSearchPath?: keyof IBankAccount;
  filterDefaultValue?: string;
  filterOptions?: FilterOption<BankAccountDestinationType>[];
  actionsCreator?: DirInTreeActionsCreatorType;
}
const DirBankAccountsComp = ({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  actionsCreator,
  modalId,
  filterOptions,
  ...props
}: DirBankAccountsCompProps) => {
  const list = useFinancesSelector().bankAccounts;
  const service = useAppServiceProvider()[AppModuleName.finances];
  const modalService = useModalProvider();
  const [current, setCurrent] = useState(filterDefaultValue);

  const actions = useMemo(
    () =>
      actionsCreator &&
      actionsCreator({
        modalService,
        type: current,
        service,
        dirType,
      }),
    [actionsCreator, current, service, dirType, modalService]
  );

  useEffect(() => {
    // if (!directory.length) {
    service.bankAccounts.getList();
    // }
    // eslint-disable-next-line
  }, []);

  function handleFilterData({ value }: FilterOpt) {
    value && setCurrent(value);
  }

  const fList = useFilteredLisData({
    searchParam: filterSearchPath,
    searchQuery: current,
    data: list,
  });

  const renderList = useMemo(() => {
    return fList.map((item, index) => {
      return (
        <DirListItem key={`${dirType}_${item._id}`} item={item as never} currentLevel={0} {...props} {...actions} />
      );
    });
  }, [actions, dirType, fList, props]);

  return (
    <ModalForm
      style={{ maxWidth: 480 }}
      {...props}
      extraFooter={
        actions?.onCreateParent && (
          <ExtraFooterWithButton buttonText={createParentTitle || 'Create parent'} onClick={actions?.onCreateParent} />
        )
      }
    >
      <FlexBox>
        <ModalFilter optionProps={{ fitContentH: true }} onOptSelect={handleFilterData} filterOptions={filterOptions} />
      </FlexBox>

      <FlexBox overflow={'auto'}>
        <FlexBox padding={'8px 4px'} gap={8}>
          {renderList}
        </FlexBox>
      </FlexBox>
    </ModalForm>
  );
};

export default DirBankAccountsComp;
