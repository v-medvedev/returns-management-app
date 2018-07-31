import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { AppComponent } from '../app.component';

export interface FaultyItemCount {
  dateOfReturn: Date,
  returnNumber: number;
}

@Component({
  selector: 'app-faulty-items-count',
  templateUrl: './faulty-items-count.component.html',
  styleUrls: ['./faulty-items-count.component.css']
})
export class FaultyItemsCountComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['dateOfReturn', 'returnNumber'];
  dataSource = new MatTableDataSource<FaultyItemCount>();
  
  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
    const tableData: FaultyItemCount[] = [];
    let countObj = this.appComponent.dataSourceFaulty.data.reduce((acc, obj) => {
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
