import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivroListComponent } from './livro-list/livro-list.component';
import { LivroFormComponent } from './livro-form/livro-form.component';

const routes: Routes = [
  {
    path: "",
    component: LivroListComponent
  },
  {
    path: "new",
    component: LivroFormComponent
  },
  {
    path: "edit/:id",
    component: LivroFormComponent
  } ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivroRoutingModule { }
