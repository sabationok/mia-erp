import { useMemo } from 'react';
import AccordionList, { IAccordionOptionProps } from '../../SideBarContent/AccordionList';
import { InputIntegrationBase } from '../../../types/integrations.types';
import IntegrationOverview from './IntegrationOverview';
import FlexBox from '../../atoms/FlexBox';

export interface InputIntegrationsListProps {
  list: InputIntegrationBase[];
  onSetAsDefault?: (info: InputIntegrationBase) => void;
  onDelete?: (info: InputIntegrationBase) => void;
  onEdit?: (info: InputIntegrationBase) => void;
  active?: InputIntegrationBase;
  checkIsActive?: (data: InputIntegrationBase) => boolean;
}

const InputIntegrationsList = ({
  list,
  onSetAsDefault,
  onDelete,
  checkIsActive,
  onEdit,
  active,
}: InputIntegrationsListProps) => {
  const preparedList = useMemo((): IAccordionOptionProps[] => {
    return list.map((opt: InputIntegrationBase): IAccordionOptionProps => {
      const isActive = checkIsActive && checkIsActive(opt);
      return {
        title: opt.label ?? '',
        isActive: isActive,
        ChildrenComponent: () => (
          <IntegrationOverview
            {...{
              info: opt,
              onSetAsDefaultPress: () => onSetAsDefault && onSetAsDefault(opt),
              onDeletePress: () => onDelete && onDelete(opt),
              onEditPress: !onEdit ? undefined : () => onEdit && onEdit(opt),
              isDefault: isActive,
            }}
          />
        ),
        // ChildrenComponent: () => (
        //   <FlexBox fillWidth padding={'8px 2px'} gap={8}>
        //     <Text $size={12} $weight={600}>
        //       {t('Public key')}
        //     </Text>
        //     <Text>{opt.apiKey}</Text>
        //     <Text $size={12} $weight={600}>
        //       {t('Redirect base url')}
        //     </Text>
        //     <Text>{opt?.redirectBaseUrl}</Text>
        //     {opt.expiredAt && (
        //       <>
        //         <Text $size={12} $weight={600}>
        //           {t('Expire at ')}
        //         </Text>
        //         <Text>{formatDate(isNumber(opt.expiredAt) ? opt.expiredAt : new Date(opt.expiredAt))}</Text>
        //       </>
        //     )}
        //     {opt.description && (
        //       <>
        //         <Text $size={12} $weight={600}>
        //           {t('Description')}
        //         </Text>
        //
        //         <Text>{opt.description}</Text>
        //       </>
        //     )}
        //   </FlexBox>
        // ),
      };
    });
  }, [checkIsActive, list, onDelete, onEdit, onSetAsDefault]);

  return (
    <FlexBox fillWidth overflow={'auto'}>
      <AccordionList options={preparedList} />
    </FlexBox>
  );
};
export default InputIntegrationsList;
