import { CustomerInfoModel } from 'src/app/models/customerInfoModel';

export interface CustomerState {
  customerInfo: CustomerInfoModel | null;
}

export const initialCustomerState: CustomerState = {
  customerInfo: null,
};
