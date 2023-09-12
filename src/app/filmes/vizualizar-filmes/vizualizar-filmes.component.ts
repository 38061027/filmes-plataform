import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'app-vizualizar-filmes',
  templateUrl: './vizualizar-filmes.component.html',
  styleUrls: ['./vizualizar-filmes.component.scss'],
})
export class VizualizarFilmesComponent implements OnInit {
  readonly semFoto =
    'http://plone.ufpb.br/labeet/contents/paginas/acervo-brazinst/copy_of_cordofones/udecra/sem-imagem.jpg/@@images/a74f5e97-d7f8-434c-add1-2954494f51cd.jpeg';

  filme!: Filme;
  id!: number;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private filmesService: FilmesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao:'Caso você tenha certeza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true,
      } as Alerta,
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmesService
          .excluir(this.id)
          .subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    });
  }


  editar():void{
    this.router.navigateByUrl('/filmes/cadastro/' + this.id)
  }


  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => {
      this.filme = filme;
    });
  }




}
