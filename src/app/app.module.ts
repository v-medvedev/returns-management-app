import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatSelectModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatNativeDateModule, MatProgressSpinnerModule, MatSortModule, MatTabsModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ReturnsComponent } from './returns/returns.component';
import { ReturnsCountComponent } from './returns-count/returns-count.component';
import { FaultyItemsComponent } from './faulty-items/faulty-items.component';
import { FaultyItemsCountComponent } from './faulty-items-count/faulty-items-count.component';
import { NoinfoComponent } from './noinfo/noinfo.component';
import { NoinfoCountComponent } from './noinfo-count/noinfo-count.component';
import { NotProcessedComponent } from './not-processed/not-processed.component';
import { NotProcessedCountComponent } from './not-processed-count/not-processed-count.component';
import { ReportComponent } from './report/report.component';
import { ReasonKeysComponent } from './reason-keys/reason-keys.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'returns' },
  { path: 'returns', component: ReturnsComponent },
  { path: 'returns-count', component: ReturnsCountComponent },
  { path: 'faulty', component: FaultyItemsComponent },
  { path: 'faulty-count', component: FaultyItemsCountComponent },
  { path: 'no-info', component: NoinfoComponent },
  { path: 'no-info-count', component: NoinfoCountComponent },
  { path: 'not-processed', component: NotProcessedComponent },
  { path: 'not-processed-count', component: NotProcessedCountComponent },
  { path: 'report', component: ReportComponent },
  { path: 'reason-keys', component: ReasonKeysComponent },
  { path: '**', redirectTo: 'returns' }
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    ReturnsComponent,
    FaultyItemsComponent,
    NoinfoComponent,
    NotProcessedComponent,
    NotProcessedCountComponent,
    ReportComponent,
    ReturnsCountComponent,
    FaultyItemsCountComponent,
    NoinfoCountComponent,
    ReasonKeysComponent,
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
    MatSortModule,
    MatTabsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
