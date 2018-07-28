import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material';
import * as _moment from 'moment';
import * as jsPDF from 'jspdf';
import { ProductService, ReportData, ReturnItem, FaultyItem } from '../product.service';
import { AppComponent } from '../app.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface ReasonStats {
  code: string,
  returnAmount: number
}

export interface ReturnStats {
  stockNumber: string,
  returnAmount: number
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class ReportComponent implements OnInit {

  dataSourceReturns? = new MatTableDataSource<ReturnItem>();
  dataSourceFaulty? = new MatTableDataSource<FaultyItem>();
  dateFrom = new FormControl(_moment());
  dateTo = new FormControl(_moment());

  reasonCodes = {
    '1': 'Dont like the item',
    '2': 'Looks different to image onsite',
    '3': 'Ordered more than one size',
    '4': 'Too big',
    '5': 'Too small',
    '6': 'Faulty',
    '7': 'Incorrect item received',
    '8': 'Quality not as expected',
    '9': 'Late delivery',
    '0': 'No reason'
  };

  faultyCodes = {
    '1': 'Marked/Stains',
    '2': 'Scratched Sole',
    '3': 'Broken Heel',
    '4': 'Broken Zips',
    '5': 'Broken Strap/Broken Buckles',
    '6': 'Inner Sole Coming Away',
    '7': 'Damaged Laces',
    '8': 'Two Different Sizes',
    '9': 'Pulled Threads',
    '10': 'Two Of The Same Foot',
    '11': 'Ripped',
    '12': 'Worn',
    '13': 'Smells',
    '0': 'No reason'
  };
  
  constructor(private productService: ProductService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.dataSourceReturns = this.appComponent.dataSourceReturns;
    this.dataSourceFaulty = this.appComponent.dataSourceFaulty;
  }

  createReport() {
    let dFrom = _moment(this.dateFrom.value).format('YYYY-MM-DD');
    let dTo = _moment(this.dateTo.value).format('YYYY-MM-DD');
    
    let returnCount = 0;
    let reasonsReturnCount = 0;
    let returnReasons = {};
    let returnReasonsArr: ReasonStats[] = [];
    let returnItems = {};
    let returnItemArr: ReturnStats[] = [];

    let faultyCount = 0;
    let reasonsFaultyCount = 0;
    let faultyReasons = {};
    let faultyReasonsArr: ReasonStats[] = [];
    let faultyItems = {};
    let faultyItemArr: ReturnStats[] = [];
    
    // Returns

    let returnData: ReturnItem[] = this.dataSourceReturns.data.filter(d => {
      return (_moment(d.dateOfReturn).isSameOrAfter(dFrom) && _moment(d.dateOfReturn).isSameOrBefore(dTo));
    });
    
    returnData.map(d => {
      let styleCode = this.getProductStyle(d.stockNumber);
      returnCount = returnCount + d.returnNumber;
      d.reasonCode.forEach((rCode) => {
        reasonsReturnCount = reasonsReturnCount + 1;
        if (rCode in returnReasons) {
          returnReasons[rCode] += d.returnNumber;
        } else {
          returnReasons[rCode] = d.returnNumber;
        }
      });
      if (styleCode in returnItems) {
        returnItems[styleCode] += d.returnNumber;
      } else {
        returnItems[styleCode] = d.returnNumber;
      }
    });

    for (let rCode in returnReasons) {
      returnReasonsArr.push({
        code: rCode,
        returnAmount: parseInt(returnReasons[rCode], 10)
      });
    }
    returnReasonsArr.sort((a, b) => {
      if (a.returnAmount < b.returnAmount) {
        return 1;
      }
      if (a.returnAmount > b.returnAmount) {
        return -1;
      }
      return 0;
    });
    for (let stockNo in returnItems) {
      returnItemArr.push({
        stockNumber: stockNo,
        returnAmount: parseInt(returnItems[stockNo], 10)
      });
    }
    returnItemArr.sort((a, b) => {
      if (a.returnAmount < b.returnAmount) {
        return 1;
      }
      if (a.returnAmount > b.returnAmount) {
        return -1;
      }
      return 0;
    });

    // Faulty

    let faultyData: FaultyItem[] = this.dataSourceFaulty.data.filter(d => {
      return (_moment(d.dateOfReturn).isSameOrAfter(dFrom) && _moment(d.dateOfReturn).isSameOrBefore(dTo));
    });

    faultyData.map(d => {
      let styleCode = this.getProductStyle(d.stockNumber);
      faultyCount = faultyCount + d.returnNumber;
      d.reasonCode.forEach((rCode) => {
        reasonsFaultyCount = reasonsFaultyCount + 1;
        if (rCode in faultyReasons) {
          faultyReasons[rCode] += d.returnNumber;
        } else {
          faultyReasons[rCode] = d.returnNumber;
        }
      });
      if (styleCode in faultyItems) {
        faultyItems[styleCode] += d.returnNumber;
      } else {
        faultyItems[styleCode] = d.returnNumber;
      }
    });

    for (let rCode in faultyReasons) {
      faultyReasonsArr.push({
        code: rCode,
        returnAmount: parseInt(faultyReasons[rCode], 10)
      });
    }
    faultyReasonsArr.sort((a, b) => {
      if (a.returnAmount < b.returnAmount) {
        return 1;
      }
      if (a.returnAmount > b.returnAmount) {
        return -1;
      }
      return 0;
    });
    for (let stockNo in faultyItems) {
      faultyItemArr.push({
        stockNumber: stockNo,
        returnAmount: parseInt(faultyItems[stockNo], 10)
      });
    }
    faultyItemArr.sort((a, b) => {
      if (a.returnAmount < b.returnAmount) {
        return 1;
      }
      if (a.returnAmount > b.returnAmount) {
        return -1;
      }
      return 0;
    });
    
    var doc = new jsPDF();

    doc.addImage('../assets/logo.png', 'PNG', 150, 1, 50, 30);

    doc.setFontSize(22);
    doc.setFontType('bold');

    doc.text(20, 20, 'Monthly Report: ' + _moment().format('Do MMM YYYY'));
    doc.setLineWidth(0.2);
    doc.line(20, 23, 195, 23);

    doc.setFontSize(16);
    doc.setFontType('normal');
    doc.text(20, 33, 'Total number of returns in the month: ' + returnCount);

    doc.setFontType('bold');
    doc.text(20, 45, 'Top 3 reasons for return and the percentage');    
    doc.setFontType('normal');
    for (let index = 0; index < returnReasonsArr.length; index++) {
      let rCode = returnReasonsArr[index].code.toString();
      if (rCode in this.reasonCodes) {
        doc.text(20, 52 + index * 8, (index+1) + '. ' + this.reasonCodes[rCode] + ': ' + Number(returnReasonsArr[index].returnAmount / reasonsReturnCount * 100).toFixed(2) + '%');
      } else {
        doc.text(20, 52 + index * 8, (index+1) + '. Code' + rCode + ' : ' + Number(returnReasonsArr[index].returnAmount / reasonsReturnCount * 100).toFixed(2) + '%');
      }
      if (index == 2) {
        break;
      }
    }

    doc.setFontType('bold');
    doc.text(20, 80, 'Top 4 items returned');
    doc.setFontType('normal');
    let counterReturns = 0;
    for (let index = 0; index < returnItemArr.length; index++) {
      if (!returnItemArr[index].stockNumber.includes('ALL ITEMS RECEIVED')) {
        doc.text(20, 87 + counterReturns * 8, (counterReturns+1) + '. ' + returnItemArr[index].stockNumber + ': ' + Number(returnItemArr[index].returnAmount / returnCount * 100).toFixed(2) + '%');
        counterReturns = counterReturns + 1;
      }
      if (counterReturns == 4) {
        break;
      }
    }

    doc.setLineWidth(0.2);
    doc.line(20, 123, 195, 123);

    doc.text(20, 133, 'Faulty - Total number of returns in the month: ' + faultyCount);

    doc.setFontType('bold');
    doc.text(20, 145, 'Faulty - Top 3 reasons for return and the percentage');    
    doc.setFontType('normal');
    for (let index = 0; index < faultyReasonsArr.length; index++) {
      let rCode = faultyReasonsArr[index].code.toString();
      if (rCode in this.faultyCodes) {
        doc.text(20, 152 + index * 8, (index+1) + '. ' + this.faultyCodes[rCode] + ': ' + Number(faultyReasonsArr[index].returnAmount / reasonsFaultyCount * 100).toFixed(2) + '%');
      } else {
        doc.text(20, 152 + index * 8, (index+1) + '. Code' + rCode + ' : ' + Number(faultyReasonsArr[index].returnAmount / reasonsFaultyCount * 100).toFixed(2) + '%');
      }
      if (index == 2) {
        break;
      }
    }

    doc.setFontType('bold');
    doc.text(20, 180, 'Faulty - Top 4 items returned');
    doc.setFontType('normal');
    let counterFaults = 0;
    for (let index = 0; index < faultyItemArr.length; index++) {
      if (!faultyItemArr[index].stockNumber.includes('ALL ITEMS RECEIVED')) {
        doc.text(20, 187 + counterFaults * 8, (counterFaults+1) + '. ' + faultyItemArr[index].stockNumber + ': ' + Number(faultyItemArr[index].returnAmount / faultyCount * 100).toFixed(2) + '%');
        counterFaults = counterFaults + 1;
      }
      if (counterFaults == 4) {
        break;
      }
    }

    doc.save('Returns Report.pdf');
  }

  getProductStyle(stockNumber) {
    let styleCode = stockNumber.trim();
    let chunks = styleCode.split(' ');
    if (!isNaN(chunks[chunks.length-1])) {
      chunks.pop();
      styleCode = chunks.join(' ').trim();
    }
    return styleCode;
  }
  

}
