import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { AppComponent } from '../app.component';

export interface NoInfoItemCount {
  dateOfReturn: Date,
  returnNumber: number;
}

@Component({
  selector: 'app-noinfo-count',
  templateUrl: './noinfo-count.component.html',
  styleUrls: ['./noinfo-count.component.css']
})
export class NoinfoCountComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['dateOfReturn', 'returnNumber'];
  dataSource = new MatTableDataSource<NoInfoItemCount>();
  
  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
    const tableData: NoInfoItemCount[] = [];
    let countObj = this.appComponent.dataSourceNoInfo.data.reduce((acc, obj) => {
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
