import { ProcurarPessoaNome } from './../pipes/procurar-name-financial-people.pipe';
import { Component, OnInit, ElementRef } from '@angular/core';
import { EntradasService } from './entradas.service';
import { ToastrService } from 'ngx-toastr';
import { Entradas } from '../models/Entradas';
import { Procurardate } from '../pipes/procurar-date-financial.pipe';
import { ProcurarMovPipe } from '../pipes/procurar-mov-type.pipe';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {

  constructor(private entradasService: EntradasService, private toastr: ToastrService, private elementRef: ElementRef) { }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#323638';
  }

  entradas: Entradas[];
  entra: Entradas;
  display: boolean;
  displayUp: boolean;
  displayClassification: string;
  error = '';
  sucess = '';
  radioResult: string;
  procurardata: Procurardate;
  procurarNome: ProcurarPessoaNome;
  procurarmov: ProcurarMovPipe;

  /*Variaveis de validação*/
  ownerValidation: boolean=false;
  valormeV: boolean=false;
  precoV: boolean=false;
  functionValidation: boolean=false;
  descricaoV: boolean=false;
  /**/

  ngOnInit() {
    this.getEntradas();
  }

  onDisplay(){
    this.display = !this.display;
  }

  getSomeMoreClasses(value) {
    this.radioResult=value;
    };

  onDisplayUp(){
    this.displayUp = !this.displayUp;
  }

  onDisplayClassification(value){
    this.displayClassification = value;
  }

  select(C){
    this.getSomeMoreClasses(C.tipo);
    this.entra = Object.assign({},C);
  }

  getEntradas(){
    this.entradasService.getEntradas()
    .subscribe(entradas =>{ this.entradas = entradas,
      this.orderByDate();
    });
  }

  orderByDate(){
    this.entradas.sort(function compare(a, b) {
      var dateA = <any>new Date(a.data);
      var dateB = <any>new Date(b.data);
      return dateB - dateA;
    });
  }

  onSubmit(p){
    this.ownerValidation = false,
    this.precoV = false,
    this.functionValidation = false, 
    this.descricaoV = false 

    let pessoa = p.value.nome;
    let preco = p.value.preco;
    let validation = p.value.competencia;
    let descricaoV = p.value.descricao;
    
    if (pessoa=='') 
      this.ownerValidation = true;
    if (preco=='')
      this.precoV = true;
    if (validation=='')
      this.functionValidation = true;
    if (descricaoV=='')
      this.descricaoV = true;

    if (this.ownerValidation || this.precoV || this.functionValidation || this.descricaoV)
    return false;
    
    let entry = new FormData();
    entry.append('valor', p.value.preco)
    entry.append('descricao', p.value.descricao)
    entry.append('tipo', this.displayClassification)
    entry.append('data', p.value.competencia)
    entry.append('pessoa', p.value.nome)

    this.entradasService.postEntradas(entry).subscribe((response) => {
      p.reset();
      this.display = !this.display;
      this.getEntradas();
      this.toastr.success('Entrada adicionada', 'Sucesso!',{
        timeOut: 5000
      });
    }, error => {
      this.error = error;
      this.toastr.warning('Verifique os campos.', 'Falha no envio!', {
        timeOut: 5000
      });
    });
  }

  updateBuild(p){
    this.ownerValidation = false,
    this.precoV = false,
    this.functionValidation = false, 
    this.descricaoV = false 

    let pessoa = p.value.nome;
    let preco = p.value.preco;
    let validation = p.value.competencia;
    let descricaoV = p.value.descricao;
    
    if (pessoa=='') 
      this.ownerValidation = true;
    if (preco=='')
      this.precoV = true;
    if (validation=='')
      this.functionValidation = true;
    if (descricaoV=='')
      this.descricaoV = true;

    if (this.ownerValidation || this.precoV || this.functionValidation || this.descricaoV)
    return false;

    const produto = {
      'valor': p.value.preco,
      'tipo': this.displayClassification,
      'descricao': p.value.descricao,
      'data': p.value.competencia,
      'pessoa': p.value.nome
    };

    this.entradasService.updateEntradas(this.entra.id, produto)
    .subscribe((response) => {
      this.entra = null;
      this.displayUp = !this.displayUp;
      this.getEntradas();
      this.toastr.success('Entrada editada', 'Sucesso!',{
        timeOut: 5000
      });
    }, error => {
      this.error = error;
      this.toastr.warning('Verifique os campos.', 'Falha no envio!', {
        timeOut: 5000
      });
    });
  }

  deleteEntry(){
    this.entradasService.delete(this.entra.id)
      .subscribe(
        resp => {
          this.toastr.success('Deletado com sucesso');
          this.entra = null
          this.getEntradas();
        }
      ),
       (
         error =>{
          this.toastr.error('Não foi possível realizar a operação');
        }
      )
  }

  
}
