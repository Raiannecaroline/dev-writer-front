import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesBlogComponent } from './detalhes-blog.component';

describe('DetalhesBlogComponent', () => {
  let component: DetalhesBlogComponent;
  let fixture: ComponentFixture<DetalhesBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhesBlogComponent]
    });
    fixture = TestBed.createComponent(DetalhesBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
