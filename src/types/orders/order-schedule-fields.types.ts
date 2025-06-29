import { HasExecuteDate, HasExpireDate } from '../utils.types';

export interface OrderScheduleFields extends HasExecuteDate, HasExpireDate {
  due?: string;
}
export type HasOrderSchedule = {
  schedule?: OrderScheduleFields;
};
