import { Produtos } from './../models/produtos';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }
  private produtoUrl = 'http://127.0.0.1:8001/api/produto';

  getProdutos(){
    return this.http.get<Produtos[]>(this.produtoUrl);
  }

  postProduto(form){
    return this.http.post(this.produtoUrl, form);
  }

  delete(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.produtoUrl}/${id}`, { observe: 'response' });
  }

  updateProduto(Entry, id){
    return this.http.patch(`${this.produtoUrl}/${Entry}`, id);
  }
}
