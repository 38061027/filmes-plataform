import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import{debounceTime} from 'rxjs/operators';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'app-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit{

  readonly semFoto = 'http://plone.ufpb.br/labeet/contents/paginas/acervo-brazinst/copy_of_cordofones/udecra/sem-imagem.jpg/@@images/a74f5e97-d7f8-434c-add1-2954494f51cd.jpeg'

  config: ConfigParams = {
    pagina: 0,
    limite:4

  }
  filmes:Filme[] = [];
  generos!: Array<string>
  filtrosListagem!: FormGroup

  constructor(
    private fb: FormBuilder,
    private filmesService: FilmesService) { }



  ngOnInit() {

    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    })

    this.filtrosListagem.get('texto')?.valueChanges
   .pipe(
    debounceTime(500)
   )
    .subscribe((val: string)=>{
      this.config.pesquisa = val
      this.resetarConsulta()
    })

    this.filtrosListagem.get('genero')?.valueChanges.subscribe((val: string)=>{
      this.config.campo = {tipo: 'genero', valor: val}
      this.resetarConsulta()
    })


    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama']

this.listarFilmes()
}


onScroll():void{
    this.listarFilmes()

  }


  private listarFilmes():void{

    if (typeof this.config.pagina === 'number') {
      this.config.pagina++;
      }
    this.filmesService.listar(this.config).subscribe((filmes:Filme[])=>{
      this.filmes.push(...filmes)
    })
  }

private resetarConsulta():void{
this.config.pagina = 0
this.filmes = []
this.listarFilmes();
}

}
