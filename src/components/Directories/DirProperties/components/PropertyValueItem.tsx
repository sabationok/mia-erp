import styled, { useTheme } from 'styled-components';
import FlexBox from '../../../atoms/FlexBox';
import React from 'react';
import { DiPropertiesRenderItemProps } from '../DirProperties';
import { Text } from '../../../atoms/Text';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';

const PropertyValueItem: React.FC<DiPropertiesRenderItemProps> = ({ item, index, onUpdate, onDelete }) => {
  const theme = useTheme();

  return (
    <DirPropertyValueBox
      fxDirection={'row'}
      flex={'1 1 30%'}
      gap={6}
      alignItems={'stretch'}
      style={{ borderRadius: 4, backgroundColor: theme.accentColor.light }}
    >
      <FlexBox flex={1} fillHeight padding={'4px 8px'} fxDirection={'row'} alignItems={'center'}>
        <Text $size={12} $weight={600}>
          {item?.label}
        </Text>
      </FlexBox>

      <DirPropertyValueActions
        className={'actions'}
        fillHeight
        padding={'0 8px'}
        fxDirection={'row'}
        gap={4}
        alignItems={'center'}
      >
        <ButtonIcon
          variant={'onlyIconNoEffects'}
          icon={'edit'}
          size={'26px'}
          iconSize={'24px'}
          onClick={() => {
            onUpdate && onUpdate({ _id: item._id, data: item }, { isValue: true });
          }}
        ></ButtonIcon>

        <ButtonIcon variant={'onlyIconNoEffects'} icon={'archive'} size={'26px'} iconSize={'24px'} disabled />
      </DirPropertyValueActions>
    </DirPropertyValueBox>
  );
};

const DirPropertyValueBox = styled(FlexBox)`
  position: relative;

  overflow: hidden;
  height: 32px;

  &:hover {
    & .actions {
      transform: translateX(-100%);
    }
  }
`;
const DirPropertyValueActions = styled(FlexBox)`
  position: absolute;
  top: 0;
  left: 100%;
  z-index: 2;

  border-radius: 4px;
  background-color: ${p => p.theme.modalBackgroundColor};
  border: 2px solid ${p => p.theme.accentColor.light};

  transition: all ${p => p.theme.globals.timingFunctionMain};
`;
export default PropertyValueItem;
