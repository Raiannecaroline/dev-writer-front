import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { Categorias } from '../models/categorias.model';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

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
    private categoriaService: CategoriasService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.getAllCategorias();
    this.showAlertMessage('Lista de categorias carregada com sucesso!');
  }

  deleteCategoria(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoriaService.deleteCategoria(id).subscribe(() => {
        // Atualizar a lista de categorias após a exclusão
        this.categorias$ = this.categoriaService.getAllCategorias();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
  showAlertMessage(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

}
