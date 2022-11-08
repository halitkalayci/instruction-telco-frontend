import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/store/app.state';
import { CustomerInfoModel } from 'src/app/models/customerInfoModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { setCustomerInfoModel } from 'src/app/store/customer/customer.actions';

@Component({
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customerInfoModel$!: Observable<CustomerInfoModel | null>;
  customerInfo!: CustomerInfoModel;
  constructor(
    private store: Store<AppStoreState>,
    private formBuilder: FormBuilder
  ) {
    this.customerInfoModel$ = this.store.select((s) => s.customer.customerInfo);
  }

  ngOnInit(): void {
    this.customerInfoModel$.subscribe((response) => {
      if (response != null) this.customerInfo = response;
      this.createCustomerForm();
    });
  }

  createCustomerForm() {
    this.customerForm = this.formBuilder.group({
      name: [this.customerInfo?.name ?? '', Validators.required],
      surname: [this.customerInfo?.surname ?? '', Validators.required],
    });
  }

  saveState() {
    // STATE değişecek.. dispatch!!
    if (!this.customerForm.valid) return;

    // dispatch
    this.store.dispatch(
      setCustomerInfoModel({ customerInfoModel: this.customerForm.value })
    );
  }
}
