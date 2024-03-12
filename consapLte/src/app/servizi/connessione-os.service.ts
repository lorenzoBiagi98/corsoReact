import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { richiestaOS } from '../modelli/richiestaOS';
import { approvazioneOS } from '../modelli/approvazioneOS';

@Injectable({
  providedIn: 'root'
})
export class ConnessioneOsService {

  private urlServer='http://localhost:8080'

  constructor(private http:HttpClient) {}
   
  public getStatoRichiestaOS():Observable<richiestaOS[]>{
    return this.http.get<any>(`${this.urlServer}/statoRichiestaOS`)
  }

  public getStatoApprovazioneRichiestaOS():Observable<approvazioneOS[]>{
    return this.http.get<any>(`${this.urlServer}/statoApprovazioneOS`)
  }
}
