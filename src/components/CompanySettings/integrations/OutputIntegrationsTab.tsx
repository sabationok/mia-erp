import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import ExtraFooterWithButton from '../../atoms/ExtraFooterWithButton';
import { t } from '../../../lang';
import { useModalService } from '../../ModalProvider/ModalProvider';
import FormCreateOutputIntegration from '../../Forms/integrations/FormCreateOutputIntegration';
import { useEffect, useMemo, useState } from 'react';
import { OutputIntegrationBase } from '../../../redux/integrations/integrations.types';
import AccordeonList, { IAccordionOptionProps } from '../../SideBarContent/AccordeonList';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import { Text } from '../../atoms/Text';
import { formatDate } from '../../../utils/dateTime.utils';
import { isNumber } from 'lodash';

export interface OutputIntegrationsTabProps {}

const OutputIntegrationsTab: React.FC<OutputIntegrationsTabProps> = () => {
  const modalS = useModalService();
  const service = useAppServiceProvider()[AppModuleName.integrations];

  // const [extServices, setExtServices] = useState<any[]>([]);
  const [integrationsList, setIntegrationsList] = useState<OutputIntegrationBase[]>([]);

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
        ChildrenComponent: () => (
          <FlexBox fillWidth padding={'8px 2px'} gap={8}>
            <Text>{opt.apiKey}</Text>
            {opt.expiredAt && (
              <Text>{formatDate(isNumber(opt.expiredAt) ? opt.expiredAt : new Date(opt.expiredAt))}</Text>
            )}
            <Text>{opt.description}</Text>
          </FlexBox>
        ),
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