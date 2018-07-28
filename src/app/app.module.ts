import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatSelectModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatNativeDateModule, MatProgressSpinnerModule, MatSortModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ProductService } from './product.service';

import { ReturnsComponent } from './returns/returns.component';
import { ReturnsCountComponent } from './returns-count/returns-count.component';
import { ReturnsSummaryComponent } from './returns-summary/returns-summary.component';

import { FaultyItemsComponent } from './faulty-items/faulty-items.component';
import { FaultyItemsCountComponent } from './faulty-items-count/faulty-items-count.component';
import { FaultyItemsSummaryComponent } from './faulty-items-summary/faulty-items-summary.component';

import { ReportComponent } from './report/report.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'returns' },
  { path: 'returns', component: ReturnsComponent },
  // { path: 'returns-count', component: ReturnsCountComponent },
  // { path: 'returns-summary', component: ReturnsSummaryComponent },
  { path: 'faulty', component: FaultyItemsComponent },
  // { path: 'faulty-count', component: FaultyItemsCountComponent },
  // { path: 'faulty-summary', component: FaultyItemsSummaryComponent },
  { path: 'report', component: ReportComponent },
  { path: '**', redirectTo: 'returns' }
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    ReturnsComponent,
    ReturnsCountComponent,
    ReturnsSummaryComponent,
    FaultyItemsComponent,
    FaultyItemsCountComponent,
    FaultyItemsSummaryComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
