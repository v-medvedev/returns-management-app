import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AppComponent } from '../app.component';
import { ProductService, NotProcessedItem } from '../product.service';

export interface IReasonCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-not-processed',
  templateUrl: './not-processed.component.html',
  styleUrls: ['./not-processed.component.css']
})
export class NotProcessedComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['dateOfReturn', 'magentoOrderNo', 'returnNumber', 'stockNumber', 'reasonCode', 'packingNumber'];
  dataSource = new MatTableDataSource<NotProcessedItem>();
  isEditProduct = false;
  editedProduct: NotProcessedItem = null;

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

  notProcessedItem?: NotProcessedItem = {
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
    this.dataSource = this.appComponent.dataSourceNotProcessed;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.appComponent.dataSourceNotProcessed = this.dataSource;
  }

  selectRow(data: NotProcessedItem) {
    this.notProcessedItem = Object.assign({}, data);
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
      this.notProcessedItem = this.resetItem();
    } else {
      this.isEditProduct = true;
      this.editedProduct = data;
    }
  }

  addProduct() {
    this.productService.addNotProcessedItem(Object.assign({}, this.notProcessedItem)).subscribe(data => {
      data.isSelected = false;
      data.reasonCode = JSON.parse(data.reasonCode.toString());
      const tableData = this.dataSource.data;
      tableData.push(data);
      this.dataSource.data = tableData;
    });
    this.notProcessedItem = this.resetItem();
  }

  editProduct() {
    this.editedProduct = Object.assign({}, this.notProcessedItem);
    this.productService.editNotProcessedItem(Object.assign({}, this.notProcessedItem), this.editedProduct.id).subscribe(data => {
      const tableData = this.dataSource.data.map(item => {
        item.isSelected = false;
        if (item.id === this.editedProduct.id) {
          data.reasonCode = JSON.parse(data.reasonCode.toString());
          item = data;
        }
        return item;
      });
      this.dataSource.data = tableData;
    });
    this.notProcessedItem = this.resetItem();
  }

  deleteProduct() {
    const tableData = this.dataSource.data;
    this.productService.deleteNotProcessedItem(this.editedProduct.id).subscribe(data => {
      const tableData = this.dataSource.data.filter(item => {
        item.isSelected = false;
        return item.id !== this.editedProduct.id;
      });
      this.dataSource.data = tableData;
    });
    this.notProcessedItem = this.resetItem();
  }

  resetItem(): NotProcessedItem {
    this.isEditProduct = false;
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
