import { createReducer, on } from '@ngrx/store';
import { setCustomerInfoModel } from './customer.actions';
import { CustomerState, initialCustomerState } from './customer.state';

export const customerReducer = createReducer<CustomerState>(
  initialCustomerState,
  on(setCustomerInfoModel, (currentState, action) => {
    console.log(action);

    return { ...currentState, customerInfo: action.customerInfoModel };
  })
);
