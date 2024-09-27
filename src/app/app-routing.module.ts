import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasListaComponent } from './features/categorias/categorias-lista/categorias-lista.component';
import { AddCategoriasComponent } from './features/categorias/add-categorias/add-categorias.component';
import { EditCategoriasComponent } from './features/categorias/edit-categorias/edit-categorias.component';
import { BlogPostListaComponent } from './features/blog-post/blog-post-lista/blog-post-lista.component';
import { AddBlogPostComponent } from './features/blog-post/add-blog-post/add-blog-post.component';
import { EditBlogPostComponent } from './features/blog-post/edit-blog-post/edit-blog-post.component';

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
  },
  {
    path: 'admin/blogPost',
    component: BlogPostListaComponent
  },
  {
    path: 'admin/blogPost/add',
    component: AddBlogPostComponent
  },
  {
    path: 'admin/blogPost/:id',
    component: EditBlogPostComponent
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
