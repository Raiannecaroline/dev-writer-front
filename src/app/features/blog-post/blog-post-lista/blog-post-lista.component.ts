import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blog-post-lista',
  templateUrl: './blog-post-lista.component.html',
  styleUrls: ['./blog-post-lista.component.css']
})
export class BlogPostListaComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]>

  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private http: HttpClient,
    @Inject(BlogPostService) private blogPostService: BlogPostService
  ) {}

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
    this.showAlertMessage('Lista de posts carregada com sucesso!');
  }

  showAlertMessage(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

}
