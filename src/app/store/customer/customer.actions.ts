import { createAction, props } from '@ngrx/store';
import { CustomerInfoModel } from 'src/app/models/customerInfoModel';

export const setCustomerInfoModel = createAction(
  '[Customer] Set Customer Info',
  props<{ customerInfoModel: CustomerInfoModel }>()
);
