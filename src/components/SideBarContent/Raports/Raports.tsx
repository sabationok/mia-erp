import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import styled from 'styled-components';
import { useState } from 'react';

export interface IRapport {
  title: string;
  iconId: string;
  ModalChildren: React.FC;
  modalChildrenProps: any;
  disabled: boolean;
}
export interface IRaportSection {
  title: string;
  options: IRapport[];
}
export interface IDirectoriesProps {
  options: IRaportSection[];
}

const Raports: React.FC<IDirectoriesProps> = ({ options }) => {
  const modal = useModalProvider();
  const [current, setCurrent] = useState<number | null>(0);

  function onCurrentClick(idx: number) {
    setCurrent(prev => (prev === idx ? null : idx));
  }

  return (
    <Container>
      {options.map((item, idx) => (
        <ListItem key={item.title}>
          <ButtonIcon variant="def" endIconId="SmallArrowDown" onClick={() => onCurrentClick(idx)}>
            {item.title}
          </ButtonIcon>

          <OptionsList isOpen={current === idx}>
            {[...item.options].map(({ title, iconId, ModalChildren, modalChildrenProps, disabled }, idx) => (
              <ListItem key={title}>
                <StButtonIcon
                  variant="def"
                  iconId={iconId}
                  onClick={() => {
                    modal.handleOpenModal({ ModalChildren, modalChildrenProps });
                  }}
                >
                  {title}
                </StButtonIcon>
              </ListItem>
            ))}
          </OptionsList>
        </ListItem>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;

  width: 100%;
  max-width: 100%;
  /* padding: 8px; */

  /* background-color: ${({ theme }) => theme.backgroundColorSecondary}; */
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const OptionsList = styled.div<{ isOpen: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 32px;

  overflow: hidden;

  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};

  transition: max-height ${({ theme }) => theme.globals.timingFnMain};
`;

const StButtonIcon = styled(ButtonIcon)`
  justify-content: start;

  width: 100%;
  height: 100%;

  padding: 4px 12px;
`;

export default Raports;
