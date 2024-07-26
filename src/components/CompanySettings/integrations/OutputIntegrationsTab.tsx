import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import ExtraFooterWithButton from '../../atoms/ExtraFooterWithButton';
import { t } from '../../../lang';
import { useModalService } from '../../../Providers/ModalProvider/ModalProvider';
import FormCreateOutputIntegration from '../../Forms/integrations/FormCreateOutputIntegration';
import { useEffect, useMemo, useState } from 'react';
import { Integration, OutputIntegrationEntity } from '../../../types/integrations.types';
import AccordionList, { IAccordionOptionProps } from '../../SideBarContent/AccordionList';
import { Text } from '../../atoms/Text';
import { toAppDateFormat } from '../../../utils';
import { isNumber } from 'lodash';
import ButtonIcon from '../../atoms/ButtonIcon';
import { WebService } from '../../../services';
import { useIntegrationsSelector } from '../../../redux/selectors.store';
import { useAppDispatch } from '../../../redux/store.store';
import {
  getAllIntegrationsByTypeThunk,
  getOutputIntegrationByIdThunk,
} from '../../../redux/integrations/integrations.thunk';
import { Tag } from 'antd';

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

  const preparedList = useMemo((): IAccordionOptionProps[] => {
    return integrationsList.map((opt: OutputIntegrationEntity): IAccordionOptionProps => {
      const get = () => state.dataMap[opt._id] || opt;

      return {
        title: opt.label ?? '',
        ChildrenComponent: () => <ApiKeyItem opt={get()} />,
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

const ApiKeyItem = ({ opt }: { opt: Integration.Output.Entity }) => {
  const dispatch = useAppDispatch();

  const onLoadHandler = async () => {
    dispatch(getOutputIntegrationByIdThunk({ params: { _id: opt._id } }));
  };
  return (
    <FlexBox fillWidth padding={'8px 2px'} gap={12}>
      <Text $size={12} $weight={600}>
        {t('Public key')}
      </Text>
      <ApiKeyBox apiKey={opt.publicKey} keyMask={opt.publicKeyMask} onLoadApiKey={onLoadHandler} />

      <Text $size={12} $weight={600}>
        {t('Private key')}
      </Text>
      <ApiKeyBox apiKey={opt.privateKey} keyMask={opt.privateKeyMask} onLoadApiKey={onLoadHandler} />

      <Text $size={12} $weight={600}>
        {t('Redirect base url')}
      </Text>
      <Text>{opt?.redirectBaseUrl}</Text>

      {opt.expireAt && (
        <>
          <Text $size={12} $weight={600}>
            {t('Expire at ')}
          </Text>
          <Text>{toAppDateFormat(isNumber(opt.expireAt) ? opt.expireAt : new Date(opt.expireAt))}</Text>
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

      {!!opt.corsPolicy?.origins?.length && (
        <>
          <Text $size={12} $weight={600}>
            {t('Description')}
          </Text>

          {opt.corsPolicy?.origins?.map(item => {
            return <Tag key={item}>{item}</Tag>;
          })}
        </>
      )}
    </FlexBox>
  );
};
const ApiKeyBox = ({
  apiKey,
  keyMask,
  onLoadApiKey,
  isLoading,
}: {
  apiKey?: string;
  keyMask?: string;
  onLoadApiKey?: () => Promise<void>;
  isLoading?: boolean;
}) => {
  const [isVis, setIsVis] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyButtonLeave = () => {
    setTimeout(() => {
      setIsCopied(false);
    }, 750);
  };

  const handleCopy = () => {
    if (apiKey) {
      WebService.copyText(apiKey).then(() => {
        setIsCopied(true);
      });
    }
  };

  return (
    <FlexBox fillWidth fxDirection={'row'} alignItems={'center'} gap={10}>
      <ButtonIcon
        variant={'onlyIcon'}
        icon={isVis ? 'visibilityOn' : 'visibilityOff'}
        iconSize={'100%'}
        size={'18px'}
        isLoading={isLoading}
        onClick={() => {
          if (!apiKey && onLoadApiKey) {
            onLoadApiKey().then(apiKey => {
              setIsVis(true);
            });
          } else {
            setIsVis(true);
          }
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setIsVis(false);
          }, 750);
        }}
      ></ButtonIcon>

      <ButtonIcon
        variant={'onlyIcon'}
        icon={isCopied ? 'done' : 'copy'}
        iconSize={'100%'}
        size={'18px'}
        disabled={!apiKey}
        onClick={handleCopy}
        onMouseLeave={handleCopyButtonLeave}
      ></ButtonIcon>

      <ButtonIcon
        variant={'defNoEffects'}
        sizeType={'middle'}
        style={{ height: 'fit-content' }}
        disabled={!apiKey}
        onClick={handleCopy}
        onMouseLeave={handleCopyButtonLeave}
      >
        <Text>{isVis && apiKey ? apiKey : keyMask}</Text>
      </ButtonIcon>
    </FlexBox>
  );
};
