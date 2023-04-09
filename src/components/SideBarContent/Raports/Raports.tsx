import styled from 'styled-components';
import AccordeonList, { IAccordeonOptionProps } from '../AccordeonList';

export interface IRaportsProps {
  options: IAccordeonOptionProps[];
}

const Raports: React.FC<IRaportsProps> = props => {

  return (
    <Container>
      <AccordeonList options={props.options}></AccordeonList>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;

  width: 100%;
  max-width: 100%;
`;

export default Raports;
