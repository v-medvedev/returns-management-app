import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { AppComponent } from '../app.component';
import { ProductService, NoInfoItem } from '../product.service';

@Component({
  selector: 'app-noinfo',
  templateUrl: './noinfo.component.html',
  styleUrls: ['./noinfo.component.css']
})
export class NoinfoComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['dateOfReturn', 'returnNumber', 'stockNumber', 'details'];
  dataSource = new MatTableDataSource<NoInfoItem>();
  isEditProduct = false;
  editedProduct: NoInfoItem = null;

  noInfoItem?: NoInfoItem = {
    dateOfReturn: new Date(),
    returnNumber: 1,
    stockNumber: '',
    details: '',
    isSelected: false
  };

  constructor(private productService: ProductService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.dataSource = this.appComponent.dataSourceNoInfo;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.appComponent.dataSourceNoInfo = this.dataSource;
  }

  selectRow(data: NoInfoItem, index: number) {
    this.noInfoItem = Object.assign({}, data);
    let selectionState: boolean;
    // update selection
    this.dataSource.data.forEach((element, i) => {
      if (element.id !== data.id) {
        element.isSelected = false;
      } else {
        element.isSelected = !element.isSelected;
        selectionState = element.isSelected;
      }
    });
    // adjust buttons
    if (!selectionState) {
      this.noInfoItem = this.resetItem();
    } else {
      this.isEditProduct = true;
      this.editedProduct = data;
    }
  }

  addProduct() {
    this.productService.addNoInfoItem(Object.assign({}, this.noInfoItem)).subscribe(data => {
      data.isSelected = false;
      const tableData = this.dataSource.data;
      tableData.push(data);
      this.dataSource.data = tableData;
    });
    this.noInfoItem = this.resetItem();
  }

  editProduct() {
    this.editedProduct = Object.assign({}, this.noInfoItem);
    this.productService.editNoInfoItem(Object.assign({}, this.noInfoItem), this.editedProduct.id).subscribe(data => {
      const tableData = this.dataSource.data.map(item => {
        item.isSelected = false;
        if (item.id === this.editedProduct.id) {
          item = data;
        }
        return item;
      });
      this.dataSource.data = tableData;
    });
    this.noInfoItem = this.resetItem();
  }

  deleteProduct() {
    const tableData = this.dataSource.data;
    this.productService.deleteNoInfoItem(this.editedProduct.id).subscribe(data => {
      let tableData = this.dataSource.data.filter(item => {
        item.isSelected = false;
        return item.id !== this.editedProduct.id;
      });
      this.dataSource.data = tableData;
    });
    this.noInfoItem = this.resetItem();
  }

  resetItem(): NoInfoItem {
    this.isEditProduct = false;
    return {
      dateOfReturn: new Date(),
      returnNumber: 1,
      stockNumber: '',
      details: '',
      isSelected: false
    }
  }

}
