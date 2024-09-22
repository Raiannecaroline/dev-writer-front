import { Component, OnDestroy } from '@angular/core';
import { AddCategoriasRequest } from '../models/add-categorias-request.model';
import { CategoriasService } from '../services/categorias.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-categorias',
  templateUrl: './add-categorias.component.html',
  styleUrls: ['./add-categorias.component.css']
})
export class AddCategoriasComponent implements OnDestroy{

  model: AddCategoriasRequest;
  private addCategoriaSubscription?: Subscription;

  constructor(
    private categoriasService: CategoriasService,
    private router: Router
  ){
    this.model = {
      name: '',
      urlHandle: ''
    };
  }

  enviarFormulario(){
    this.addCategoriaSubscription = this.categoriasService.addCategoria(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/categorias')
      }
    })
  }

  ngOnDestroy(): void {
    this.addCategoriaSubscription?.unsubscribe();
  }

}
