import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import styled from 'styled-components';

export interface ModalFormHeaderProps {
  title: string;
}

const ModalHeader: React.FC<ModalFormHeaderProps & React.ImgHTMLAttributes<HTMLDivElement>> = ({
                                                                                                 title = 'default header titile',
                                                                                                 ...props
                                                                                               }) => {
  return (
    <Header {...props} className='header'>
      <Title className='title' title={title || ''}>{title}</Title>

      <ButtonIcon type='reset' size='28px' iconId={iconId.close} variant='onlyIcon' />
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

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  width: 100%;
  min-height: 28px;

  border-top-right-radius: 2px;
  border-top-left-radius: 2px;

  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorMain};
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
