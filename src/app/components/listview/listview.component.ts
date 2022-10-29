import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CategoriesService } from './../../services/categories.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
})
export class ListviewComponent implements OnInit {
  // component içerisinde yer alan properties bizim için state oluyor.
  // ?: null olabilir demek.
  // !: null olmayacak, bu property'i kullanmadan önce atama işlemini gerçekleştiriceğiz söz vermiş oluyoruz.
  categories!: Category[];
  language: string = 'en';

  categoryAddForm!: FormGroup;

  categoryIdToDelete: number = 0; // state

  error: string = '';

  //Angular IoC (Inversion of Control) Container kullanır.
  //Dependency Injection (Bağımlılık Enjeksiyonu)
  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.createCategoryAddForm();
  }

  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  getCategories(): void {
    // Object tipi henüz belli olmayan referans tip diyebiliriz. Referans tiplerin en temel sınıfı diyebiliriz.
    this.categoriesService.getCategories().subscribe((response) => {
      // Observer Design Pattern
      this.categories = response;
    });
  }

  // changecategoryIdToDelete(event: any) {
  //   this.categoryIdToDelete = event.target.value;
  // }

  add(): void {
    if (this.categoryAddForm.invalid) {
      this.error = 'Form is invalid';
      return;
    }
    if (this.error) this.error = '';

    // const {name, description} = this.categoryAddForm.value;
    // // this.categoryAddForm.value
    // const category: Category = {
    //   id: 0,
    //   // name: name,
    //   name,
    //   description,
    // };

    // spread operator ... (ES6)
    const category: Category = {
      ...this.categoryAddForm.value,
    };
    this.categoriesService.add(category).subscribe({
      next: (response) => {
        console.info(`Category(${response.id}) has added.`);
      },
      error: (err) => {
        console.log(err);

        this.error = err.statusText;
      },
      complete: () => {
        if (this.error) this.error = '';
        this.categoryAddForm.reset();
        this.getCategories();
      },
    });
  }

  delete() {
    this.categoriesService.delete(this.categoryIdToDelete).subscribe(() => {
      this.categoryIdToDelete = 0;
      this.getCategories();
    });
  }
}
