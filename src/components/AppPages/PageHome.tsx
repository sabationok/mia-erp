import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
// import ProfileCard from 'components/molecules/ProfileCard/ProfileCard';
import TableList from 'components/TableList/TableList';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import { takeFullGridArea, takeFullPlace } from './pagesStyles';
import { permissionsSearchParams, permissionsTableColumns } from 'data';
import { useAuthSelector } from 'redux/selectors.store';
import ProfileCard from 'components/atoms/ProfileCard/ProfileCard';
import usePermissionsService from 'redux/permissions/usePermissionsService.hook';

const companyTypes = [
  { title: 'Мої', param: 'own' },
  { title: 'Працюю', param: 'invited' },
  { title: 'Запрошення', param: 'invites' },
  { title: 'Усі', param: 'all' },
];

const PageHome: React.FC = () => {
  const { user } = useAuthSelector();
  const { permissions } = usePermissionsService();
  const [searchParams, setSearchParams] = useSearchParams({ companyType: companyTypes[0].param });

  function onSearchParamClick(param: string) {
    setSearchParams({ companyType: param });
  }

  function isActive(param: string) {
    return searchParams.get('companyType') === param ? 'active' : '';
  }

  useEffect(() => {
    setSearchParams({ companyType: companyTypes[0].param });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Page>
      <Top>
        <ProfileInfo>
          <ProfileCard {...user} />
        </ProfileInfo>

        <FilterButtons>
          <ButtonsList>
            {companyTypes.map(item => (
              <StButtonIcon
                key={item.param}
                variant='def'
                onClick={() => onSearchParamClick(item.param)}
                className={isActive(item.param)}
              >
                {item.title}
              </StButtonIcon>
            ))}
          </ButtonsList>
        </FilterButtons>
      </Top>

      <Bottom>
        <TableList
          {...{
            tableData: permissions,
            tableTitles: permissionsTableColumns,
            tableSearchParams: permissionsSearchParams,
            isFilter: false,
            isSearch: true,
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
  flex-direction: column;
  align-items: flex-start;

  position: relative;

  overflow: hidden;

    //background-color: ${({ theme }) => theme.tableBackgroundColor};

  ${takeFullPlace}
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  ${takeFullPlace}

  background-color: ${({ theme }) => theme.tableBackgroundColor};
`;

const ProfileInfo = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;

  padding: 16px 12px;
  width: 100%;
  max-width: 250px;
`;
const FilterButtons = styled.div`
  max-width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
const ButtonsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 150px);
  grid-auto-rows: 32px;

  max-width: 600px;

  /* max-width: 300px; */

  /* max-width: 550px; */
  /* @media screen and (max-height: 480px) and (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 32px;
    max-width: 100%;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 44px;
    max-width: 550px;
  } */
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

export default PageHome;
