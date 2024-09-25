import { Component, Inject, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoriasService } from '../../categorias/services/categorias.service';
import { Observable } from 'rxjs';
import { Categorias } from '../../categorias/models/categorias.model';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css']
})
export class AddBlogPostComponent implements OnInit {

  model: AddBlogPost;

  categorias$?: Observable<Categorias[]>

  constructor(
    @Inject(BlogPostService) private blogPostService: BlogPostService,
    private router: Router,
    private categoriasService: CategoriasService
  ) {
    this.model = {
      title: '',
      content: '',
      description: '',
      imageUrl: '',
      ulHandler: '',
      authorAt: '',
      isVisible: true,
      publishAt: new Date(),
      categorias: []
    }
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriasService.getAllCategorias();
  }

  onFormEnviar(): void {
    console.log(this.model)
    this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogPost');
        }
      });
  }
}
