import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import ExtraFooterWithButton from '../../atoms/ExtraFooterWithButton';
import { t } from '../../../lang';
import { useModalService } from '../../ModalProvider/ModalProvider';
import FormCreateOutputIntegration from '../../Forms/integrations/FormCreateOutputIntegration';
import { useEffect, useMemo, useState } from 'react';
import { OutputIntegrationBase } from '../../../redux/integrations/integrations.types';
import AccordionList, { IAccordionOptionProps } from '../../SideBarContent/AccordionList';
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
    return integrationsList.map((opt: OutputIntegrationBase): IAccordionOptionProps => {
      return {
        title: opt.label,
        ChildrenComponent: () => (
          <FlexBox fillWidth padding={'8px 2px'} gap={8}>
            <Text $size={12} $weight={600}>
              {t('Public key')}
            </Text>
            <Text>{opt.apiKey}</Text>
            <Text $size={12} $weight={600}>
              {t('Redirect base url')}
            </Text>
            <Text>{opt?.redirectBaseUrl}</Text>
            {opt.expiredAt && (
              <>
                <Text $size={12} $weight={600}>
                  {t('Expire at ')}
                </Text>
                <Text>{formatDate(isNumber(opt.expiredAt) ? opt.expiredAt : new Date(opt.expiredAt))}</Text>
              </>
            )}
            {opt.description && (
              <>
                <Text $size={12} $weight={600}>
                  {t('Description')}
                </Text>

                <Text>{opt.description}</Text>
              </>
            )}
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
    <Container flex={1} fillWidth overflow={'hidden'}>
      <AccordionList options={preparedList} />

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
