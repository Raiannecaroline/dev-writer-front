import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css']
})
export class AddBlogPostComponent {
  model: AddBlogPost;

  constructor(){
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
    console.log(this.model);
  }
}
