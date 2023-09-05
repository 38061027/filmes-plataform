import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroFilmesComponent } from './cadastro-filmes/cadastro-filmes.component';
import { ListagemFilmesComponent } from './listagem-filmes/listagem-filmes.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CamposModule } from '../shared/components/campos/campos.module';

@NgModule({
  declarations: [
    CadastroFilmesComponent,
    ListagemFilmesComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CamposModule,

  ]
})
export class FilmesModule { }
