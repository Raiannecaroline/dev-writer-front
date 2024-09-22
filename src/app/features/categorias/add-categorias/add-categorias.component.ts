import { Component } from '@angular/core';
import { AddCategoriasRequest } from '../models/add-categorias-request.model';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-add-categorias',
  templateUrl: './add-categorias.component.html',
  styleUrls: ['./add-categorias.component.css']
})
export class AddCategoriasComponent {

  model: AddCategoriasRequest;

  constructor(
    private categoriasService: CategoriasService
  ){
    this.model = {
      name: '',
      urlHandle: ''
    };
  }

  enviarFormulario(){
    this.categoriasService.addCategoria(this.model)
    .subscribe({
      next: (response) => {
        console.log('Isso foi um sucesso!!')
      }
    })
  }

}
