import { Component, ViewChild } from '@angular/core';
import { BlogImagem } from '../../models/blog-imagem.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ImagemService } from './imagem.service';

@Component({
  selector: 'app-imagem-selector',
  templateUrl: './imagem-selector.component.html',
  styleUrls: ['./imagem-selector.component.css']
})
export class ImagemSelectorComponent {
  private file?: File;
  fileName: string = '';
  title: string = '';
  imagens$?: Observable<BlogImagem[]>;

  @ViewChild('form', { static: false}) imagemUploadForm?: NgForm;

  constructor(private imagemService: ImagemService) {

  }
  ngOnInit(): void {
    this.getImagens();
  }

  onFileUploadChangem(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImagem(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      // Image service to upload the image
      this.imagemService.uploadImagem(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) => {
          this.imagemUploadForm?.resetForm();
          this.getImagens();
        }
      });
    }
  }

  selectImagem(imagem: BlogImagem): void {
    this.imagemService.selectImagem(imagem);
  }

  private getImagens() {
    this.imagens$ = this.imagemService.getAllImagens();
  }
}
