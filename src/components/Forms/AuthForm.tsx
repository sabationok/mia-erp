import React, { FormEvent } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import LogoSvg from 'components/Layout/Header/LogoSvg/LogoSvg';
import AuthInputLabel from '../atoms/Inputs/AuthInputLabel';
import NavLinkIcon from 'components/atoms/LinkIcon/NavLinkIcon';
import { Link } from 'react-router-dom';
import useAuthService from '../../redux/auth/useAppAuth.hook';
import { useForm } from 'react-hook-form';
import InputText from '../atoms/Inputs/InputText';

export interface Props {
  helloTitle?: string;
  title: string;
  register?: boolean;
  recovery?: boolean;
}

export interface IRegistrationFormData {
  name: string;
  secondName: string;
  email: string;
  password: string;
  approvePassword: string;
}

const initialFormDataLogin: Partial<
  Pick<IRegistrationFormData, 'email' | 'password'>
> = { email: '', password: '' };

const initialFormDataRegister: IRegistrationFormData = {
  name: '',
  secondName: '',
  email: '',
  password: '',
  approvePassword: '',
};
export type AuthFormProps = Props & React.HTMLAttributes<HTMLFormElement>;
const AuthForm: React.FC<AuthFormProps> = ({
  title,
  register: registration,
  recovery,
  ...props
}) => {
  const authService = useAuthService();

  const { register, getValues, watch } = useForm<
    Partial<IRegistrationFormData>
  >({});
  const formValues = watch();

  function onFormSubmit(ev: FormEvent) {
    ev.preventDefault();

    console.log('formDAta', getValues());
    !registration && authService.loginUser(getValues());
  }

  return (
    <Form {...props} onSubmit={onFormSubmit}>
      <StLogo />

      <Title>{title}</Title>

      <Links>
        <StNavLink textTransform="uppercase" variant="def" to={'/auth/login'}>
          {'Вхід'}
        </StNavLink>

        <StNavLink
          textTransform="uppercase"
          variant="def"
          to={'/auth/register'}
        >
          {'Реєстрація'}
        </StNavLink>
      </Links>

      <Inputs>
        {registration && (
          <>
            <AuthInputLabel icon="personOutlined">
              <InputText
                placeholder="І'мя"
                value={formValues.name}
                {...register('name')}
              />
            </AuthInputLabel>

            <AuthInputLabel icon="personOutlined">
              <InputText
                placeholder="Прізвище"
                value={formValues.secondName}
                {...register('secondName')}
              />
            </AuthInputLabel>

            <AuthInputLabel icon="email">
              <InputText
                placeholder="Електронна адреса"
                value={formValues.email}
                {...register('email')}
              />
            </AuthInputLabel>
            <AuthInputLabel icon="lock_O">
              <InputText
                placeholder="Пароль"
                type="password"
                value={formValues.password}
                {...register('password')}
              />
            </AuthInputLabel>
            <AuthInputLabel
              icon="lock_O"
              // success={
              //   formValues.approvePassword
              //     ? formValues.approvePassword === formValues.password
              //     : false
              // }
              // error={
              //   formValues.approvePassword
              //     ? formValues.approvePassword !== formValues.password
              //     : false
              // }
            >
              <InputText
                placeholder="Повторіть пароль"
                type="password"
                value={formValues.approvePassword}
                {...register('approvePassword')}
              />
            </AuthInputLabel>
          </>
        )}

        {!registration && (
          <>
            <AuthInputLabel icon="email">
              <InputText
                placeholder="Електронна адреса"
                value={formValues.email}
                {...register('email')}
              />
            </AuthInputLabel>
            <AuthInputLabel icon="lock_O">
              <InputText
                placeholder="Пароль"
                type="password"
                value={formValues.password}
                {...register('password')}
              />
            </AuthInputLabel>
          </>
        )}
      </Inputs>

      <Buttons>
        <StButtonIcon
          type="submit"
          textTransform="uppercase"
          variant="filledSmall"
        >
          {registration ? 'Зареєструватись' : 'Увійти'}
        </StButtonIcon>

        {!registration && (
          <StLink to={'/auth/sendRecoveryPasswordMail'}>
            {'Забули пароль?'}
          </StLink>
        )}
      </Buttons>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  min-width: 250px;
  width: 100%;
  height: max-content;
  /* min-height: max-content; */
  max-width: 480px;
  max-height: 98vh;

  overflow: auto;

  padding: 20px 16px;

  border-radius: 2px;

  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  border: 1px solid ${({ theme }) => theme.trBorderClr};
  /* background-color: #1c1c1e; */
  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  @media screen and (max-width: 480px) {
    max-width: 95vw;
  }
`;
const StLogo = styled(LogoSvg)`
  min-width: 150px;
  height: 64px;

  & .logoName {
    font-size: 18px;
    @media screen and (max-width: 480px) {
      display: block;
    }
  }
`;

const Title = styled.p`
  font-size: 16px;
  line-height: 1.4;
  text-align: center;

  margin-bottom: 20px;

  max-width: 280px;
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  width: 100%;
  height: 36px;

  margin-bottom: 16px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  margin-bottom: 12px;
  width: 100%;
  max-width: 280px;

  fill: ${({ theme }) => theme.accentColor.base};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  width: 100%;
  max-width: 230px;
`;
const StButtonIcon = styled(ButtonIcon)`
  font-weight: 600;

  min-width: 165px;
  width: 100%;
`;
const StLink = styled(Link)`
  font-size: 11px;
  line-height: 1.45;

  text-decoration: underline;

  color: ${({ theme }) => theme.accentColor.base};

  &:hover {
    color: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    color: ${({ theme }) => theme.accentColor.pressed};
  }
`;

const StNavLink = styled(NavLinkIcon)`
  position: relative;

  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;

  border-radius: 0;
  border-style: none;
  border-width: 0;

  &::before {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.trBorderClr};
  }

  &::after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 1px;
    width: 100%;
    height: 3px;
    width: 0;
    transition: all ${({ theme }) => theme.globals.timingFnMui};
    transform: translate(-50%);
    background-color: ${({ theme }) => theme.accentColor.base};
  }

  &.active {
    &::after {
      width: 80%;
    }
  }

  &:hover,
  &:focus {
    outline-style: none;

    &::after {
      width: 100%;
    }
  }
`;

export default AuthForm;