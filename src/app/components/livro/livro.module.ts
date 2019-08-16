import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivroRoutingModule } from './livro-routing.module';
import { LivroListComponent } from './livro-list/livro-list.component';
import { SharedModule } from "src/app/shared/shared.module";
import { MatPaginatorIntl, MAT_DATE_LOCALE } from '@angular/material';
import { PtBrMatPaginatorIntl } from 'src/app/shared/pt-br-mat-paginator-intl';
import { LivroFormComponent } from './livro-form/livro-form.component';

@NgModule({
  declarations: [LivroListComponent, LivroFormComponent],
  imports: [
    CommonModule,
    SharedModule ,
    LivroRoutingModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl } ,  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },]
})
export class LivroModule { }
