import ModalForm from '../ModalForm';
import { useEffect, useMemo, useState } from 'react';
import { CreatedModal, useModalProvider } from '../../Providers/ModalProvider/ModalProvider';
import { useDirService, useFilteredLisData } from '../../hooks';
import { useDirectorySelector } from '../../redux/selectors.store';
import { TabOption } from '../atoms/TabSelector';
import DirListItem from './DirList/DirListItem';
import FlexBox from '../atoms/FlexBox';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { DirInTreeActionsCreatorType, IDirItemBase } from '../../types/dir.types';
import ExtraFooterWithButton from '../atoms/ExtraFooterWithButton';

export interface DirTreeComponentProps<V = any> extends CreatedModal {
  createParentTitle?: string;
  dirType: ApiDirType;
  options?: TabOption<V>[];
  filterSearchPath?: keyof IDirItemBase;
  filterDefaultValue?: string;
  actionsCreator?: DirInTreeActionsCreatorType;
}
const DirTreeComp = ({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  actionsCreator,
  ...props
}: DirTreeComponentProps) => {
  const { directory } = useDirectorySelector(dirType);
  const service = useDirService();
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
    if (!directory.length) {
      service.getAllByDirType({ data: { dirType } });
    }
    // eslint-disable-next-line
  }, []);

  function handleFilterData({ value }: TabOption) {
    value && setCurrent(value);
  }

  const fList = useFilteredLisData({
    searchParam: filterSearchPath,
    searchQuery: current,
    data: directory,
  });

  const renderList = useMemo(() => {
    return fList.map((item, index) => {
      return (
        <DirListItem
          key={`${dirType}_${item._id}`}
          item={item}
          list={item?.childrenList}
          currentLevel={0}
          {...props}
          {...actions}
        />
      );
    });
  }, [actions, dirType, fList, props]);

  return (
    <ModalForm
      style={{ maxWidth: 460 }}
      {...props}
      onOptSelect={handleFilterData}
      extraFooter={
        actions?.onCreateParent && (
          <ExtraFooterWithButton buttonText={createParentTitle || 'Create parent'} onClick={actions?.onCreateParent} />
        )
      }
    >
      <FlexBox padding={'8px 8px 8px 0'} gap={8}>
        {renderList}
      </FlexBox>
    </ModalForm>
  );
};

export default DirTreeComp;
