import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  // component içerisinde yer alan properties bizim için state oluyor.
  // ?: null olabilir demek.
  // !: null olmayacak, bu property'i kullanmadan önce atama işlemini gerçekleştiriceğiz söz vermiş oluyoruz.
  language: string = 'en';

  categoryAddForm!: FormGroup;

  categoryIdToDelete: number = 0; // state

  error: string = '';
  services!: Service[];
  searchText: string = '';
  //Angular IoC (Inversion of Control) Container kullanır.
  //Dependency Injection (Bağımlılık Enjeksiyonu)
  constructor(
    private formBuilder: FormBuilder,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.getServices();
  }

  createCategoryAddForm() {}

  getServices(): void {
    this.servicesService.getAllServices().subscribe((response) => {
      this.services = response;
    });
  }

  add(): void {}

  delete() {}
}
