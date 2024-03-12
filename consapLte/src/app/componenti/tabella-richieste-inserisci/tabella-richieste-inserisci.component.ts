import { Component, Input, OnInit } from '@angular/core';
import { TabellaRichiesteGetAllComponent } from '../tabella-richieste-get-all/tabella-richieste-get-all.component';
import { richiesta } from '../../modelli/richiesta';
import { Location } from '@angular/common';
import { DataServiceService } from '../../servizi/data-service.service';
import { applicativo } from '../../modelli/applicativo';
import { commessa } from '../../modelli/commessa';
import { richiestaCONSAP } from '../../modelli/richiestaCONSAP';
import { ConnessioneConsapService } from '../../servizi/connessione-consap.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { approvazioneCONSAP } from '../../modelli/approvazioneCONSAP';
import { ConnessioneApplicativoService } from '../../servizi/connessione-applicativo.service';
import { ConnessioneOsService } from '../../servizi/connessione-os.service';
import { richiestaOS } from '../../modelli/richiestaOS';
import { approvazioneOS } from '../../modelli/approvazioneOS';
import { ConnessioneRichiestaService } from '../../servizi/connessione-richiesta.service';
import { FormBuilder } from '@angular/forms';
import { ConnessioneCommesseService } from '../../servizi/connessione-commesse.service';

@Component({
  selector: 'app-tabella-richieste-inserisci',
  templateUrl: './tabella-richieste-inserisci.component.html',
  styleUrl: './tabella-richieste-inserisci.component.css',
})
export class TabellaRichiesteInserisciComponent implements OnInit {
  constructor(
    private location: Location,
    private dataService: DataServiceService,
    private connessioneCONSAP: ConnessioneConsapService,
    private connessioneApplicativo: ConnessioneApplicativoService,
    private connessioneOS: ConnessioneOsService,
    private connessioneRich: ConnessioneRichiestaService,
    private connessioneComm :ConnessioneCommesseService,
    private fb: FormBuilder
  ) {}

  public richieste: richiesta[] = [];
  public applicativi: applicativo[] = [];
  public commesse: commessa[] = [];
  public richiesteCONSAP: richiestaCONSAP[] = [];
  public approvazioniConsap: approvazioneCONSAP[] = [];
  public richiesteOS: richiestaOS[] = [];
  public approvazioniOS: approvazioneOS[] = [];
  nuovaRichiesta: any = {};
  ticketRich: any;
  minDate:string =""
  endDate:string =""
  today = new Date();
  minDateEnd:Date = new Date(this.today.getTime()+5*24*60*60*1000);


  
  idCommessa:number
  idApplicativo:number
  idAppCONSAP:number
  idAppOS:number
  idStatoCONSAP:number
  idStatoOS:number
  
  ngOnInit(): void {
    this.getApplicativi();
    this.getRichiesteCONSAP();
    this.getApprovazioniCONSAP();
    this.getRichiesteOS();
    this.getApprovazioniOS();
    this.getCommesse();
    console.log(this.applicativi);
    this.minDate = this.today.toISOString().slice(0,16);
    this.endDate = this.minDateEnd.toISOString().slice(0,16);
  }

  public saveRichiesta() {
    this.nuovaRichiesta.richiestaNumeroTicket = parseInt((<HTMLInputElement>(
      document.getElementById('ticketInput')
    )).value);
    this.nuovaRichiesta.richiestaOggetto = (<HTMLInputElement>(
      document.getElementById('oggettoInput')
    )).value;
    this.nuovaRichiesta.richiestaDataCreazione = (<HTMLInputElement>(
      document.getElementById('dataCreazioneInput')
    )).value;
    this.nuovaRichiesta.richiestaDataStimaFine = (<HTMLInputElement>(
      document.getElementById('stimaDataFineInput')
    )).value;
    // TO DO - FARE PER TUTTI COS^
    this.nuovaRichiesta.applicativo = {
      applicativoId: this.idApplicativo
  };  
    this.nuovaRichiesta.statoRichiestaCONSAP = 
    { statoRichiestaCONSAPId: parseInt((<HTMLInputElement>(
      document.getElementById('richiestaConsapInput')
    )).value)};
    this.nuovaRichiesta.statoRichiestaOS =
    { statoRichiestaOSId: parseInt((<HTMLInputElement>(
      document.getElementById('richiestaOsInput')
    )).value)};
    this.nuovaRichiesta.statoApprovazioneCONSAP = {
      statoApprovazioneCONSAPId : parseInt((<HTMLInputElement>(
      document.getElementById('approvazioneConsapInput')
    )).value)};
    this.nuovaRichiesta.statoApprovazioneOS = 
    {statoApprovazioneOSId: parseInt((<HTMLInputElement>(
      document.getElementById('approvazioneOsInput')
    )).value)};
    this.nuovaRichiesta.importo = (<HTMLInputElement>(
      document.getElementById('importoInput')
    )).value;
    this.nuovaRichiesta.commessaOS ={
commessaOSId:parseInt((<HTMLInputElement>(
      document.getElementById('commessaOsInput')
    )).value)};

    console.log(this.nuovaRichiesta.richiestaOggetto + 'oggetto');
    console.log(this.nuovaRichiesta.dataCreazione + 'dc');
    console.log(this.idAppCONSAP + 'AI');
    console.log(this.nuovaRichiesta.RichiestaOsId + 'AI');

    this.connessioneRich
      .saveRichiesta(this.nuovaRichiesta)
      .subscribe((response) => {
        console.log(JSON.stringify(response) + 'questo è da inviare');
      });
  }


  getSelectedCommessaId(event: any): void {
    this.idCommessa = event.target.value;
    console.log('Valore selezionato:', this.idCommessa);
  }

  getSelectedApplicativoId(event:any):void{
    this.idApplicativo = event.target.value;
  }

  getSelectedRichiestaOsId(event:any):void{
    this.idStatoOS = event.target.value;
  }

  getSelectedRichiestaConsapId(event:any):void{
    this.idStatoCONSAP = event.target.value;
  }

  getSelectedApprovazioneConsapId(event:any):void{
    this.idAppCONSAP = event.target.value;
    console.log('Valore selezionato:', this.idAppCONSAP);
  }

  getSelectedApprovazioneOsId(event:any):void{
    this.idAppOS =event.target.value;
  }

  public getApplicativi(): void {
    this.connessioneApplicativo
      .getApplicativi()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      )
      .subscribe((response: applicativo[]) => {
        this.applicativi = response;
      });
  }

  public getCommesse(): void {
    this.connessioneComm
      .getCommesse()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      )
      .subscribe((response: commessa[]) => {
        this.commesse = response;
      });
  }

  public getRichiesteCONSAP(): void {
    this.connessioneCONSAP
      .getStatoRichiestaCONSAP()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      )
      .subscribe((response: richiestaCONSAP[]) => {
        this.richiesteCONSAP = response;
      });
  }

  public getApprovazioniCONSAP(): void {
    this.connessioneCONSAP
      .getStatoApprovazioneRichiestaCONSAP()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      )
      .subscribe((response: approvazioneCONSAP[]) => {
        this.approvazioniConsap = response;
      });
  }

  public getRichiesteOS(): void {
    this.connessioneOS
      .getStatoRichiestaOS()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      )
      .subscribe((response: richiestaOS[]) => {
        this.richiesteOS = response;
      });
  }

  public getApprovazioniOS(): void {
    this.connessioneOS
      .getStatoApprovazioneRichiestaOS()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      )
      .subscribe((response: approvazioneOS[]) => {
        this.approvazioniOS = response;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
