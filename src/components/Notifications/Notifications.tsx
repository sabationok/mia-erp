import styled from 'styled-components';

const Notifications: React.FC = () => {
  return <Container>Сповіщення</Container>;
};

const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 100%;
  padding: 8px;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
`;

export default Notifications;
