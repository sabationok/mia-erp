import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { FilterSelectorProps, IFilterSelectorAddsProps } from '../Selector';
import SelectsTreeList from './SelectsTreeList';
import { SelectsTreeListItemProps } from './SelectsTreeListItem';
import { createApiCall, DirectoriesApi } from '../../../api';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { defaultApiCallPayload } from '../../../utils/fabrics';
import { GetAllByDirTypeOptions } from '../../../api/directories.api';

export interface SelectorContentProps {
  defaultValue?: string[];
  getDefaultValue?: (selectorName?: ApiDirType) => string[];
  onSelectorSubmit?: (name: ApiDirType, value: string[]) => void;
  isOpen?: boolean;
  selectorName?: ApiDirType;
}

const SelectorContent: React.FC<
  SelectorContentProps &
    Pick<FilterSelectorProps, 'selectorName' | 'data'> &
    Pick<IFilterSelectorAddsProps, 'ListComp'> &
    React.HTMLAttributes<HTMLDivElement>
> = ({
  isOpen = false,
  onSelect,
  data,
  selectorName,
  defaultValue,
  getDefaultValue,
  ListComp,
  onSelectorSubmit,
  ...props
}) => {
  const [renderData, setRenderData] = useState<SelectsTreeListItemProps[]>([]);
  const [selectorData, setSelectorData] = useState<string[]>(
    defaultValue ? defaultValue : getDefaultValue ? getDefaultValue(selectorName) : []
  );

  function onSelectorSubmitWrapper() {
    console.log('selectorData', selectorData);
    onSelectorSubmit && selectorName && onSelectorSubmit(selectorName, selectorData);
  }

  function onSelectItems(ids: string[], checked: boolean) {
    if (checked) setSelectorData(prev => [...prev, ...ids]);
    if (!checked) setSelectorData(prev => prev.filter(el => !ids.includes(el)));
  }

  useMemo(async () => {
    if (!selectorName) return;

    createApiCall(
      defaultApiCallPayload<GetAllByDirTypeOptions, SelectsTreeListItemProps[]>({
        data: {
          dirType: selectorName,
          params: {
            isArchived: false,
            createTreeData: true,
          },
        },
        onSuccess(data) {
          setRenderData(data);
        },
        onError(e) {
          console.error('callRes error', e);
        },
      }),
      async data => {
        return DirectoriesApi.getAllByDirType(data);
      }
    );
  }, [selectorName]);

  function onCheckSelectStatus(id: string) {
    return selectorData.includes(id);
  }

  return (
    <Content {...props} className={'Selector_Content'}>
      {renderData.length > 0 && (
        <SelectsTreeList
          isOpen={isOpen}
          entryList={renderData}
          onSelectItems={onSelectItems}
          onCheckSelectStatus={onCheckSelectStatus}
        />
      )}

      <AcceptButtons>
        <ButtonIcon
          variant="onlyIcon"
          size="32px"
          iconSize="90%"
          iconId={iconId.done}
          onClick={onSelectorSubmitWrapper}
        />

        <ButtonIcon
          variant="onlyIcon"
          size="32px"
          iconSize="90%"
          iconId={iconId.close}
          onClick={() => {
            setSelectorData([]);
            onSelectorSubmit && selectorName && onSelectorSubmit(selectorName, []);
          }}
        />
      </AcceptButtons>
    </Content>
  );
};
const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content;

  width: 100%;

  max-height: 250px;
  overflow: hidden;
  color: ${({ theme }) => theme.fontColorHeader};

  border-radius: 2px;
  background-color: ${({ theme }) => theme.fieldColor};

  @media screen and (min-width: 768px) {
    height: 100%;
  }
`;

const AcceptButtons = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;

  border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
`;

export default SelectorContent;
