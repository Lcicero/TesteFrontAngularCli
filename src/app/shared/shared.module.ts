import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";

import { ToastrModule } from "ngx-toastr";

import {
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";

import { SuccessDialogComponent } from "./components/dialogs/success-dialog/success-dialog.component";
import { ErrorDialogComponent } from "./components/dialogs/error-dialog/error-dialog.component";
import { ConfirmDialogComponent } from "./components/dialogs/confirm-dialog/confirm-dialog.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { MascaraDirective } from "./directives/mascara.directive";
import { PtBrMatPaginatorIntl } from "./pt-br-mat-paginator-intl";

import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DataPipe } from './pipes/data.pipe';

@NgModule({
  declarations: [
    NavBarComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent,
    MascaraDirective ,
    DataPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(),
    MatNativeDateModule,
    MatDatepickerModule
  ],
  exports: [
    NavBarComponent,
    FlexLayoutModule,
    MatDialogModule,
    SuccessDialogComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    ToastrModule,
    MatSlideToggleModule,

    MascaraDirective,
    MatNativeDateModule,
    MatDatepickerModule ,
    DataPipe
  ],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent
  ],
  providers: [PtBrMatPaginatorIntl]
})
export class SharedModule {}
