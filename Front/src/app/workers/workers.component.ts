import { WorkersService } from './workers.service';
import { Workers } from './../models/workers';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProcurarPessoaPipe } from '../pipes/procurar-pessoa.pipe';
import { ProcurarMovPipe } from '../pipes/procurar-mov-type.pipe';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  constructor(private workersService: WorkersService, private toastr: ToastrService, private elementRef: ElementRef) { }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#323638';
  }

  workers: Workers[];
  work: Workers;
  display: boolean;
  displayUp: boolean;
  procurarNome: ProcurarPessoaPipe;
  procurarmov: ProcurarMovPipe;

  error = '';
  sucess = '';

  /*Variaveis de validação*/
  ownerValidation: boolean=false;
  functionValidation: boolean=false;
  documentValidation: boolean=false;
  receiveV: boolean=false;
  buildings_idV: boolean=false;
  /**/

  ngOnInit() {
    this.getWorkers();
  }

  onDisplay(){
    this.display = !this.display;
  }

  onDisplayUp(){
    this.displayUp = !this.displayUp;
  }

  select(C){
    this.work = Object.assign({},C);
  }

  getWorkers(){
    this.workersService.getWorks()
    .subscribe(workers =>{ this.workers = workers,
      this.orderByName();
    });
  }

  orderByName(){
    this.workers.sort((a: Workers, b:Workers)=>{
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
    this.ownerValidation = false, this.functionValidation = false, this.documentValidation = false,
    this.receiveV = false;
    let owner = p.value.name;
    let city = p.value.function;
    let state = p.value.document;
    let address = p.value.receive;

    if (owner=='') 
      this.ownerValidation = true;
    if (city=='')
      this.functionValidation = true;
    if (state=='')
      this.documentValidation = true;
    if (address=='')
      this.receiveV = true;

    if (this.ownerValidation || this.functionValidation || this.documentValidation || this.receiveV)
    return false;

    let entry = new FormData();
    
    entry.append('name', p.value.name)
    entry.append('function', p.value.function)
    entry.append('document', p.value.document)
    entry.append('receive', p.value.receive)

    this.workersService.postWork(entry).subscribe((response) => {
      p.reset();
      this.display = !this.display;
      this.getWorkers();
      this.toastr.success('Funcionario adicionado', 'Sucesso!',{
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
    this.ownerValidation = false, this.functionValidation = false, this.documentValidation = false,
    this.receiveV = false;
    let owner = p.value.name;
    let city = p.value.function;
    let state = p.value.document;
    let address = p.value.receive;

    if (owner=='') 
      this.ownerValidation = true;
    if (city=='')
      this.functionValidation = true;
    if (state=='')
      this.documentValidation = true;
    if (address=='')
      this.receiveV = true;

    if (this.ownerValidation || this.functionValidation || this.documentValidation || this.receiveV)
    return false;

    const entry = {
      'name': p.value.name,
      'function': p.value.function,
      'document': p.value.document,
      'receive': p.value.receive,
    };
  
    this.workersService.updateWork(this.work.id, entry)
    .subscribe((response) => {
      this.work = null;
      this.displayUp = !this.displayUp;
      this.getWorkers();
      this.toastr.success('Funcionario editado', 'Sucesso!',{
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
    this.workersService.delete(this.work.id)
      .subscribe(
        resp => {
          this.work = null
          this.getWorkers();
          this.toastr.success('Funcionario Deletado', 'Sucesso!',{
            timeOut: 5000
          });
        }
      ),error => {
        this.error = error;
        this.toastr.warning('', 'Não foi possível deletar o Funcionario.', {
          timeOut: 5000
        });
      };
  }

}
