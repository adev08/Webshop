import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
})
export class ProductsHeaderComponent implements OnInit {

  @Output() columnsCountChange = new EventEmitter<number>();

  sort = 'desc';
  itemsShowCount = 10;

  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    console.log('SortBy', this.sort)
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    console.log('Count', this.itemsShowCount)
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
    console.log('Num of columns', colsNum)
  }
}
