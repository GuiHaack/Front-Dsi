import { Workers } from './../models/workers';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(private http: HttpClient) { }
  private WorkerUrl = 'http://127.0.0.1:8001/api/worker';

  getWorks(){
    return this.http.get<Workers[]>(this.WorkerUrl);
  }

  postWork(form){
    return this.http.post(this.WorkerUrl, form);
  }

  delete(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.WorkerUrl}/${id}`, { observe: 'response' });
  }

  updateWork(Entry, id){
    return this.http.patch(`${this.WorkerUrl}/${Entry}`, id);
  }
}
