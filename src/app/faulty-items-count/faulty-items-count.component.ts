import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../product.service';

export interface FaultyItemCount {
  dateOfReturn: Date;
  numberOfReturns: number;  
}

@Component({
  selector: 'app-faulty-items-count',
  templateUrl: './faulty-items-count.component.html',
  styleUrls: ['./faulty-items-count.component.css']
})
export class FaultyItemsCountComponent implements OnInit {

  displayedColumns: string[] = ['dateOfReturn', 'numberOfReturns'];
  dataSource = new MatTableDataSource<FaultyItemCount>();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getFaultyItems().subscribe(data => {
      const countObj = data.reduce((acc, obj) => {
        acc[obj.dateOfReturn.toString()] = (acc[obj.dateOfReturn.toString()] || 0) + obj.returnNumber;
        return acc;
      }, {});
      console.log(countObj);
      let tableData: FaultyItemCount[] = [];
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
