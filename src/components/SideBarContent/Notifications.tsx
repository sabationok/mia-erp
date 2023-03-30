import styled from 'styled-components';

const Notifications: React.FC = () => {
  return <Container>Сповіщення</Container>;
};

const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 32px;
  width: 100%;
  max-width: 100%;
  /* padding: 8px; */

  /* background-color: ${({ theme }) => theme.backgroundColorSecondary}; */
`;

export default Notifications;
