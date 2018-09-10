import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

export interface ReturnItem {
  id?: number;
  dateOfReturn: Date;
  magentoOrderNo: string;
  returnNumber: number;
  stockNumber: string;
  reasonCode: string[];
  packingNumber: string;
  isSelected?: boolean;
}

export interface FaultyItem {
  id?: number;
  dateOfReturn: Date;
  magentoOrderNo: string;
  returnNumber: number;
  stockNumber: string;
  reasonCode: string[];
  faultDescription: string;
  isSelected?: boolean;
}

export interface NoInfoItem {
  id?: number;
  dateOfReturn: Date;
  returnNumber: number;
  stockNumber: string;
  details: string;
  isSelected?: boolean;
}

export interface NotProcessedItem {
  id?: number;
  dateOfReturn: Date;
  magentoOrderNo: string;
  returnNumber: number;
  stockNumber: string;
  reasonCode: string[];
  packingNumber: string;
  isSelected?: boolean;
}

export interface ReportData {
  returns: ReturnItem[];
  faulty_items: FaultyItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL_Api_Endpoint = './api.php';
  // private baseURL_Api_Endpoint: string = 'http://localhost/api.php';

  constructor(private http: HttpClient) { }

  getReportDate(d: Date): string {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[d.getMonth()] + '-' + d.getFullYear();
  }

  // Return Items

  getReturnItems(): Observable<ReturnItem[]> {
    const params = {
      action: 'getReturnItems'
    };
    return this.http.get<ReturnItem[]>(this.baseURL_Api_Endpoint, {params: params});
  }

  addReturnItem(product: ReturnItem): Observable<ReturnItem> {
    const params = {
      action: 'addReturnItem',
      dateOfReturn: moment(product.dateOfReturn).format('YYYY-MM-DD'),
      magentoOrderNo: product.magentoOrderNo.toString(),
      returnNumber: product.returnNumber.toString(),
      stockNumber: product.stockNumber.toString(),
      reasonCode: JSON.stringify(product.reasonCode),
      packingNumber: product.packingNumber.toString()
    };
    return this.http.get<ReturnItem>(this.baseURL_Api_Endpoint, {params: params});
  }

  editReturnItem(product: ReturnItem, id: number): Observable<ReturnItem> {
    const params = {
      action: 'editReturnItem',
      id: id.toString(),
      dateOfReturn: moment(product.dateOfReturn).format('YYYY-MM-DD'),
      magentoOrderNo: product.magentoOrderNo.toString(),
      returnNumber: product.returnNumber.toString(),
      stockNumber: product.stockNumber.toString(),
      reasonCode: JSON.stringify(product.reasonCode),
      packingNumber: product.packingNumber.toString()
    };
    return this.http.get<ReturnItem>(this.baseURL_Api_Endpoint, {params: params});
  }

  deleteReturnItem(id: number): Observable<any> {
    const params = {
      action: 'deleteReturnItem',
      id: id.toString()
    };
    return this.http.get(this.baseURL_Api_Endpoint, {params: params});
  }

  // Faulty Items

  getFaultyItems(): Observable<FaultyItem[]> {
    const params = {
      action: 'getFaultyItems'
    };
    return this.http.get<FaultyItem[]>(this.baseURL_Api_Endpoint, {params: params});
  }

  addFaultyItem(product: FaultyItem): Observable<FaultyItem> {
    const params = {
      action: 'addFaultyItem',
      dateOfReturn: moment(product.dateOfReturn).format('YYYY-MM-DD'),
      magentoOrderNo: product.magentoOrderNo.toString(),
      returnNumber: product.returnNumber.toString(),
      stockNumber: product.stockNumber.toString(),
      reasonCode: JSON.stringify(product.reasonCode),
      faultDescription: product.faultDescription.toString()
    };
    return this.http.get<FaultyItem>(this.baseURL_Api_Endpoint, {params: params});
  }

  editFaultyItem(product: FaultyItem, id: number): Observable<FaultyItem> {
    const params = {
      action: 'editFaultyItem',
      id: id.toString(),
      dateOfReturn: moment(product.dateOfReturn).format('YYYY-MM-DD'),
      magentoOrderNo: product.magentoOrderNo.toString(),
      returnNumber: product.returnNumber.toString(),
      stockNumber: product.stockNumber.toString(),
      reasonCode: JSON.stringify(product.reasonCode),
      faultDescription: product.faultDescription.toString()
    };
    return this.http.get<FaultyItem>(this.baseURL_Api_Endpoint, {params: params});
  }

  deleteFaultyItem(id: number): Observable<any> {
    const params = {
      action: 'deleteFaultyItem',
      id: id.toString()
    };
    return this.http.get(this.baseURL_Api_Endpoint, {params: params});
  }

  // No Info Items

  getNoInfoItems(): Observable<NoInfoItem[]> {
    const params = {
      action: 'getNoInfoItems'
    };
    return this.http.get<NoInfoItem[]>(this.baseURL_Api_Endpoint, {params: params});
  }

  addNoInfoItem(product: NoInfoItem): Observable<NoInfoItem> {
    const params = {
      action: 'addNoInfoItem',
      dateOfReturn: moment(product.dateOfReturn).format('YYYY-MM-DD'),
      returnNumber: product.returnNumber.toString(),
      stockNumber: product.stockNumber.toString(),
      details: product.details.toString()
    };
    return this.http.get<NoInfoItem>(this.baseURL_Api_Endpoint, {params: params});
  }

  editNoInfoItem(product: NoInfoItem, id: number): Observable<NoInfoItem> {
    const params = {
      action: 'editNoInfoItem',
      id: id.toString(),
      dateOfReturn: moment(product.dateOfReturn).format('YYYY-MM-DD'),
      returnNumber: product.returnNumber.toString(),
      stockNumber: product.stockNumber.toString(),
      details: product.details.toString()
    };
    return this.http.get<NoInfoItem>(this.baseURL_Api_Endpoint, {params: params});
  }

  deleteNoInfoItem(id: number): Observable<any> {
    const params = {
      action: 'deleteNoInfoItem',
      id: id.toString()
    };
    return this.http.get(this.baseURL_Api_Endpoint, {params: params});
  }

  // Not Processed Items

  getNotProcessedItems(): Observable<NotProcessedItem[]> {
    const params = {
      action: 'getNotProcessedItems'
    };
    return this.http.get<NotProcessedItem[]>(this.baseURL_Api_Endpoint, {params: params});
  }

  addNotProcessedItem(product: NotProcessedItem): Observable<NotProcessedItem> {
    const params = {
      action: 'addNotProcessedItem',
      dateOfReturn: moment(product.dateOfReturn).format('YYYY-MM-DD'),
      magentoOrderNo: product.magentoOrderNo.toString(),
      returnNumber: product.returnNumber.toString(),
      stockNumber: product.stockNumber.toString(),
      reasonCode: JSON.stringify(product.reasonCode),
      packingNumber: product.packingNumber.toString()
    };
    return this.http.get<NotProcessedItem>(this.baseURL_Api_Endpoint, {params: params});
  }

  editNotProcessedItem(product: NotProcessedItem, id: number): Observable<NotProcessedItem> {
    const params = {
      action: 'editNotProcessedItem',
      id: id.toString(),
      dateOfReturn: moment(product.dateOfReturn).format('YYYY-MM-DD'),
      magentoOrderNo: product.magentoOrderNo.toString(),
      returnNumber: product.returnNumber.toString(),
      stockNumber: product.stockNumber.toString(),
      reasonCode: JSON.stringify(product.reasonCode),
      packingNumber: product.packingNumber.toString()
    };
    return this.http.get<NotProcessedItem>(this.baseURL_Api_Endpoint, {params: params});
  }

  deleteNotProcessedItem(id: number): Observable<any> {
    const params = {
      action: 'deleteNotProcessedItem',
      id: id.toString()
    };
    return this.http.get(this.baseURL_Api_Endpoint, {params: params});
  }

  // Report

  getReportData(dFrom: string, dTo: string): Observable<ReportData> {
    const params = {
      action: 'getReportData',
      dFrom: dFrom,
      dTo: dTo
    };
    return this.http.get<ReportData>(this.baseURL_Api_Endpoint, {params: params});
  }

}
