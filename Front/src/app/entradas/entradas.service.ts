import { Entradas } from './../models/Entradas';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  constructor(private http: HttpClient) { }
  private EntradasUrl = 'http://127.0.0.1:8001/api/financial';

  getEntradas(){
    return this.http.get<Entradas[]>(this.EntradasUrl);
  }

  postEntradas(form){
    return this.http.post(this.EntradasUrl, form);
  }

  delete(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.EntradasUrl}/${id}`, { observe: 'response' });
  }

  updateEntradas(Entry, id){
    return this.http.patch(`${this.EntradasUrl}/${Entry}`, id);
  }
}
