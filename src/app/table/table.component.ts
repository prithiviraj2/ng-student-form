import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  product: any = []
  list: any = []
  constructor() { }

  ngOnInit(): void {
    this.add()
  }
  add() {
    this.product = JSON.parse(localStorage.getItem("studentdata") || '{}');
    console.log(this.product);
  }
}
