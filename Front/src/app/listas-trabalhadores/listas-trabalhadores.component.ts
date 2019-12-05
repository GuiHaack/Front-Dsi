import { ProcurarPessoaListaPipe } from './../pipes/procurar-pessoa-lista.pipe';
import { Workers } from './../models/workers';
import { ListasTrabalhores } from './../models/ListasTrabalhadores';
import { ListasTrabalhadoresService } from './listas-trabalhadores.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Produtos } from '../models/produtos';
import { ProcurardateLista } from '../pipes/procurar-data-lista.pipe';

@Component({
  selector: 'app-listas-trabalhadores',
  templateUrl: './listas-trabalhadores.component.html',
  styleUrls: ['./listas-trabalhadores.component.css']
})
export class ListasTrabalhadoresComponent implements OnInit {

  constructor(private listaService: ListasTrabalhadoresService, private toastr: ToastrService, private elementRef: ElementRef) { }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#323638';
  }

  listas: ListasTrabalhores[];
  produtos: Produtos[];
  workers: Workers[];
  lista: ListasTrabalhores;
  display: boolean;
  displayUp: boolean;
  error = '';
  sucess = '';
  searchPessoaLista: ProcurarPessoaListaPipe;
  procurardata: ProcurardateLista;

  id_workersV: boolean=false;
  quantidadeV: boolean=false;
  functionValidation: boolean=false;
  id_prodV: boolean=false;

  ngOnInit() {
    this.getProdutos();
    this.getWorkers();
    this.getProd();
  }

  onDisplay(){
    this.display = !this.display;
  }

  onDisplayUp(){
    this.displayUp = !this.displayUp;
  }

  select(C){
    this.lista = Object.assign({},C);
  }

  getProd(){
    this.listaService.getProdutos()
    .subscribe(Produtos =>{ this.produtos = Produtos,
      this.orderByName();
    });
  }

  getWorkers(){
    this.listaService.getWorks()
    .subscribe(workers =>{ this.workers = workers,
      this.orderByName();
    });
  }

  getProdutos(){
    this.listaService.getListasTrabalhores()
    .subscribe(ListasTrabalhores =>{ this.listas = ListasTrabalhores,
      this.orderByName();
    });
  }

  orderByName(){
    this.listas.sort((a: ListasTrabalhores, b:ListasTrabalhores)=>{
      if(a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else if(a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    }) 
  }

  onSubmit(p){
    this.id_workersV = false,
    this.quantidadeV = false,
    this.functionValidation = false, 
    this.id_prodV = false 

    let pessoa = p.value.id_workers;
    let preco = p.value.preco;
    let validation = p.value.competencia;
    let id_prodV = p.value.prod_id;
    console.log(p);
    if (pessoa=='') 
      this.id_workersV = true;
    if (preco=='')
      this.quantidadeV = true;
    if (validation=='')
      this.functionValidation = true;
    if (id_prodV=='')
      this.id_prodV = true;

    if (this.id_workersV || this.quantidadeV || this.functionValidation || this.id_prodV)
    return false;
    
    let entry = new FormData();
    entry.append('quantidade', p.value.preco)
    entry.append('Produtos_id', p.value.prod_id)
    entry.append('data', p.value.competencia)
    entry.append('worker_id', p.value.id_workers)

    this.listaService.postListasTrabalhores(entry).subscribe((response) => {
      p.reset();
      this.display = !this.display;
      this.getProdutos();
      this.toastr.success('Item adicionado', 'Sucesso!',{
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
    this.id_workersV = false,
    this.quantidadeV = false,
    this.functionValidation = false, 
    this.id_prodV = false 

    let pessoa = p.value.id_workers;
    let preco = p.value.preco;
    let validation = p.value.competencia;
    let id_prodV = p.value.prod_id;
    
    if (pessoa=='') 
      this.id_workersV = true;
    if (preco=='')
      this.quantidadeV = true;
    if (validation=='')
      this.functionValidation = true;
    if (id_prodV=='')
      this.id_prodV = true;

    if (this.id_workersV || this.quantidadeV || this.functionValidation || this.id_prodV)
    return false;

    const produto = {
      'quantidade': p.value.preco,
      'Produtos_id': p.value.prod_id,
      'data': p.value.competencia,
      'worker_id': p.value.id_workers
    };

    this.listaService.updateListasTrabalhores(this.lista.id, produto)
    .subscribe((response) => {
      this.lista = null;
      this.displayUp = !this.displayUp;
      this.getProdutos();
      this.toastr.success('Item editado', 'Sucesso!',{
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
    this.listaService.delete(this.lista.id)
      .subscribe(
        resp => {
          this.toastr.success('Deletado com sucesso');
          this.lista = null
          this.getProdutos();
        }
      ),
       (
         error =>{
          this.toastr.error('Não foi possível realizar a operação');
        }
      )
  }

  valorItem(valor,quantidade){
    return valor*quantidade
  } 

}
