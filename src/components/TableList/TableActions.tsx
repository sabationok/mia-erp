import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { memo, useMemo } from 'react';
// import { ITableAction } from './tableTypes.types';
import { useTable } from './TableList';
import { iconId } from '../../img/sprite';
import { FlexBoxBaseProps } from '../atoms/FlexBox';
import { NavLink } from 'react-router-dom';

// export interface TableActionProps<TData = any> extends ITableAction {}

export interface TableActionsProps {
  renderSeparator?: React.ReactNode;
  btnSize?: number;
  fxDirection?: FlexBoxBaseProps['fxDirection'];
}

const TableActions: React.FC<TableActionsProps> = ({ renderSeparator = <></>, btnSize = 26 }) => {
  const table = useTable();

  const renderActions = useMemo(() => {
    const Separator = () => <>{renderSeparator}</>;
    if (!table.actionsCreator) return null;
    const actions = table.actionsCreator(table);
    if (!actions || actions.length === 0) return null;

    // @ts-ignore

    return actions.map(
      ({ separator, href, description, iconSize = '90%', onClick, disabledCheck, type, icon, ...props }, idx) => {
        if (separator) {
          return <Separator key={icon || idx} />;
        }
        if (href) {
          return (
            <NavLink key={icon || idx} to={href}>
              <ButtonIcon
                variant={type || 'onlyIcon'}
                size={btnSize ? `${btnSize}px` : '26px'}
                iconSize={'90%'}
                // @ts-ignore
                iconId={icon ? iconId?.[icon] : 'info'}
                {...props}
              />
            </NavLink>
          );
        }
        return (
          <ButtonIcon
            key={icon || idx}
            variant={type || 'onlyIcon'}
            size={btnSize ? `${btnSize}px` : '26px'}
            iconSize={'90%'}
            // @ts-ignore
            iconId={icon ? iconId?.[icon] : 'info'}
            onClick={onClick}
            {...props}
          />
        );
      }
    );
  }, [btnSize, renderSeparator, table]);

  return <>{renderActions}</>;
};

export default memo(TableActions);
