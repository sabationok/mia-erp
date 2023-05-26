import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { useMemo } from 'react';
import { ITableAction } from './tableTypes.types';
import { useTable } from './TableList';
import { iconId } from '../../img/sprite';

export interface TableActionProps<TData = any> extends ITableAction<TData> {}

export interface TableActionsProps {
  renderSeparator?: React.ReactNode;
}

const TActions: React.FC<TableActionsProps> = ({ renderSeparator = <></> }) => {
  const tableContext = useTable();

  const renderActions = useMemo(() => {
    if (!tableContext.actionsCreator) return null;
    const actions = tableContext.actionsCreator(tableContext);
    if (!actions || actions.length === 0) return null;

    actions.map(el => console.log(el.icon));
    return actions.map(({ separator, description, iconSize, onClick, disabledCheck, type, icon, ...props }, idx) =>
      separator ? (
        renderSeparator
      ) : (
        <ButtonIcon
          variant={type || 'onlyIcon'}
          size={'26px'}
          iconSize={iconSize}
          iconId={icon ? iconId[icon] : 'info'}
          onClick={onClick}
          {...props}
        />
      )
    );
  }, [renderSeparator, tableContext]);

  return <>{renderActions}</>;
};

export default TActions;
