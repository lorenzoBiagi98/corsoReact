import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { applicativo } from '../modelli/applicativo';
import { commessa } from '../modelli/commessa';

@Injectable({
  providedIn: 'root'
})
export class ConnessioneCommesseService {

  private urlServer='http://localhost:8080'

  constructor(private http:HttpClient) { }

  public getCommesse():Observable<commessa[]>{
    return this.http.get<any>(`${this.urlServer}/commessaOS`)
  }
}
