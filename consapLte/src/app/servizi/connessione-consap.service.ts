import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { richiestaCONSAP } from '../modelli/richiestaCONSAP';
import { approvazioneCONSAP } from '../modelli/approvazioneCONSAP';

@Injectable({
  providedIn: 'root'
})
export class ConnessioneConsapService {

  private urlServer='http://localhost:8080'

  constructor(private http:HttpClient) {}
   
  public getStatoRichiestaCONSAP():Observable<richiestaCONSAP[]>{
    return this.http.get<any>(`${this.urlServer}/statoRichiestaCONSAP`)
  }

  public getStatoApprovazioneRichiestaCONSAP():Observable<approvazioneCONSAP[]>{
    return this.http.get<any>(`${this.urlServer}/statoApprovazioneCONSAP`)
  }
}
