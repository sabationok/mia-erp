import AuthForm from 'components/Forms/AuthForm';
import RecoveryPasswordForm from 'components/Forms/RecoveryPasswordForm';
import styled from 'styled-components';

export interface PageAuthProps {
  register?: boolean;
  login?: boolean;
  recovery?: boolean;
  sendRecoveryMail?: boolean;
}

const PageAuth: React.FC<PageAuthProps> = ({ register, recovery, login, sendRecoveryMail }) => {
  return (
    <Page className="PageAuth">
      {(register || login) && (
        <AuthForm
          title={register ? 'Реєстрація нового користувача' : 'Для початку роботи, будь ласка, авторизуйтесь'}
          registration={register}
          login={!register}
        />
      )}

      {(recovery || sendRecoveryMail) && (
        <RecoveryPasswordForm
          title={recovery ? 'Відновлення паролю' : 'Для відновлення паролю введіть ваш e-mail'}
          recovery={recovery}
        />
      )}
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.backgroundColorMain};
`;

export default PageAuth;
