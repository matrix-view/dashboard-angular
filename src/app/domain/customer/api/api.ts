export * from './default.service';
import { DefaultService } from './default.service';
export * from './m2-m-customer-resource.service';
import { M2MCustomerResourceService } from './m2-m-customer-resource.service';
export const APIS = [DefaultService, M2MCustomerResourceService];
