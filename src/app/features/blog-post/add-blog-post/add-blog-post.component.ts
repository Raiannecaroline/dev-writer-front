import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css']
})
export class AddBlogPostComponent {
  model: AddBlogPost;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router
  ){
    this.model = {
      title: '',
      content: '',
      description: '',
      imageUrl: '',
      ulHandler: '',
      authorAt: '',
      isVisible: true,
      publishAt: new Date()
    }
  }

  onFormEnviar(): void {
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogPost');
      }
    });
  }
}
