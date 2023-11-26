import ModalForm from 'components/ModalForm';
import TableList, { ITableListProps } from 'components/TableList/TableList';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DirBaseProps } from '../../types/dir.types';
import { IContractor } from '../../redux/directories/contractors.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';

export interface DirContractorsProps extends DirBaseProps {
  tableSettings?: ITableListProps<IContractor>;
}

const DirContractors: React.FC<DirContractorsProps> = ({ tableSettings, ...props }) => {
  const { directories } = useAppServiceProvider();

  useEffect(() => {
    directories.getAllByDirType({ data: { dirType: ApiDirType.CONTRACTORS } });
    // eslint-disable-next-line
  }, []);

  return (
    <StModalForm fillWidth fillHeight {...props}>
      <TableList {...tableSettings} />
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  width: max-content;
  min-height: 50vh;

  & .modalFooter {
    padding: 8px;
  }

  & .tOverHead {
    padding: 8px;
  }
`;
export default DirContractors;
