import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroFilmesComponent } from './cadastro-filmes/cadastro-filmes.component';
import { ListagemFilmesComponent } from './listagem-filmes/listagem-filmes.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    CadastroFilmesComponent,
    ListagemFilmesComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class FilmesModule { }
