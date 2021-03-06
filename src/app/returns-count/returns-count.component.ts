import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { AppComponent } from '../app.component';

export interface ReturnItemCount {
  dateOfReturn: Date,
  returnNumber: number;
}

@Component({
  selector: 'app-returns-count',
  templateUrl: './returns-count.component.html',
  styleUrls: ['./returns-count.component.css']
})
export class ReturnsCountComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['dateOfReturn', 'returnNumber'];
  dataSource = new MatTableDataSource<ReturnItemCount>();
  
  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
    const tableData: ReturnItemCount[] = [];
    let countObj = this.appComponent.dataSourceReturns.data.reduce((acc, obj) => {
      acc[obj.dateOfReturn.toString()] = (acc[obj.dateOfReturn.toString()] || 0) + obj.returnNumber;
      return acc;
    }, {});
    for (let sDate in countObj) {
      tableData.push({
        dateOfReturn: new Date(sDate),
        returnNumber: parseInt(countObj[sDate])
      });
    }
    this.dataSource.data = tableData;
    this.dataSource.sort = this.sort;
  }

}
