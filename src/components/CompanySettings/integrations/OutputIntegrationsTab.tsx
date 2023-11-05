import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';

export interface OutputIntegrationsTabProps {}

const OutputIntegrationsTab: React.FC<OutputIntegrationsTabProps> = ({}) => {
  return <Container></Container>;
};
const Container = styled(FlexBox)`
  padding: 0 8px;

  max-width: 100%;
  width: 480px;

  height: 98vh;
  max-height: 100%;

  background-color: ${p => p.theme.modalBackgroundColor};
`;
export default OutputIntegrationsTab;
