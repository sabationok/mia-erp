import styled from 'styled-components';
import * as React from 'react';
import { takeFullGridArea } from './pagesStyles';

export type ErrorNameType = 'notFoundPage' | 'notFound';

export interface IErrorPageProps {
  errName?: ErrorNameType;
}

export interface IErrorPage {
  status?: number;
  title?: string;
  error?: string;
  path?: string;
}

export type IErrors = {
  [errName in ErrorNameType]?: IErrorPage;
};
export const errors: IErrors = {
  notFoundPage: {
    status: 404,
    title: 'Щось пішло не так!',
    error: 'Сторінку, яку ви шукаєте, було видалено або переміщено.',
    path: '#',
  },
  notFound: {
    status: 500,
    title: 'Помилка сервера!',
    error: 'Інформацію не знайдено.',
    path: '#',
  },
};
const PageNotFound: React.FC<IErrorPageProps> = ({ errName = 'notFoundPage' }) => {
  return (
    <Page className={'PageNotFound'}>
      <ErrorNotification>
        <ErrorCode>{errors[errName]?.status}</ErrorCode>

        <Title>{errors[errName]?.title}</Title>

        <Text>{errors[errName]?.error}</Text>
      </ErrorNotification>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  font-size: 18px;
  line-height: 1.2;
  letter-spacing: 0.07em;

  height: 100%;
  max-height: 100%;
  max-width: 100%;

  overflow: auto;

  ${takeFullGridArea};
`;

const ErrorNotification = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;

  max-width: 480px;
  width: 100%;
  padding: 16px;

  gap: 4px;

  border: 1px solid ${({ theme }) => theme.trBorderClr};
`;
const ErrorCode = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 80px;
  font-weight: 700;
  color: ${({ theme }) => theme.fontColor};
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 500;

  margin-bottom: 8px;
`;
const Text = styled.div`
  font-size: 16px;

  margin-bottom: 20px;
`;

export default PageNotFound;
