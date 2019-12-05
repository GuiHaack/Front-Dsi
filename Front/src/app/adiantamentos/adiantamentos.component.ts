import { WorkersService } from './../workers/workers.service';
import { Down_payments } from './../models/down_payments';
import { Component, OnInit, ElementRef } from '@angular/core';
import { AdiantamentosService } from './adiantamentos.service';
import { ToastrService } from 'ngx-toastr';
import { Workers } from '../models/workers';
import { ProcurardateAdiantamento } from '../pipes/procurar-data-adiatamento.pipe';
import { ProcurardiaAdiantamento } from '../pipes/prrocuarar-dia.pipe';
import { ProcurarPessoaDown } from '../pipes/procurar-name.pipe';

@Component({
  selector: 'app-adiantamentos',
  templateUrl: './adiantamentos.component.html',
  styleUrls: ['./adiantamentos.component.css']
})
export class AdiantamentosComponent implements OnInit {

  constructor(private workersService: WorkersService, private adiantamentosService: AdiantamentosService, private toastr: ToastrService, private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#323638';
  }

  workers: Workers[];
  adiantamento: Down_payments[];
  adiant: Down_payments;
  display: boolean;
  displayUp: boolean;
  saldoFuncionario: Down_payments;
  error = '';
  sucess = '';
  procurardata: ProcurardateAdiantamento;
  procurardia: ProcurardiaAdiantamento;
  searchProduto: ProcurarPessoaDown;

  /*Variaveis de validação*/
  id_workersV: boolean = false;
  precoV: boolean = false;
  functionValidation: boolean = false;
  descricaoV: boolean = false;

  /**/

  ngOnInit() {
    this.getProdutos();
    this.getWorkers();
  }

  onDisplay() {
    this.display = !this.display;
  }

  onDisplayUp() {
    this.displayUp = !this.displayUp;
  }

  select(C) {
    this.adiant = Object.assign({}, C);
  }

  getProdutos() {
    this.adiantamentosService.getDown_payments()
      .subscribe(Produtos => {
      this.adiantamento = Produtos,
        this.orderByName();
      });
  }

  getWorkers() {
    this.workersService.getWorks()
      .subscribe(workers => {
      this.workers = workers,
        this.orderByName();
      });
  }

  orderByName() {
    this.adiantamento.sort((a: Down_payments, b: Down_payments) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    })
  }

  onSubmit(p) {
    this.id_workersV = false,
      this.precoV = false,
      this.functionValidation = false,
      this.descricaoV = false
      console.log(p.value)
    let pessoa = p.value.id_workers;
    let preco = p.value.preco;
    let validation = p.value.competencia;
    let descricaoV = p.value.descricao;

    if (pessoa == '')
      this.id_workersV = true;
    if (preco == '')
      this.precoV = true;
    if (validation == '')
      this.functionValidation = true;
    if (descricaoV == '')
      this.descricaoV = true;

    if (this.id_workersV || this.precoV || this.functionValidation || this.descricaoV)
      return false;

    let entry = new FormData();
    entry.append('value', p.value.preco)
    entry.append('reason', p.value.descricao)
    entry.append('date', p.value.competencia)
    entry.append('worker_id', p.value.id_workers)

    this.adiantamentosService.postdown_payment(entry).subscribe((response) => {
      p.reset();
      this.display = !this.display;
      this.getProdutos();
      this.toastr.success('Adiantamento adicionado', 'Sucesso!', {
        timeOut: 5000
      });
    }, error => {
      this.error = error;
      this.toastr.warning('Verifique os campos.', 'Falha no envio!', {
        timeOut: 5000
      });
    });
  }

  updateBuild(p) {
    this.id_workersV = false,
    this.precoV = false,
    this.functionValidation = false,
    this.descricaoV = false

    let pessoa = p.value.id_workers;
    let preco = p.value.preco;
    let validation = p.value.competencia;
    let descricaoV = p.value.descricao;

    if (pessoa == '')
      this.id_workersV = true;
    if (preco == '')
      this.precoV = true;
    if (validation == '')
      this.functionValidation = true;
    if (descricaoV == '')
      this.descricaoV = true;

    if (this.id_workersV || this.precoV || this.functionValidation || this.descricaoV)
      return false;

    const produto = {
      'value': p.value.preco,
      'reason': p.value.descricao,
      'date': p.value.competencia,
      'worker_id': p.value.id_workers
    };

    this.adiantamentosService.updatedown_payment(this.adiant.id, produto)
      .subscribe((response) => {
        this.adiant = null;
        this.displayUp = !this.displayUp;
        this.getProdutos();
        this.toastr.success('Adiantamento editado', 'Sucesso!', {
          timeOut: 5000
        });
      }, error => {
        this.error = error;
        this.toastr.warning('Verifique os campos.', 'Falha no envio!', {
          timeOut: 5000
        });
      });
  }

  deleteEntry() {
    this.adiantamentosService.delete(this.adiant.id)
      .subscribe(
        resp => {
          this.toastr.success('Deletado com sucesso');
          this.adiant = null
          this.getProdutos();
        }
      ),
      (
        error => {
          this.toastr.error('Não foi possível realizar a operação');
        }
      )
  }

}
