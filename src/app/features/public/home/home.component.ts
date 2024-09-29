import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogsPosts$?: Observable<BlogPost[]>;
  dataLoaded: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private blogPostService: BlogPostService
  ) {}

  ngOnInit(): void {
    this.blogsPosts$ = this.blogPostService.getAllBlogPosts();
    this.blogsPosts$.subscribe(() => {
      setTimeout(() => {
        this.showAlertMessage('Dados carregados com sucesso!');
      });
    });
  }

  showAlertMessage(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 1000);
  }

}
