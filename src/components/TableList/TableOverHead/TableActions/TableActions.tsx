import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';

import styled from 'styled-components';
import { TableActionsProps } from '../../TableList';

const TableActions: React.FC<TableActionsProps> = ({ top, bottom }) => {
  return (
    <Menu>
      <List>
        <Separator />

        <Left top={!!top}>
          {top &&
            top.map(({ name, disableChek, ...props }, idx) => (
              <ButtonIcon
                key={idx}
                variant="onlyIcon"
                disabled={disableChek instanceof Function && disableChek()}
                size="28px"
                iconSize="80%"
                {...props}
              />
            ))}
        </Left>

        <Separator />

        <Right bottom={!!bottom}>
          {bottom &&
            bottom.map(({ name, disableChek, ...props }, idx) => (
              <ButtonIcon
                key={idx}
                variant="onlyIconFilled"
                disabled={disableChek instanceof Function && disableChek()}
                size="28px"
                // iconSize="80%"
                {...props}
              />
            ))}
        </Right>
      </List>
    </Menu>
  );
};

const Menu = styled.div`
  flex-grow: 1;

  display: flex;
  justify-content: flex-end;
`;
const List = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  /* min-height: 48px; */
  overflow: hidden;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;
`;
const Left = styled(Content)<{ top: boolean }>``;

const Right = styled(Content)<{ bottom: boolean }>``;

const Separator = styled.div`
  position: relative;

  height: 100%;
  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    width: 1px;
    border-right: 1px solid ${({ theme }) => theme.trBorderClr};
  }
`;

export default TableActions;
