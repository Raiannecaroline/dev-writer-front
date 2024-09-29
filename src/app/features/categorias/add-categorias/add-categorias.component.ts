import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddCategoriasRequest } from '../models/add-categorias-request.model';
import { CategoriasService } from '../services/categorias.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-categorias',
  templateUrl: './add-categorias.component.html',
  styleUrls: ['./add-categorias.component.css']
})
export class AddCategoriasComponent implements OnDestroy, OnInit {

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

  ngOnInit(): void {
    this.restoreFormData();
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

  saveFormData(): void {
    localStorage.setItem('addBlogPostData', JSON.stringify(this.model))
  }

  restoreFormData(): void {
    const savedData = localStorage.getItem('addBlogPostData');
    if (savedData) {
      this.model = JSON.parse(savedData);
    }
  }

}
