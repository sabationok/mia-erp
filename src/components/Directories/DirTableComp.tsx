import ModalForm from 'components/ModalForm';
import TableList, { ITableListProps } from 'components/TableList/TableList';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ActionsCreatorOptions, DirBaseProps, DirItemTypeByDirType } from '../../types/dir.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { useModalProvider } from '../../Providers/ModalProvider/ModalProvider';
import { ISortParams } from '../../api';
import { FilterReturnDataType } from '../Filter/AppFilter';
import { useDirService } from '../../hooks';
import { useDirectorySelector } from '../../redux/selectors.store';

export interface DirTableCompProps<
  DirType extends ApiDirType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType = any
> extends DirBaseProps {
  dirType: ApiDirType;
  type?: DirItemTypeByDirType[DirType];

  getTableSettings?: (
    options: ActionsCreatorOptions<DirType, CreateDTO, UpdateDTO, ItemDataType> & {
      sortParams?: ISortParams;
      setSortParams?: (params?: ISortParams) => void;
      filterParams?: FilterReturnDataType;
      setFilterParams?: (filterData?: FilterReturnDataType) => void;
    }
  ) => ITableListProps<ItemDataType>;
}

const DirTableComp: React.FC<DirTableCompProps> = ({ type, dirType, getTableSettings, ...props }) => {
  const modalService = useModalProvider();
  const service = useDirService();
  const tableData = useDirectorySelector(dirType).directory;
  const [isLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableSettingsMemo = useMemo((): ITableListProps => {
    if (getTableSettings) {
      return {
        ...getTableSettings({
          service,
          modalService,
          type,
          sortParams,
          setSortParams,
          filterParams,
          setFilterParams,
          dirType,
        }),
      };
    }
    return {};
  }, [service, dirType, filterParams, getTableSettings, modalService, sortParams, type]);

  useEffect(() => {
    if (!tableData.length) {
      service.getAllByDirType({ data: { dirType } });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <StModalForm {...props}>
      <TableList {...tableSettingsMemo} isLoading={isLoading} tableData={tableData} />
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  background-color: ${({ theme }) => theme.modalBackgroundColor};
`;
export default DirTableComp;
