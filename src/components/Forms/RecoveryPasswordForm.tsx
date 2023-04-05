import React, { useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoSvg from 'components/Layout/Header/LogoSvg/LogoSvg';
import AuthFormInput from './AuthFormInput';

export interface RecoveryPasswordFormProps {
  helloTitle?: string;
  title: string;
  recovery?: boolean;
}
export interface IRecoveryPasswordFormData {
  email?: string;
  password?: string;
  approvePassword?: string;
}

const initialFormDataRecoveryPassword: IRecoveryPasswordFormData = { email: '', password: '', approvePassword: '' };

const RecoveryPasswordForm: React.FC<RecoveryPasswordFormProps & React.HTMLAttributes<HTMLFormElement>> = ({
  title,
  recovery,
  ...props
}) => {
  const [formData, setFormData] = useState<Partial<IRecoveryPasswordFormData>>(initialFormDataRecoveryPassword);

  function onFormDataChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  }

  return (
    <Form {...props}>
      <StLogo />

      <Title>{title}</Title>

      <Inputs>
        {recovery ? (
          <>
            <AuthFormInput
              icon="lock_O"
              placeholder="Новий пароль"
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
        ) : (
          <AuthFormInput
            icon="email"
            placeholder="Електронна адреса"
            name="email"
            value={formData.email}
            onChange={onFormDataChange}
          />
        )}
      </Inputs>

      <Buttons>
        <StButtonIcon variant="filledSmall">{recovery ? 'Прийняти' : 'Відновити'}</StButtonIcon>

        <StLink to={'/auth/login'}>{'Увійти'}</StLink>
      </Buttons>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 250px;
  width: 100%;
  height: max-content;
  /* min-height: max-content; */
  max-width: 480px;
  /* max-height: 98px; */

  /* overflow: auto; */

  padding: 20px 16px;

  border-radius: 2px;

  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  border: 1px solid ${({ theme }) => theme.trBorderClr};
  background-color: #1c1c1e;
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
`;
const StButtonIcon = styled(ButtonIcon)`
  min-width: 165px;
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

export default RecoveryPasswordForm;
