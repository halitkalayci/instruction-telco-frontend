import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
      name: '',
      description: '',
    });
  }

  getCategories() {
    // Object tipi henüz belli olmayan referans tip diyebiliriz. Referans tiplerin en temel sınıfı diyebiliriz.
    this.categoriesService.getCategories().subscribe((response) => {
      // Observer Design Pattern
      this.categories = response;
    });
  }

  changecategoryIdToDelete(event: any) {
    this.categoryIdToDelete = event.target.value;
  }

  add() {
    console.log(this.categoryAddForm.value);

    // let category: Category = {
    //   id: categoryIdToAdd,
    //   name: categoryNameToAdd,
    //   description: categoryDescriptionToAdd,
    // };
    // this.categoriesService.add(category);
  }

  delete() {
    this.categoriesService.delete(this.categoryIdToDelete).subscribe(() => {
      this.categoryIdToDelete = 0;
      this.getCategories();
    });
  }
}
