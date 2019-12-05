import { Component, OnInit, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProdutosService } from './produtos.service';
import { Produtos } from '../models/produtos';
import { ProcurarProdutoPipe } from '../pipes/procurarProduto.pipe';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  constructor(private produtoService: ProdutosService, private toastr: ToastrService, private elementRef: ElementRef) { }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#323638';
  }

  produtos: Produtos[];
  prod: Produtos;
  display: boolean;
  displayUp: boolean;
  searchProduto: ProcurarProdutoPipe;
  error = '';
  sucess = '';

  /*Variaveis de validação*/
  ownerValidation: boolean=false;
  valormeV: boolean=false;
  precoV: boolean=false;
  functionValidation: boolean=false;
  descricaoV: boolean=false;
  /**/

  ngOnInit() {
    this.getProdutos();
  }

  onDisplay(){
    this.display = !this.display;
  }

  onDisplayUp(){
    this.displayUp = !this.displayUp;
  }

  select(C){
    this.prod = Object.assign({},C);
  }

  getProdutos(){
    this.produtoService.getProdutos()
    .subscribe(Produtos =>{ this.produtos = Produtos,
      this.orderByName();
    });
  }

  orderByName(){
    this.produtos.sort((a: Produtos, b:Produtos)=>{
      if(a.nome.toLowerCase() > b.nome.toLowerCase()) {
        return 1;
      } else if(a.nome.toLowerCase() < b.nome.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    }) 
  }

  onSubmit(p){
    this.ownerValidation = false,
    this.valormeV = false,
    this.precoV = false,
    this.functionValidation = false 
    this.descricaoV = false 

    let owner = p.value.nome;
    let city = p.value.medida;
    let preco = p.value.preco;
    let validation = p.value.unmedida;
    let descricaoV = p.value.descricao;
    
    if (owner=='') 
      this.ownerValidation = true;
    if (city=='')
      this.valormeV = true;
    if (preco=='')
      this.precoV = true;
    if (validation=='')
      this.functionValidation = true;
    if (descricaoV=='')
      this.descricaoV = true;

    if (this.ownerValidation || this.valormeV || this.precoV || this.functionValidation || this.descricaoV)
    return false;

    let entry = new FormData();
    entry.append('nome', p.value.nome)
    entry.append('preco', p.value.preco)
    entry.append('descricao', p.value.descricao)
    entry.append('unmedida', p.value.unmedida)
    entry.append('valmedida', p.value.medida)

    this.produtoService.postProduto(entry).subscribe((response) => {
      p.reset();
      this.display = !this.display;
      this.getProdutos();
      this.toastr.success('Produto adicionado', 'Sucesso!',{
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
    this.valormeV = false,
    this.precoV = false,
    this.functionValidation = false 
    this.descricaoV = false 

    let owner = p.value.nome;
    let city = p.value.medida;
    let preco = p.value.preco;
    let validation = p.value.unmedida;
    let descricaoV = p.value.descricao;
    
    if (owner=='') 
      this.ownerValidation = true;
    if (city=='')
      this.valormeV = true;
    if (preco=='')
      this.precoV = true;
    if (validation=='')
      this.functionValidation = true;
    if (descricaoV=='')
      this.descricaoV = true;

    if (this.ownerValidation || this.valormeV || this.precoV || this.functionValidation || this.descricaoV)
    return false;

    const produto = {
      'nome': p.value.nome,
      'preco': p.value.preco,
      'descricao': p.value.descricao,
      'unmedida': p.value.unmedida,
      'valmedida': p.value.medida
    };

    this.produtoService.updateProduto(this.prod.id, produto)
    .subscribe((response) => {
      this.prod = null;
      this.displayUp = !this.displayUp;
      this.getProdutos();
      this.toastr.success('Produto editado', 'Sucesso!',{
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
    this.produtoService.delete(this.prod.id)
      .subscribe(
        resp => {
          this.toastr.success('Deletado com sucesso');
          this.prod = null
          this.getProdutos();
        }
      ),
       (
         error =>{
          this.toastr.error('Não foi possível realizar a operação');
        }
      )
  }

}
