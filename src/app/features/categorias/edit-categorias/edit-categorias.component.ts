import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  categorias?: Categorias;

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriasService
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
    console.log(this.categorias);
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }


}
