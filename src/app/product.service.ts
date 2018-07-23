import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

export interface ReturnItem {
  id?: number,
  dateOfReturn: Date;
  magentoOrderNo: string;
  returnNumber: number;
  stockNumber: string;
  reasonCode: string[];
  packingNumber: string;
  isSelected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL_Api_Endpoint: string = 'http://localhost/ngMat/api.php';

  constructor(private http: HttpClient) { }

  getReportDate(d: Date): string {
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[d.getMonth()] + "-" + d.getFullYear();
  }

  getReturnProducts(): Observable<ReturnItem[]> {
    let params = {
      operation: 'read',
      tableName: 'returns'
    };
    return this.http.get<ReturnItem[]>(this.baseURL_Api_Endpoint, {params: params});
  }

  addReturnProduct(product: ReturnItem): Observable<ReturnItem> {
    let params = {
      operation: 'add',
      tableName: 'returns',
      dateOfReturn: moment(product.dateOfReturn).format('YYYY-MM-DD'),
      magentoOrderNo: product.magentoOrderNo.toString(),
      returnNumber: product.returnNumber.toString(),
      stockNumber: product.stockNumber.toString(),
      reasonCode: JSON.stringify(product.reasonCode),
      packingNumber: product.packingNumber.toString()
    };
    return this.http.get<ReturnItem>(this.baseURL_Api_Endpoint, {params: params});
  }

  editReturnProduct(product: ReturnItem, id: number): Observable<ReturnItem> {
    let params = {
      operation: 'edit',
      tableName: 'returns',
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

  deleteReturnProduct(id: number): Observable<any> {
    let params = {
      operation: 'delete',
      tableName: 'returns',
      id: id.toString()
    };
    return this.http.get(this.baseURL_Api_Endpoint, {params: params});
  }

}
