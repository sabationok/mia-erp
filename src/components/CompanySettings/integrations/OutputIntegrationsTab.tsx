import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import ExtraFooterWithButton from '../../atoms/ExtraFooterWithButton';
import { t } from '../../../lang';
import { useModalService } from '../../ModalProvider/ModalProvider';
import FormCreateOutputIntegration from '../../Forms/FormCreateOutputIntegration';
import { useMemo, useState } from 'react';
import { CreateOutputIntegrationFormData } from '../../../redux/integrations/integrations.types';
import AccordeonList, { IAccordionOptionProps } from '../../SideBarContent/AccordeonList';

export interface OutputIntegrationsTabProps {}

const OutputIntegrationsTab: React.FC<OutputIntegrationsTabProps> = ({}) => {
  const modalS = useModalService();
  const [extServices, setExtServices] = useState<any[]>([]);
  const [integrationsList, setIntegrationsList] = useState<CreateOutputIntegrationFormData[]>([
    { label: 'Test 1' },
    { label: 'Test 2' },
  ]);

  const handleCreateOne = () => {
    const m = modalS.open({
      ModalChildren: FormCreateOutputIntegration,
      modalChildrenProps: {
        onSubmit: d => {
          m?.onClose && m?.onClose();
        },
      },
    });
  };

  const preparedList = useMemo((): IAccordionOptionProps[] => {
    return integrationsList.map((opt): IAccordionOptionProps => {
      return {
        title: opt.label,
      };
    });
  }, [integrationsList]);

  return (
    <Container flex={1} fillWidth>
      <FlexBox flex={1} fillWidth>
        <AccordeonList options={preparedList} />
      </FlexBox>

      <ExtraFooterWithButton buttonText={t('Add one')} onClick={handleCreateOne} />
    </Container>
  );
};
const Container = styled(FlexBox)`
  position: relative;

  padding: 0 8px;

  max-width: 100%;
  width: 480px;

  height: 98vh;
  max-height: 100%;

  background-color: ${p => p.theme.modalBackgroundColor};
`;
export default OutputIntegrationsTab;
