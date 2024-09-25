import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriasListaComponent } from './features/categorias/categorias-lista/categorias-lista.component';
import { AddCategoriasComponent } from './features/categorias/add-categorias/add-categorias.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditCategoriasComponent } from './features/categorias/edit-categorias/edit-categorias.component';
import { BlogPostListaComponent } from './features/blog-post/blog-post-lista/blog-post-lista.component';
import { AddBlogPostComponent } from './features/blog-post/add-blog-post/add-blog-post.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CategoriasListaComponent,
    AddCategoriasComponent,
    EditCategoriasComponent,
    BlogPostListaComponent,
    AddBlogPostComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
