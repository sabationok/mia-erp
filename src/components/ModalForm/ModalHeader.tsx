import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import styled from 'styled-components';

const ModalHeader: React.FC<{ title: string }> = ({ title = 'default header titile' }) => {
  return (
    <Header>
      <Title>{title}</Title>

      <ButtonIcon type="reset" size="28px" iconId={iconId.close} variant="onlyIcon" />
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* position: sticky;
  top: 0;
  left: 0; */

  width: 100%;
  min-height: 28px;

  border-top-right-radius: 2px;
  border-top-left-radius: 2px;

  color: ${({ theme }) => theme.fontColorHeader};

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
`;
const Title = styled.p`
  color: #efefef;
  text-transform: uppercase;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 700;

  padding: 6px 8px;
  height: 100%;

  flex-basis: 100px;
  flex-grow: 1;
`;

export default ModalHeader;
