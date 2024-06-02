import AuthForm from 'components/Forms/Auth/AuthForm';
import RecoveryPasswordForm from 'components/Forms/Auth/RecoveryPasswordForm';
import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';

export interface PageAuthProps {
  register?: boolean;
  login?: boolean;
  recovery?: boolean;
  sendRecoveryEmail?: boolean;
}

const PageAuth: React.FC<PageAuthProps> = ({ register, recovery, login, sendRecoveryEmail }) => {
  return (
    <Page className="PageAuth">
      {(register || login) && (
        <AuthForm
          title={register ? 'Реєстрація нового користувача' : 'Для початку роботи, будь ласка, авторизуйтесь'}
          registration={register}
          login={!register}
        />
      )}

      {(recovery || sendRecoveryEmail) && (
        <RecoveryPasswordForm
          title={recovery ? 'Відновлення паролю' : 'Для відновлення паролю введіть ваш e-mail'}
          recovery={recovery}
        />
      )}
    </Page>
  );
};

const Page = styled(FlexBox)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.backdropColorDark};
`;

export default PageAuth;
