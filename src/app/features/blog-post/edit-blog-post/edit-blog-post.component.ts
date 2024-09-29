import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoriasService } from '../../categorias/services/categorias.service';
import { Categorias } from '../../categorias/models/categorias.model';
import { UpdatePost } from '../models/update-blog-post.model';
import { ImagemService } from 'src/app/shared/components/imagem-selector/imagem.service';

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
  showAlert: boolean = false;
  alertMessage: string = '';

  routeSubscription?: Subscription;
  updatePostSubscription?: Subscription;
  getPostSubscription?: Subscription;
  deletePostSubscription?: Subscription;
  imagemSelectSubscricption?: Subscription;


  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoriasService: CategoriasService,
    private router: Router,
    private imagemService: ImagemService
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

        this.imagemSelectSubscricption = this.imagemService.onSelectImagem()
        .subscribe({
          next: (response) => {
            if (this.model) {
              this.model.ulHandler = response.url;
              this.closeImagemSelector();
            }
          }
        })
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
          this.showAlertMessage('Postagem editada com sucesso!');
          this.router.navigateByUrl('/admin/blogPost');
        },
        error: (err) => {
          this.showAlertMessage('Erro ao editar postagem. Tente novamente.');
        }
      });

    }
  }

  onDelete(): void {
    if (this.id) {
      this.deletePostSubscription = this.blogPostService.deletePost(this.id)
      .subscribe({
        next: (response) => {
          this.showAlertMessage('Deletado com sucesso!!')
          this.router.navigateByUrl('/admin/blogPost');
        },
        error: (err) => {
          this.showAlertMessage('Erro ao deletar postagem. Tente novamente.');
        }
      })
    }
  }

  openImagemSelector(): void {
    this.isImagemSelectorVisible = true;
    this.showAlertMessage('Seletor de imagem aberto!');
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

  showAlertMessage(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

}
