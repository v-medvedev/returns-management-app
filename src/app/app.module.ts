import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatSelectModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatNativeDateModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ReturnsComponent } from './returns/returns.component';
import { ReturnsCountComponent } from './returns-count/returns-count.component';
import { ReturnsSummaryComponent } from './returns-summary/returns-summary.component';

import { ProductService } from './product.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'returns' },
  { path: 'returns', component: ReturnsComponent },
  { path: 'returns-count', component: ReturnsCountComponent },
  { path: 'returns-summary', component: ReturnsSummaryComponent },
  { path: '**', redirectTo: 'returns' }
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    ReturnsComponent,
    ReturnsCountComponent,
    ReturnsSummaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
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
    MatNativeDateModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
