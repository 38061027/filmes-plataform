import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit{


  cadastro!: FormGroup;

  constructor(private fb: FormBuilder) { }




  ngOnInit() {
    this.cadastro = this.fb.group({
   titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
   urlFoto: ['', [Validators.minLength(10)]],
   dtLancamento: ['', [Validators.required]],
   descricao: [''],
   nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
   urlIMDb: ['', [Validators.minLength(10)]],
   genero: ['', [Validators.required]]
    });

  }


  get f(){
    return this.cadastro.controls
  }

  salvar():void{
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid){
      return ;
    }
    alert('sucesso' + JSON.stringify(this.cadastro.value, null , 4))
  }


  reiniciarForm():void{
this.cadastro.reset()
  }

}
