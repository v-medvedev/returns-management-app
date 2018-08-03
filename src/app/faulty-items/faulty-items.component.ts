import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { AppComponent } from '../app.component';
import { ProductService, FaultyItem } from '../product.service';  

export interface IReasonCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-faulty-items',
  templateUrl: './faulty-items.component.html',
  styleUrls: ['./faulty-items.component.css']
})
export class FaultyItemsComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['dateOfReturn', 'magentoOrderNo', 'returnNumber', 'stockNumber', 'reasonCode', 'faultDescription'];
  dataSource = new MatTableDataSource<FaultyItem>();
  isEditProduct: boolean = false;
  editedProduct: FaultyItem = null;

  reasonCodes: IReasonCode[] = [
    { value: '1', viewValue: 'Marked/Stains' },
    { value: '2', viewValue: 'Scratched Sole' },
    { value: '3', viewValue: 'Broken Heel' },
    { value: '4', viewValue: 'Broken Zips' },
    { value: '5', viewValue: 'Broken Strap/Broken Buckles' },
    { value: '6', viewValue: 'Inner Sole Coming Away' },
    { value: '7', viewValue: 'Damaged Laces' },
    { value: '8', viewValue: 'Two Different Sizes' },
    { value: '9', viewValue: 'Pulled Threads' },
    { value: '10', viewValue: 'Two Of The Same Foot' },
    { value: '11', viewValue: 'Ripped' },
    { value: '12', viewValue: 'Worn' },
    { value: '13', viewValue: 'Smells' },
    { value: '0', viewValue: 'No reason' }
  ];

  faultyItem?: FaultyItem = {
    dateOfReturn: new Date(),
    magentoOrderNo: '',
    returnNumber: 1,
    stockNumber: '',
    reasonCode: [],
    faultDescription: '',
    isSelected: false
  };

  constructor(private productService: ProductService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.dataSource = this.appComponent.dataSourceFaulty;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.appComponent.dataSourceFaulty = this.dataSource;
  }

  selectRow(data: FaultyItem) {
    this.faultyItem = Object.assign({}, data);
    let selectionState: boolean;
    // update selection
    this.dataSource.data.forEach((element, i) => {
      if (element.id != data.id) {
        element.isSelected = false;
      } else {
        element.isSelected = !element.isSelected;
        selectionState = element.isSelected;
      }      
    });
    // adjust buttons
    if (!selectionState) {
      this.faultyItem = this.resetItem();
    } else {
      this.isEditProduct = true;
      this.editedProduct = data;
    }
  }

  addProduct() {
    this.productService.addFaultyItem(Object.assign({}, this.faultyItem)).subscribe(data => {
      data.isSelected = false;
      data.reasonCode = JSON.parse(data.reasonCode.toString());
      const tableData = this.dataSource.data;
      tableData.push(data);
      this.dataSource.data = tableData;
    });
    this.faultyItem = this.resetItem();
  }

  editProduct() {
    this.editedProduct = Object.assign({}, this.faultyItem);
    this.productService.editFaultyItem(Object.assign({}, this.faultyItem), this.editedProduct.id).subscribe(data => {
      const tableData = this.dataSource.data.map(item => {
        item.isSelected = false;
        if (item.id == this.editedProduct.id) {
          data.reasonCode = JSON.parse(data.reasonCode.toString());
          item = data;
        }
        return item;
      });
      this.dataSource.data = tableData;
    });
    this.faultyItem = this.resetItem();
  }

  deleteProduct() {
    const tableData = this.dataSource.data;
    this.productService.deleteFaultyItem(this.editedProduct.id).subscribe(data => {
      const tableData = this.dataSource.data.filter(item => {
        item.isSelected = false;
        return item.id != this.editedProduct.id;
      });
      this.dataSource.data = tableData;
    });
    this.faultyItem = this.resetItem();
  }

  resetItem(): FaultyItem {
    this.isEditProduct = false;
    return {
      dateOfReturn: new Date(),
      magentoOrderNo: '',
      returnNumber: 1,
      stockNumber: '',
      reasonCode: [],
      faultDescription: '',
      isSelected: false
    }
  }

}
