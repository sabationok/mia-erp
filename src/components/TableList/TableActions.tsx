import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { memo, useMemo } from 'react';
// import { ITableAction } from './tableTypes.types';
import { useTable } from './TableList';
import { iconId } from '../../img/sprite';

// export interface TableActionProps<TData = any> extends ITableAction {}

export interface TableActionsProps {
  renderSeparator?: React.ReactNode;
  btnSize?: number;
}

const TableActions: React.FC<TableActionsProps> = ({ renderSeparator = <></>, btnSize = 26 }) => {
  const tableContext = useTable();

  const renderActions = useMemo(() => {
    const Separator = () => <>{renderSeparator}</>;
    if (!tableContext.actionsCreator) return null;
    const actions = tableContext.actionsCreator(tableContext);
    if (!actions || actions.length === 0) return null;

    // @ts-ignore
    // @ts-ignore
    return actions.map(
      ({ separator, description, iconSize = '90%', onClick, disabledCheck, type, icon, ...props }, idx) =>
        separator ? (
          <Separator key={icon || idx} />
        ) : (
          <ButtonIcon
            key={icon || idx}
            variant={type || 'onlyIcon'}
            size={btnSize ? `${btnSize}px` : '26px'}
            iconSize={'90%'}
            // @ts-ignore
            iconId={icon ? iconId[icon] : 'info'}
            onClick={onClick}
            {...props}
          />
        )
    );
  }, [btnSize, renderSeparator, tableContext]);

  return <>{renderActions}</>;
};

export default memo(TableActions);
