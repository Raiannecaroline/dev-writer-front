import { UpdateCategoriaRequest } from './../models/update-categorias-request.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriasService } from '../services/categorias.service';
import { Categorias } from '../models/categorias.model';

@Component({
  selector: 'app-edit-categorias',
  templateUrl: './edit-categorias.component.html',
  styleUrls: ['./edit-categorias.component.css']
})
export class EditCategoriasComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategoriasSubscription?: Subscription;
  categorias?: Categorias;

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if(this.id) {
          this.categoriaService.getCategoriasById(this.id)
          .subscribe({
            next: (response) => {
              this.categorias = response;
            }
          });
        }
      }
    });
  }

  onFormEnviar(): void {
    const updateCategoriaRequest: UpdateCategoriaRequest = {
      name: this.categorias?.name ?? '',
      urlHandle: this.categorias?.urlHandle ?? ''
    };

    if (this.id) {
      this.editCategoriasSubscription = this.categoriaService.updateCategorias(this.id, updateCategoriaRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categorias');
        }
      })
    }

  }

  onDelete(): void {
    if (this.id) {
      this.categoriaService.deleteCategoria(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categorias');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategoriasSubscription?.unsubscribe();
  }
}
