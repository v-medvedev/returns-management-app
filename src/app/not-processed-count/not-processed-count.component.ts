import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { AppComponent } from '../app.component';

export interface NotProcessedItemCount {
  dateOfReturn: Date;
  returnNumber: number;
}

@Component({
  selector: 'app-not-processed-count',
  templateUrl: './not-processed-count.component.html',
  styleUrls: ['./not-processed-count.component.css']
})
export class NotProcessedCountComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['dateOfReturn', 'returnNumber'];
  dataSource = new MatTableDataSource<NotProcessedItemCount>();

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
    const tableData: NotProcessedItemCount[] = [];
    let countObj = this.appComponent.dataSourceNotProcessed.data.reduce((acc, obj) => {
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
