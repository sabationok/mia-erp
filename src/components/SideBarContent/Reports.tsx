import styled from 'styled-components';
import AccordionList, { IAccordionOptionProps } from './AccordionList';

export interface IReportsProps {
  options: IAccordionOptionProps[];
}

const Reports: React.FC<IReportsProps> = props => {
  return (
    <Container>
      <AccordionList options={props.options}></AccordionList>
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

export default Reports;
