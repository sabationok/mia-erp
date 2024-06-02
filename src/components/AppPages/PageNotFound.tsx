import ButtonIcon from 'components/atoms/ButtonIcon';
import styled from 'styled-components';
import MyTreeSelect from '../atoms/Inputs/MyTreeSelect';
import * as React from 'react';
import CustomSelect from '../atoms/Inputs/CustomSelect/CustomSelect';
import FlexBox from '../atoms/FlexBox';
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
    status: 404,
    title: 'Помилка сервера!',
    error: 'Інформацію не знайдено.',
    path: '#',
  },
};
const PageNotFound: React.FC<IErrorPageProps> = ({ errName = 'notFoundPage' }) => {
  return (
    <Page className={'PageNotFound'}>
      {/*<form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">*/}
      {/*  <input*/}
      {/*    type="hidden"*/}
      {/*    name="data"*/}
      {/*    value="eyJwdWJsaWNfa2V5IjoiaTAwMDAwMDAwIiwidmVyc2lvbiI6IjMiLCJhY3Rpb24iOiJwYXkiLCJhbW91bnQiOiIzIiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6InRlc3QiLCJvcmRlcl9pZCI6IjAwMDAwMSJ9"*/}
      {/*  />*/}
      {/*  <input type="hidden" name="signature" value="wR+UZDC4jjeL/qUOvIsofIWpZh8=" />*/}
      {/*  <input type="image" src="//static.liqpay.ua/buttons/p1ru.radius.png" />*/}
      {/*</form>*/}

      <ErrorNotification>
        <ErrorCode>{errors[errName]?.status}</ErrorCode>

        <Title>{errors[errName]?.title}</Title>

        <Text>{errors[errName]?.error}</Text>

        <ButtonIcon variant="outlinedSmall">outlinedSmall</ButtonIcon>
        <ButtonIcon variant="outlinedLarge">outlinedLarge</ButtonIcon>
        <ButtonIcon variant="filledSmall">filledSmall</ButtonIcon>
        <ButtonIcon variant="filledLarge">filledLarge</ButtonIcon>

        <MyTreeSelect treeData={[]} />
        <MyTreeSelect treeData={[]} />
        <FlexBox fillWidth gap={8}>
          <CustomSelect label={'Рахунок'} placeholder={'Оберіть рахунок'} />

          <CustomSelect label={'Суб-рахунок'} placeholder={'Оберіть суб-рахунок'} />

          <CustomSelect label={'Категорія'} placeholder={'Оберіть категорію'} />
        </FlexBox>

        <ButtonIcon variant="onlyIcon" iconId="search"></ButtonIcon>
        <ButtonIcon variant="onlyIconFilled" iconId="filterOn"></ButtonIcon>
        <ButtonIcon variant="textSmall">textSmall</ButtonIcon>
        <ButtonIcon variant="textLarge">textLarge</ButtonIcon>
        <ButtonIcon variant="underlinedText">underlinedText</ButtonIcon>

        <ButtonIcon variant="defOutlinedSmall">defOutlinedSmall</ButtonIcon>
        <ButtonIcon variant="defOutlinedLarge">defOutlinedLarge</ButtonIcon>
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
