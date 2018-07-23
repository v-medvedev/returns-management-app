import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-returns-summary',
  templateUrl: './returns-summary.component.html',
  styleUrls: ['./returns-summary.component.css']
})
export class ReturnsSummaryComponent implements OnInit {

  columns?;
  displayedColumns?;
  dataSource = new MatTableDataSource();
    
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getReturnProducts().subscribe(data => {
      // Filter Reason Codes
      this.columns = [];
      this.displayedColumns = [];
      const codesObj = data.reduce((acc, obj) => {
        obj.reasonCode = JSON.parse(obj.reasonCode.toString());
        acc[obj.reasonCode.join(',')] = 1;
        return acc;
      }, {});
      for (let rCode in codesObj) {
        this.columns.push({ columnDef: 'rCode_' + rCode, header: rCode, cell: (element: any) => `${element[rCode]}` });        
      }
      this.columns = this.columns.sort((a, b) => {
        if (a.header < b.header) {
          return -1;
        } else {
          return 1;
        }
      });
      this.columns.unshift({ columnDef: 'reportDate', header: 'Report Date', cell: (element: any) => `${element.reportDate}` });
      this.displayedColumns = this.columns.map(c => c.columnDef);
      // Filter Dates
      const monthObj = data.reduce((acc, obj) => {
        let reportDate = this.productService.getReportDate(new Date(obj.dateOfReturn));
        acc[reportDate] = 1;
        return acc;
      }, {});
      for (let sMonth in monthObj) {
        let monthData = data.reduce((acc, obj) => {
          let reportDate = this.productService.getReportDate(new Date(obj.dateOfReturn));
          let rCode = obj.reasonCode.join(',');
          if (reportDate == sMonth) {
            acc[rCode] = (acc[rCode] || 0) + obj.returnNumber;
          }
          return acc;
        }, { reportDate: sMonth });        
        for (let rCode in codesObj) {
          if (!monthData[rCode]) {
            monthData[rCode] = 0;
          }
        }
        this.dataSource.data.push(monthData);
      }
    });
  }

  getTotalReturns(reasonCode: string): number {
    return this.dataSource.data.reduce((acc, obj) => {
      return acc + obj[reasonCode];
    }, 0);
  }

}