import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';

@Component({
  selector: 'app-detalhes-blog',
  templateUrl: './detalhes-blog.component.html',
  styleUrls: ['./detalhes-blog.component.css']
})
export class DetalhesBlogComponent implements OnInit {

  url: string | null = null;
  blogPost$? : Observable<BlogPost>;

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService) {

  }
  ngOnInit(): void {
    this.route.paramMap
    .subscribe({
      next: (params) => {
        this.url = params.get('url');
      }
    });
    
    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
    }
  }

}
