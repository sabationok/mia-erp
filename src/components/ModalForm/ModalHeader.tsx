import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import styled from 'styled-components';

export interface ModalFormHeaderProps {
  title: string;
}

const ModalHeader: React.FC<ModalFormHeaderProps & React.ImgHTMLAttributes<HTMLDivElement>> = ({
  title = 'default header titile',
  children,
  ...props
}) => {
  return (
    <HeaderContainer {...props} className="header">
      <Header>
        <Title className="title" title={title || ''}>
          {title}
        </Title>

        <ButtonIcon type="reset" size="28px" iconSize={'90%'} iconId={iconId.close} variant="onlyIconNoEffects" />
      </Header>

      {children && <ExtraHeader>{children}</ExtraHeader>}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  width: 100%;
  min-height: 28px;

  border-top-right-radius: 2px;
  border-top-left-radius: 2px;

  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.modalBackgroundColor};
`;
const Title = styled.p`
  //color: #efefef;
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
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* position: sticky;
  top: 0;
  left: 0; */

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  width: 100%;
  min-height: 28px;

  border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
`;
const ExtraHeader = styled.div`
  width: 100%;
  height: min-content;
  overflow: hidden;
`;

export default ModalHeader;
