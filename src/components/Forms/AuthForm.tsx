import React, { useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoSvg from 'components/Layout/Header/LogoSvg/LogoSvg';
import AuthFormInput from './AuthFormInput';
import LinkIcon from 'components/atoms/LinkIcon/LinkIcon';

export interface AuthFormProps {
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

const initialFormDataLogin: Partial<Pick<IRegistrationFormData, 'email' | 'password'>> = { email: '', password: '' };
const initialFormDataRegister: IRegistrationFormData = {
  name: '',
  secondName: '',
  email: '',
  password: '',
  approvePassword: '',
};

const AuthForm: React.FC<AuthFormProps & React.HTMLAttributes<HTMLFormElement>> = ({
  title,
  register,
  recovery,
  ...props
}) => {
  const [formData, setFormData] = useState<Partial<IRegistrationFormData>>(
    register ? initialFormDataRegister : initialFormDataLogin
  );

  function onFormDataChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  }

  return (
    <Form {...props}>
      <StLogo />

      <Title>{title}</Title>

      <Inputs>
        {register && (
          <>
            <AuthFormInput
              icon="personOutlined"
              placeholder="І'мя"
              name="name"
              value={formData.name}
              onChange={onFormDataChange}
            />
            <AuthFormInput
              icon="personOutlined"
              placeholder="Прізвище"
              name="secondName"
              value={formData.secondName}
              onChange={onFormDataChange}
            />

            <AuthFormInput
              icon="email"
              placeholder="Електронна адреса"
              name="email"
              value={formData.email}
              onChange={onFormDataChange}
            />

            <AuthFormInput
              icon="lock_O"
              placeholder="Пароль"
              name="password"
              type="password"
              value={formData.password}
              onChange={onFormDataChange}
            />
            <AuthFormInput
              icon="lock_O"
              placeholder="Повторіть пароль"
              name="approvePassword"
              type="password"
              success={formData.approvePassword ? formData.approvePassword === formData.password : false}
              error={formData.approvePassword ? formData.approvePassword !== formData.password : false}
              value={formData.approvePassword}
              onChange={onFormDataChange}
            />
          </>
        )}

        {!register && (
          <>
            <AuthFormInput
              icon="email"
              placeholder="Електронна адреса"
              name="email"
              value={formData.email}
              onChange={onFormDataChange}
            />

            <AuthFormInput
              icon="lock_O"
              placeholder="Пароль"
              name="password"
              value={formData.password}
              onChange={onFormDataChange}
            />
          </>
        )}
      </Inputs>

      <Buttons>
        <StButtonIcon textTransform="uppercase" variant="filledSmall">
          {register ? 'Зареєструватись' : 'Увійти'}
        </StButtonIcon>

        <StLinkIcon textTransform="uppercase" variant="outlinedSmall" to={register ? '/auth/login' : '/auth/register'}>
          {!register ? 'Реєстрація' : 'Увійти'}
        </StLinkIcon>

        {/* <StLink to={register ? '/auth/login' : '/auth/register'}>{!register ? 'Зареєструватись' : 'Увійти'}</StLink> */}

        {!register && <StLink to={'/auth/sendRecoveryPasswordMail'}>{'Забули пароль?'}</StLink>}
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
const StLinkIcon = styled(LinkIcon)`
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

export default AuthForm;
