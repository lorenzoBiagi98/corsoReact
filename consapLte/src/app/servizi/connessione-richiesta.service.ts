import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { richiesta } from '../modelli/richiesta';

@Injectable({
  providedIn: 'root',
})
export class ConnessioneRichiestaService {
  private urlServer = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public saveRichiesta(
    richiesta: richiesta
  ): Observable<richiesta[]> {
    return this.http.post<any>(`${this.urlServer}/richiesta`, richiesta);
  }

  public putRichiesta(
    idRichiesta:number,
    richiesta:richiesta
  ): Observable<richiesta[]> {
    console.log(JSON.stringify(richiesta) + 'sto per inviare');
    return this.http.put<any>(`${this.urlServer}/richiesta/put/${idRichiesta}`,richiesta);
  }

  public getRichieste(): Observable<richiesta[]> {
    return this.http.get<any>(`${this.urlServer}/richiesta/richieste`);
  }

  public deleteRichiesta(
    idRichiesta:number
  ): Observable<void>{
    return this.http.delete<void>(`${this.urlServer}/richiesta/delete/${idRichiesta}`)
  }

  public getRichiesteByFiltro(
    idApplicativo: any,
    idCommessa: any,
    idTicket: any
  ): Observable<richiesta[]> {
    return this.http.get<any>(
      `${this.urlServer}/richiesta/richiesteFiltro/${idApplicativo}/${idCommessa}/${idTicket}`
    );
  }
  public getRichiesteByApplicativiTicket(
    idApplicativo: any,
    idTicket: any
  ): Observable<richiesta[]> {
    return this.http.get<any>(
      `${this.urlServer}/richiesta/richiesteFiltro/ApplicativoTicket/${idApplicativo}/${idTicket}`
    );
  }
  public getRichiesteByApplicativoCommessa(
    idApplicativo: any,
    idCommessa: any
  ): Observable<richiesta[]> {
    return this.http.get<any>(
      `${this.urlServer}/richiesta/richiesteFiltro/ApplicativoCommessa/${idApplicativo}/${idCommessa}`
    );
  }
  public getRichiesteByCommessaTicket(
    idCommessa: any,
    idTicket: any
  ): Observable<richiesta[]> {
    console.log(idCommessa);
    return this.http.get<any>(
      
      `${this.urlServer}/richiesta/richiesteFiltro/CommessaTicket/${idTicket}/${idCommessa}`
    );
  }

  public getRichiestaByApplicativo(
    idApplicativo: any
  ): Observable<richiesta[]> {
    return this.http.get<any>(
      `${this.urlServer}/richiesta/richiesteFiltro/Applicativo/${idApplicativo}`
    );
  }

  public getRichiestaByCommessa(idCommessa: any): Observable<richiesta[]> {
    return this.http.get<any>(
      `${this.urlServer}/richiesta/richiesteFiltro/Commessa/${idCommessa}`
    );
  }

  public getRichiestaByTicket(idTicket: any): Observable<richiesta[]> {
    return this.http.get<any>(
      `${this.urlServer}/richiesta/richiesteFiltro/Ticket/${idTicket}`
    );
  }
}
