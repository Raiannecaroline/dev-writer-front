import { Categorias } from './../models/categorias.model';
import { Injectable } from '@angular/core';
import { AddCategoriasRequest } from '../models/add-categorias-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(
    private http: HttpClient
  ) { }

  addCategoria(model: AddCategoriasRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`, model);
  }

  getAllCategorias(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(`${environment.apiBaseUrl}/api/categories`);
  }

  getCategoriasById(id: string): Observable<Categorias> {
    return this.http.get<Categorias>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

}
