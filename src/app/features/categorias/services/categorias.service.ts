import { Injectable } from '@angular/core';
import { AddCategoriasRequest } from '../models/add-categorias-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(
    private http: HttpClient
  ) { }

  addCategoria(model: AddCategoriasRequest): Observable<void> {
    return this.http.post<void>('https://localhost:7102/api/categories', model);
  }

}
