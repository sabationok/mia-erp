import FlexBox from '../../../atoms/FlexBox';
import { OfferOverviewAddsTabProps } from './types';
import { Text } from '../../../atoms/Text';

interface OfferSalesTabProps extends OfferOverviewAddsTabProps {}
export const SalesTab = (props: OfferSalesTabProps) => {
  return (
    <FlexBox padding={'16px'}>
      <Text $size={16} $weight={600}>
        In work
      </Text>
    </FlexBox>
  );
};
