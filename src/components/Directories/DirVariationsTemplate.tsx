import ModalForm from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { IDirInTreeProps } from '../Directories/dir.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';

export interface DirVariationsTemplateProps extends IDirInTreeProps<ApiDirType.VARIATIONS> {}

const DirVariationsTemplate: React.FC<DirVariationsTemplateProps> = ({ defaultState, title, ...props }) => {
  return (
    <ModalForm fillHeight title={title || 'Create variations template'} {...props}>
      <FlexBox flex={1} fillWidth fxDirection={'row'}>
        <FlexBox fillHeight flex={'1'}>
          <FlexBox fillWidth flex={'1'}>
            {'title'}
          </FlexBox>

          <FlexBox fillWidth flex={'1'}></FlexBox>
        </FlexBox>

        <FlexBox fillHeight flex={'1'}>
          <FlexBox fillWidth flex={'1'}>
            {'title'}
          </FlexBox>

          <FlexBox fillWidth flex={'1'}></FlexBox>
        </FlexBox>
      </FlexBox>
    </ModalForm>
  );
};
export default DirVariationsTemplate;
