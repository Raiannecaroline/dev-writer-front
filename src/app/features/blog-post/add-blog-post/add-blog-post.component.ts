import { ImagemService } from './../../../shared/components/imagem-selector/imagem.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoriasService } from '../../categorias/services/categorias.service';
import { Observable, Subscription } from 'rxjs';
import { Categorias } from '../../categorias/models/categorias.model';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css']
})
export class AddBlogPostComponent implements OnInit, OnDestroy {

  model: AddBlogPost;
  isImagemSelectorVisible : boolean = false;

  categorias$?: Observable<Categorias[]>

  imagemSelectSubscricption?: Subscription;

  constructor(
    @Inject(BlogPostService) private blogPostService: BlogPostService,
    private router: Router,
    private categoriasService: CategoriasService,
    private imagemService: ImagemService
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
      categories: []
    }
  }

  ngOnInit(): void {
    this.restoreFormData();
    this.categorias$ = this.categoriasService.getAllCategorias();

    this.imagemSelectSubscricption = this.imagemService.onSelectImagem().subscribe({
      next: (selectorImagem) => {
        this.model.ulHandler = selectorImagem.url;
        this.closeImagemSelector();
      }
    })
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


  openImagemSelector(): void {
    this.isImagemSelectorVisible = true;
  }

  closeImagemSelector(): void {
    this.isImagemSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imagemSelectSubscricption?.unsubscribe();
  }

  saveFormData(): void {
    localStorage.setItem('addBlogPostData', JSON.stringify(this.model))
  }

  restoreFormData(): void {
    const savedData = localStorage.getItem('addBlogPostData');
    if (savedData) {
      this.model = JSON.parse(savedData);
    }
  }
}
