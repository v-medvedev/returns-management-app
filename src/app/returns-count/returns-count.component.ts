import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../product.service';

export interface ReturnItemCount {
  dateOfReturn: Date;
  numberOfReturns: number;  
}

@Component({
  selector: 'app-returns-count',
  templateUrl: './returns-count.component.html',
  styleUrls: ['./returns-count.component.css']
})
export class ReturnsCountComponent implements OnInit {

  displayedColumns: string[] = ['dateOfReturn', 'numberOfReturns'];
  dataSource = new MatTableDataSource<ReturnItemCount>();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getReturnProducts().subscribe(data => {
      const countObj = data.reduce((acc, obj) => {
        acc[obj.dateOfReturn.toString()] = (acc[obj.dateOfReturn.toString()] || 0) + obj.returnNumber;
        return acc;
      }, {});
      console.log(countObj);
      let tableData: ReturnItemCount[] = [];
      for (let sDate in countObj) {
        tableData.push({
          dateOfReturn: new Date(sDate), 
          numberOfReturns: parseInt(countObj[sDate])
        });
      }
      tableData.sort((a, b) => {
        if (a.dateOfReturn < b.dateOfReturn) {
          return -1;
        } else {
          return 1;
        }
      });
      this.dataSource.data = tableData;
    });
  }

}
