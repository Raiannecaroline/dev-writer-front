import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasListaComponent } from './features/categorias/categorias-lista/categorias-lista.component';
import { AddCategoriasComponent } from './features/categorias/add-categorias/add-categorias.component';
import { EditCategoriasComponent } from './features/categorias/edit-categorias/edit-categorias.component';

const routes: Routes = [
  {
    path: 'admin/categorias',
    component: CategoriasListaComponent
  },
  {
    path: 'admin/categorias/add',
    component: AddCategoriasComponent
  },
  {
    path: 'admin/categorias/:id',
    component: EditCategoriasComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
