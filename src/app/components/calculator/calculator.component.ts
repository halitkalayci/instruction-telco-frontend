import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  constructor() {}

  // component initialize edildiğine çalışır..
  ngOnInit(): void {
    // console.log('xxx');
  }
}
