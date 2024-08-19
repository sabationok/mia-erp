import { PartialRecord } from '../../utils.types';

export class PolicyBoolValuesJsonData implements PartialRecord<PolicyJsonDataBooleanishKeys, boolean> {
  selectByClient?: boolean = false;
  autoCreate?: boolean = false;
  autoPublish?: boolean = false;
}

export type PolicyJsonDataBooleanishKeys = 'selectByClient' | 'autoCreate' | 'autoPublish';

export class PolicyJsonDataBase extends PolicyBoolValuesJsonData {
  methodId?: string;

  constructor(payload: PolicyJsonDataBase) {
    super();
    Object.assign(this, payload);
  }
}
