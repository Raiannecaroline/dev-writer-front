import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoriasService } from '../../categorias/services/categorias.service';
import { Categorias } from '../../categorias/models/categorias.model';
import { UpdatePost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrls: ['./edit-blog-post.component.css']
})
export class EditBlogPostComponent implements OnInit, OnDestroy {

  id?: string | null = null;
  model?: BlogPost;
  categorias$?: Observable<Categorias[]>
  selectCategorias?: string[];
  isImagemSelectorVisible : boolean = false;

  routeSubscription?: Subscription;
  updatePostSubscription?: Subscription;
  getPostSubscription?: Subscription;
  deletePostSubscription?: Subscription;
  imagemSelectSubscricption?: Subscription;


  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoriasService: CategoriasService,
    private router: Router
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

  onFormEnviar(): void {
    if (this.model && this.id) {
      var updatePost: UpdatePost = {
        authorAt: this.model.authorAt,
        content: this.model.content,
        description: this.model.description,
        imageUrl: this.model.imageUrl,
        publishAt: this.model.publishAt,
        isVisible: this.model.isVisible,
        title: this.model.title,
        ulHandler: this.model.ulHandler,
        categories: this.selectCategorias ?? []
      };

      this.updatePostSubscription = this.blogPostService.updatePosts(this.id, updatePost)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogPost');
        }
      });

    }
  }

  onDelete(): void {
    if (this.id) {
      this.deletePostSubscription = this.blogPostService.deletePost(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogPost');
        }
      })
    }
  }

  openImagemSelector(): void {
    this.isImagemSelectorVisible = true;
  }

  closeImagemSelector(): void {
    this.isImagemSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updatePostSubscription?.unsubscribe();
    this.getPostSubscription?.unsubscribe();
    this.deletePostSubscription?.unsubscribe();
    this.imagemSelectSubscricption?.unsubscribe();
  }

}
