import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemSelectorComponent } from './imagem-selector.component';

describe('ImagemSelectorComponent', () => {
  let component: ImagemSelectorComponent;
  let fixture: ComponentFixture<ImagemSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagemSelectorComponent]
    });
    fixture = TestBed.createComponent(ImagemSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
