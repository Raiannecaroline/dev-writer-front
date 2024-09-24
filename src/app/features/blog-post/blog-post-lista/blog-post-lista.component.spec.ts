import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostListaComponent } from './blog-post-lista.component';

describe('BlogPostListaComponent', () => {
  let component: BlogPostListaComponent;
  let fixture: ComponentFixture<BlogPostListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogPostListaComponent]
    });
    fixture = TestBed.createComponent(BlogPostListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
