import { Component, OnInit } from '@angular/core';

import { CategoriesService } from './../../services/categories.service';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
})
export class ListviewComponent implements OnInit {
  categories: string[] = [];
  language: string = 'en';

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    // Object tipi henüz belli olmayan referans tip diyebiliriz. Referans tiplerin en temel sınıfı diyebiliriz.
    this.categoriesService.getCategories().subscribe((response) => {
      console.log(
        '🚀 ~ file: listview.component.ts ~ line 22 ~ ListviewComponent ~ this.categoriesService.getCategories ~ response',
        response[2]['categoryName']
      );
    });
  }
}
