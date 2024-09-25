import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private http: HttpClient,
    private blogPostService: BlogPostService
  ) {}

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }

}
