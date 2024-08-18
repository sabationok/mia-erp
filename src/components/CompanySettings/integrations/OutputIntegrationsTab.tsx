import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import ExtraFooterWithButton from '../../atoms/ExtraFooterWithButton';
import { t } from '../../../lang';
import { useModalService } from '../../../Providers/ModalProvider/ModalProvider';
import FormCreateOutputIntegration from '../../Forms/integrations/FormCreateOutputIntegration';
import { useEffect, useMemo } from 'react';
import { Integration, OutputIntegrationEntity } from '../../../types/integrations.types';
import AccordionList, { IAccordionListProps, IAccordionOptionProps } from '../../SideBarContent/AccordionList';
import { useIntegrationsSelector } from '../../../redux/selectors.store';
import { useAppDispatch } from '../../../redux/store.store';
import { getAllIntegrationsByTypeThunk } from '../../../redux/integrations/integrations.thunk';
import { OutputConnectionItem } from './components/OutputConnectionItem';

export interface OutputIntegrationsTabProps {}

const OutputIntegrationsTab: React.FC<OutputIntegrationsTabProps> = () => {
  const modalS = useModalService();
  // const service = useAppServiceProvider()[AppModuleName.integrations];

  const state = useIntegrationsSelector().output;
  const integrationsList = state.list;
  const dispatch = useAppDispatch();
  const handleCreateOne = () => {
    modalS.create(FormCreateOutputIntegration);
  };

  const preparedList = useMemo((): IAccordionListProps['options'] => {
    return integrationsList.map((opt: OutputIntegrationEntity): IAccordionOptionProps => {
      return {
        title: opt.label ?? '',
        ChildrenComponent: () => <OutputConnectionItem conn={state.dataMap[opt._id] || opt} />,
      };
    });
  }, [integrationsList, state.dataMap]);

  useEffect(() => {
    dispatch(
      getAllIntegrationsByTypeThunk({
        params: { type: Integration.DirectionType.output },
      })
    );

    // eslint-disable-next-line
  }, []);

  return (
    <Container flex={1} fillWidth>
      <FlexBox fillWidth flex={1} overflow={'hidden'} style={{ position: 'relative' }}>
        <AccordionList options={preparedList} />
      </FlexBox>

      <ExtraFooterWithButton buttonText={t('Add one')} onClick={handleCreateOne} />
    </Container>
  );
};
const Container = styled(FlexBox)`
  position: relative;

  max-width: 100%;
  width: 480px;

  height: 98vh;
  max-height: 100%;

  background-color: ${p => p.theme.modalBackgroundColor};
`;
export default OutputIntegrationsTab;
