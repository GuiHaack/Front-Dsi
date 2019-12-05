import { Down_payments } from './../models/down_payments';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workers } from '../models/workers';

@Injectable({
  providedIn: 'root'
})
export class AdiantamentosService {

  constructor(private http: HttpClient) { }
  private down_paymentUrl = 'http://127.0.0.1:8001/api/down_payment';
  private WorkerUrl = 'http://127.0.0.1:8001/api/worker';

  getWorks(){
    return this.http.get<Workers[]>(this.WorkerUrl);
  }
  
  getDown_payments(){
    return this.http.get<Down_payments[]>(this.down_paymentUrl);
  }
  
  getAdiantamentoById(id): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${this.down_paymentUrl}/${id}`, { observe: 'response' });
  }

  postdown_payment(form){
    return this.http.post(this.down_paymentUrl, form);
  }

  delete(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.down_paymentUrl}/${id}`, { observe: 'response' });
  }

  updatedown_payment(Entry, id){
    return this.http.patch(`${this.down_paymentUrl}/${Entry}`, id);
  }
}
