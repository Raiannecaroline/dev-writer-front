import { Categorias } from './../../categorias/models/categorias.model';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  ulHandler: string;
  publishAt: Date;
  authorAt: string;
  isVisible: boolean;
  categorias: Categorias[];
}
