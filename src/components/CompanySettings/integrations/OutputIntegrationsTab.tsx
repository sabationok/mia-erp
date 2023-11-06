import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import ExtraFooterWithButton from '../../atoms/ExtraFooterWithButton';
import { t } from '../../../lang';
import { useModalService } from '../../ModalProvider/ModalProvider';
import FormCreateOutputIntegration from '../../Forms/integrations/FormCreateOutputIntegration';
import { useEffect, useMemo, useState } from 'react';
import { CreateOutputIntegrationFormData } from '../../../redux/integrations/integrations.types';
import AccordeonList, { IAccordionOptionProps } from '../../SideBarContent/AccordeonList';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';

export interface OutputIntegrationsTabProps {}

const OutputIntegrationsTab: React.FC<OutputIntegrationsTabProps> = ({}) => {
  const modalS = useModalService();
  const service = useAppServiceProvider()[AppModuleName.integrations];

  // const [extServices, setExtServices] = useState<any[]>([]);
  const [integrationsList, setIntegrationsList] = useState<CreateOutputIntegrationFormData[]>([]);

  const handleCreateOne = () => {
    modalS.open({
      ModalChildren: FormCreateOutputIntegration,
      modalChildrenProps: {
        onSuccess: ({ data }) => {
          setIntegrationsList(p => [...p, data]);
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

  useEffect(() => {
    service.getAll({
      data: { type: 'output' },
      onSuccess: data => {
        setIntegrationsList(data);
      },
    });
    // eslint-disable-next-line
  }, []);

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
