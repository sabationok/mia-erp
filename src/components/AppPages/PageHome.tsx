import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import ProfileCard from 'components/ProfileCard/ProfileCard';
import TableList from 'components/TableList/TableList';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import { takeFullGridArea, takeFullPlace } from './pagesStyles';

const companyTypes = [
  { title: 'Мої', param: 'own' },
  { title: 'Працюю', param: 'invited' },
  { title: 'Запрошення', param: 'invites' },
  { title: 'Усі', param: 'all' },
];
const companies = [
  { _id: '', name: 'Рога і копита' },
  { _id: '', name: 'Казінакі макі' },
];
const permissions = [
  { _id: '1', status: 'accepted', company: companies[0], user: '', role: { _id: '', name: 'manager' } },
  { _id: '2', status: 'pending', company: companies[1], user: '', role: { _id: '', name: 'counter' } },
];
console.log(permissions);

const PageHome: React.FC = () => {
  const [serchParams, setSearchParaps] = useSearchParams({ companyType: companyTypes[0].param });
  function onSearchParamClick(param: string) {
    setSearchParaps({ companyType: param });
  }
  function isActive(param: string) {
    return serchParams.get('companyType') === param ? 'active' : '';
  }

  useEffect(() => {
    setSearchParaps({ companyType: companyTypes[0].param });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page>
      <Top>
        <ProfileInfo>
          <ProfileCard />
        </ProfileInfo>

        <FilterButtons>
          {companyTypes.map(item => (
            <StButtonIcon
              key={item.param}
              variant="def"
              onClick={() => onSearchParamClick(item.param)}
              className={isActive(item.param)}
            >
              {item.title}
            </StButtonIcon>
          ))}
        </FilterButtons>
      </Top>

      <Bottom>
        {/* <Outlet /> */}

        <TableList
          {...{
            filter: false,
            search: true,
            checkboxes: false,
          }}
        />
      </Bottom>
    </Page>
  );
};

const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;

  ${takeFullGridArea}
`;
const Top = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  background-color: ${({ theme }) => theme.tableBackgroundColor};

  ${takeFullPlace}
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  ${takeFullPlace}
`;

const ProfileInfo = styled.div`
  padding: 16px 12px;
  width: 100%;
  max-width: 250px;
`;
const FilterButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 32px;

  width: 100%;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 44px;
    max-width: 768px;
  }
`;

const StButtonIcon = styled(ButtonIcon)`
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
    background-color: ${({ theme }) => theme.borderColor};
  }
  &::after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 1px;
    width: 100%;
    height: 5px;
    width: 0;
    transition: all ${({ theme }) => theme.globals.timingFnMui};
    transform: translate(-50%);
    background-color: ${({ theme }) => theme.accentColor.base};
  }

  &.active {
    &::after {
      width: 100%;
    }
  }
`;

export default PageHome;
