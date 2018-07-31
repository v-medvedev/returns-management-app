import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { AppComponent } from '../app.component';
import { ProductService, ReturnItem } from '../product.service';

export interface IReasonCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnsComponent implements OnInit, OnDestroy {
  
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = ['dateOfReturn', 'magentoOrderNo', 'returnNumber', 'stockNumber', 'reasonCode', 'packingNumber'];
  dataSource? = new MatTableDataSource<ReturnItem>();
  isEditProduct: boolean = false;
  editProductIdx: number = -1;
  editedProduct: ReturnItem = null;
  
  reasonCodes: IReasonCode[] = [
    { value: '1', viewValue: 'Dont like the item' },
    { value: '2', viewValue: 'Looks different to image onsite' },
    { value: '3', viewValue: 'Ordered more than one size' },
    { value: '4', viewValue: 'Too big' },
    { value: '5', viewValue: 'Too small' },
    { value: '6', viewValue: 'Faulty' },
    { value: '7', viewValue: 'Incorrect item received' },
    { value: '8', viewValue: 'Quality not as expected' },
    { value: '9', viewValue: 'Late delivery' },
    { value: '0', viewValue: 'No reason' }
  ];

  returnItem?: ReturnItem = {
    dateOfReturn: new Date(),
    magentoOrderNo: '',
    returnNumber: 1,
    stockNumber: '',
    reasonCode: [],
    packingNumber: '',
    isSelected: false
  };

  constructor(private productService: ProductService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.dataSource = this.appComponent.dataSourceReturns;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.appComponent.dataSourceReturns = this.dataSource;
  }

  selectRow(data: ReturnItem, index: number) {
    this.returnItem = Object.assign({}, data);
    let selectionState: boolean;
    // update selection
    this.dataSource.data.forEach((element, i) => {
      if (element.id != this.returnItem.id) {
        element.isSelected = false;
        selectionState = false;
      } else {
        element.isSelected = !element.isSelected;
        selectionState = element.isSelected;
      }      
    });
    // adjust buttons
    if (!selectionState) {
      this.returnItem = this.resetItem();
    } else {
      this.isEditProduct = true;
      this.editedProduct = data;
      this.editProductIdx = index+1;
    }
  }

  addProduct() {
    this.productService.addReturnItem(Object.assign({}, this.returnItem)).subscribe(data => {
      data.isSelected = false;
      data.reasonCode = JSON.parse(data.reasonCode.toString());
      const tableData = this.dataSource.data;
      tableData.push(data);
      this.dataSource.data = tableData;
    });
    this.returnItem = this.resetItem();
  }

  editProduct() {
    this.editedProduct = Object.assign({}, this.returnItem);
    this.productService.editReturnItem(Object.assign({}, this.returnItem), this.editedProduct.id).subscribe(data => {
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
    this.returnItem = this.resetItem();
  }

  deleteProduct() {
    const tableData = this.dataSource.data;
    this.productService.deleteReturnItem(this.editedProduct.id).subscribe(data => {
      const tableData = this.dataSource.data.filter(item => {
        item.isSelected = false;
        return item.id != this.editedProduct.id;
      });
      this.dataSource.data = tableData;
    });
    this.returnItem = this.resetItem();
  }

  resetItem(): ReturnItem {
    this.isEditProduct = false;
    this.editProductIdx = -1;
    return {
      dateOfReturn: new Date(),
      magentoOrderNo: '',
      returnNumber: 1,
      stockNumber: '',
      reasonCode: [],
      packingNumber: '',
      isSelected: false
    }
  }

}
