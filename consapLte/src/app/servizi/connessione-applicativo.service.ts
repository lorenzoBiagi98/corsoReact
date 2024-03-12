import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { applicativo } from '../modelli/applicativo';

@Injectable({
  providedIn: 'root'
})
export class ConnessioneApplicativoService {

  private urlServer='http://localhost:8080'

  constructor(private http:HttpClient) { }

  public getApplicativi():Observable<applicativo[]>{
    return this.http.get<any>(`${this.urlServer}/applicativo`)
  }
}
