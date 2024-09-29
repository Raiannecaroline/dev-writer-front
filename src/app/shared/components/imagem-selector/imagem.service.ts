import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogImagem } from '../../models/blog-imagem.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  imagemSelecionada: BehaviorSubject<BlogImagem> = new BehaviorSubject<BlogImagem>({
    id: '',
    fileExtenstion: '',
    fileName: '',
    title: '',
    url: ''
  });

  constructor(private http: HttpClient) { }

  getAllImagens(): Observable<BlogImagem[]> {
    return this.http.get<BlogImagem[]>(`${environment.apiBaseUrl}/api/imagens`);
  }


  uploadImagem(file: File, fileName: string, title: string): Observable<BlogImagem> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<BlogImagem>(`${environment.apiBaseUrl}/api/imagens`, formData);
  }

  selectImagem(imagem: BlogImagem): void {
    this.imagemSelecionada.next(imagem);
  }

  onSelectImagem(): Observable<BlogImagem> {
    return this.imagemSelecionada.asObservable()
  }

}
