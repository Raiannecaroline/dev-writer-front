import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { Categorias } from '../models/categorias.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './categorias-lista.component.html',
  styleUrls: ['./categorias-lista.component.css']
})
export class CategoriasListaComponent implements OnInit {

  categorias$?: Observable<Categorias[]>;

  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private categoriaService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.getAllCategorias();
    this.showAlertMessage('Lista de categorias carregada com sucesso!');
  }

  showAlertMessage(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

}
