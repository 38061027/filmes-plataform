import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmesModule } from './filmes/filmes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RodapeComponent } from './shared/components/rodape/rodape.component';
import { TabelaComponent } from './shared/components/tabela/tabela.component';
import { TopoComponent } from './shared/components/topo/topo.component';
import { MaterialModule } from './shared/material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertaComponent } from './shared/components/alerta/alerta.component';

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    TabelaComponent,
    TopoComponent,
    AlertaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FilmesModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt' }],
  bootstrap: [AppComponent],


})
export class AppModule { }
