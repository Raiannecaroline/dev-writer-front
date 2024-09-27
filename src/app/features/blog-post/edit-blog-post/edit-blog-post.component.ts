import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoriasService } from '../../categorias/services/categorias.service';
import { Categorias } from '../../categorias/models/categorias.model';

@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrls: ['./edit-blog-post.component.css']
})
export class EditBlogPostComponent implements OnInit, OnDestroy {

  id?: string | null = null;
  routeSubscription?: Subscription;
  model?: BlogPost;
  categorias$?: Observable<Categorias[]>
  selectCategorias?: string[];

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.categorias$ = this.categoriasService.getAllCategorias();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.blogPostService.getPostsById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectCategorias = response.categories.map(x => x.id);
            }
          });
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  onFormEnviar(): void {

  }

}
