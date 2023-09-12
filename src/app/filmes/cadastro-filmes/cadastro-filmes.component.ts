import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'app-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss'],
})
export class CadastroFilmesComponent implements OnInit {
  id!: number;
  cadastro!: FormGroup;
  generos!: Array<string>;

  constructor(
    private filmesService: FilmesService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public validacao: ValidarCamposService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.filmesService
        .visualizar(this.id)
        .subscribe((filme: Filme) => this.criarFormulario(filme));
    } else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }

    this.generos = [
      'Ação',
      'Romance',
      'Aventura',
      'Terror',
      'Ficção cientifica',
      'Comédia',
      'Drama',
    ];
  }

  get f() {
    return this.cadastro.controls;
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    const filme = this.cadastro.getRawValue() as Filme;
    if (this.cadastro.invalid) {
      return;
    }

    if(this.id){
      filme.id = this.id
      this.editar(filme)
    }else{
      this.salvar(filme);

    }

  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [
        filme.titulo,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [
        filme.nota,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]],
    });
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlIMDb: null,
      genero: null,
    } as any;
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(
      () => {
        const config = {
          data: {
            btnSucesso: 'Ir para a listagem',
            btnCancelar: 'Cadastrar um novo filme',
            corBtnCancelar: 'primary',
            possuirBtnFechar: true,
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.router.navigateByUrl('filmes');
          } else {
            this.reiniciarForm();
          }
        });
      },
      () => {
        const config = {
          data: {
            titulo: 'Error ao salvar o registro',
            descricao:
              'Não conseguimos salvar seu resgistor, favor tentar novamente mais tarde',
            corBtnSucesso: 'warn',
            btnSucesso: 'Fechar',
          } as Alerta,
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }



  private editar(filme: Filme): void {
    this.filmesService.editar(filme).subscribe(
      () => {
        const config = {
          data: {

            descricao: 'Seu registro foi atualizado com sucesso',
            btnSucesso: 'Ir para a listagem',
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe(() =>this.router.navigateByUrl('filmes'));
      },
      () => {
        const config = {
          data: {
            titulo: 'Error ao salvar o registro',
            descricao:
              'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
            corBtnSucesso: 'warn',
            btnSucesso: 'Fechar',
          } as Alerta,
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }
}
