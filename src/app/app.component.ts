import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { ProductService, ReturnItem, FaultyItem } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  dataSourceReturns = new MatTableDataSource<ReturnItem>();
  dataSourceFaulty = new MatTableDataSource<FaultyItem>();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getReturnItems().subscribe(data => {
      this.dataSourceReturns.data = data.map(item => {
        item.reasonCode = JSON.parse(item.reasonCode.toString());
        item.isSelected = false;
        return item;
      });
    });
    this.productService.getFaultyItems().subscribe(data => {
      this.dataSourceFaulty.data = data.map(item => {
        item.reasonCode = JSON.parse(item.reasonCode.toString());
        item.isSelected = false;
        return item;
      });
    });
  }

}
