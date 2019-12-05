import { ListasTrabalhores } from './../models/ListasTrabalhadores';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workers } from '../models/workers';
import { Produtos } from '../models/produtos';

@Injectable({
  providedIn: 'root'
})
export class ListasTrabalhadoresService {

  constructor(private http: HttpClient) { }
  private ListasTrabalhoresUrl = 'http://127.0.0.1:8001/api/listastrabalhadore';

  private WorkerUrl = 'http://127.0.0.1:8001/api/worker';
  private produtoUrl = 'http://127.0.0.1:8001/api/produto';

  getProdutos(){
    return this.http.get<Produtos[]>(this.produtoUrl);
  }
  getWorks(){
    return this.http.get<Workers[]>(this.WorkerUrl);
  }

  getListasTrabalhores(){
    return this.http.get<ListasTrabalhores[]>(this.ListasTrabalhoresUrl);
  }

  postListasTrabalhores(form){
    return this.http.post(this.ListasTrabalhoresUrl, form);
  }

  delete(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.ListasTrabalhoresUrl}/${id}`, { observe: 'response' });
  }

  updateListasTrabalhores(Entry, id){
    return this.http.patch(`${this.ListasTrabalhoresUrl}/${Entry}`, id);
  }
}  
