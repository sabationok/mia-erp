import ModalForm from '../ModalForm';
import { useEffect, useMemo, useState } from 'react';
import { CreatedModal, useModalProvider } from '../../Providers/ModalProvider/ModalProvider';
import { useFilteredLisData } from '../../hooks';
import { useFinancesSelector } from '../../redux/selectors.store';
import TabSelector, { TabOption } from '../atoms/TabSelector';
import DirListItem from './DirList/DirListItem';
import FlexBox from '../atoms/FlexBox';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { DirInTreeActionsCreatorType } from '../../types/dir.types';
import ExtraFooterWithButton from '../atoms/ExtraFooterWithButton';
import { BankAccountDestinationType, IBankAccount } from '../../types/finances/bank-accounts.types';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { AppModuleName } from '../../redux/reduxTypes.types';

export interface DirBankAccountsCompProps extends CreatedModal {
  createParentTitle?: string;
  dirType?: ApiDirType;
  filterSearchPath?: keyof IBankAccount;
  filterDefaultValue?: string;
  tabs?: TabOption<BankAccountDestinationType>[];
  actionsCreator?: DirInTreeActionsCreatorType;
}
const DirBankAccountsComp = ({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  actionsCreator,
  tabs,
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

  function handleFilterData({ value }: TabOption) {
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
      options={tabs}
      extraFooter={
        actions?.onCreateParent && (
          <ExtraFooterWithButton buttonText={createParentTitle || 'Create parent'} onClick={actions?.onCreateParent} />
        )
      }
    >
      <FlexBox>
        <TabSelector optionProps={{ fitContentH: true }} onOptSelect={handleFilterData} options={tabs} />
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
