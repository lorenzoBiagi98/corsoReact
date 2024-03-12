import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { richiesta } from '../../modelli/richiesta';
import { ConnessioneOsService } from '../../servizi/connessione-os.service';
import { ConnessioneConsapService } from '../../servizi/connessione-consap.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { approvazioneCONSAP } from '../../modelli/approvazioneCONSAP';
import { richiestaCONSAP } from '../../modelli/richiestaCONSAP';
import { richiestaOS } from '../../modelli/richiestaOS';
import { applicativo } from '../../modelli/applicativo';
import { commessa } from '../../modelli/commessa';
import { approvazioneOS } from '../../modelli/approvazioneOS';
import { ConnessioneApplicativoService } from '../../servizi/connessione-applicativo.service';
import { ConnessioneCommesseService } from '../../servizi/connessione-commesse.service';
import { Location } from '@angular/common';
import { ConnessioneRichiestaService } from '../../servizi/connessione-richiesta.service';

@Component({
  selector: 'app-tabella-richieste-modifica',
  templateUrl: './tabella-richieste-modifica.component.html',
  styleUrl: './tabella-richieste-modifica.component.css',
})
export class TabellaRichiesteModificaComponent implements OnInit {
  public richieste: richiesta[] = [];
  public richiesteFiltro: richiesta[] = [];
  public applicativi: applicativo[] = [];
  public commesse: commessa[] = [];
  public richiesteCONSAP: richiestaCONSAP[] = [];
  public approvazioneCONSAP: approvazioneCONSAP[] = [];
  public richiesteOS: richiestaOS[] = [];
  public approvazioniOS: approvazioneOS[] = [];
  nuovaRichiesta: any = {};
  idRichiesta:number;
  today = new Date();
  endDate:string =""
  minDateEnd:Date = new Date(this.today.getTime()+5*24*60*60*1000);


  //
  idCommessa:number
  idApplicativo:number
  idAppCONSAP:number
  idAppOS:number
  idStatoCONSAP:number
  idStatoOS:number

  rich: any;
  constructor(
    private route: ActivatedRoute,
    private connessioneOS: ConnessioneOsService,
    private connessioneCONSAP: ConnessioneConsapService,
    private connessioneApplicativo: ConnessioneApplicativoService,
    private connessioneComm: ConnessioneCommesseService,
    private connessioneRich: ConnessioneRichiestaService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.rich = JSON.parse(params['pippo']);
    });
    this.getApprovazioniCONSAP();
    this.getRichiesteOS();
    this.getRichiesteCONSAP();
    this.getApplicativi();
    this.getApprovazioniOS();
    this.getCommesse();
    this.endDate = this.minDateEnd.toISOString().slice(0,16);
    console.log(JSON.stringify(this.rich) + 'richieste');
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
        this.approvazioneCONSAP = response;
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
  }

  getSelectedApprovazioneOsId(event:any):void{
    this.idAppOS =event.target.value;
  }

  public putRichiesta() {

    this.nuovaRichiesta.richiestaNumeroTicket = this.rich.richiestaNumeroTicket;
    this.nuovaRichiesta.richiestaOggetto = this.rich.richiestaOggetto;
    this.nuovaRichiesta.richiestaDataCreazione = this.rich.richiestaDataCreazione;
    this.nuovaRichiesta.richiestaDataStimaFine = (<HTMLInputElement>(
      document.getElementById('stimaDataFineInput')
    )).value;
    if(this.idApplicativo != null || typeof this.idApplicativo !== "undefined"){
    this.nuovaRichiesta.applicativo ={
      applicativoId : this.idApplicativo
    }
  }else{
    this.nuovaRichiesta.applicativo ={
      applicativoId : this.rich.applicativo.applicativoId
    }
  }
  if(this.idStatoCONSAP != null || typeof this.idStatoCONSAP !== "undefined"){
    this.nuovaRichiesta.statoRichiestaCONSAP = {
      statoRichiestaCONSAPId: this.idStatoCONSAP
    };
  }else{
    this.nuovaRichiesta.statoRichiestaCONSAP = {
      statoRichiestaCONSAPId : this.rich.statoRichiestaCONSAP.statoRichiestaCONSAPId
    }
  }
  if(this.idStatoOS != null || typeof this.idStatoOS !== "undefined"){
    this.nuovaRichiesta.statoRichiestaOS = {
      statoRichiestaOSId: this.idStatoOS
    };
  }else{
    this.nuovaRichiesta.statoRichiestaOS ={
      statoRichiestaOSId : this.rich.statoRichiestaOS.statoRichiestaOSId
    }
  }

    if(this.idAppCONSAP != null || typeof this.idAppCONSAP !== "undefined"){
    this.nuovaRichiesta.statoApprovazioneCONSAP = {
      statoApprovazioneCONSAPId: this.idAppCONSAP
    };
  }else{
    this.nuovaRichiesta.statoApprovazioneCONSAP={
      statoApprovazioneCONSAPId: this.rich.statoApprovazioneCONSAP.statoApprovazioneCONSAPId
    }
  }

    if(this.idAppOS != null || typeof this.idAppOS !== "undefined"){
    this.nuovaRichiesta.statoApprovazioneOS = {
      statoApprovazioneOSId: this.idAppOS
    };
  }else{
    this.nuovaRichiesta.statoApprovazioneOS ={
      statoApprovazioneOSId: this.rich.statoApprovazioneOS.statoApprovazioneOSId
    }
  }
  
  const nuovoImporto = (<HTMLInputElement>document.getElementById('importoInput')).value;

  if (nuovoImporto.trim() !== '') {
      this.nuovaRichiesta.importo = nuovoImporto;
  } else {
      this.nuovaRichiesta.importo = this.rich.importo;
  }
  

    if(this.idCommessa != null || typeof this.idCommessa !== "undefined"){
    this.nuovaRichiesta.commessaOS = {
      commessaOSId:this.idCommessa
    }
  }else{
    this.nuovaRichiesta.commessaOS ={
      commessaOSId:this.rich.commessaOS.commessaOSId
    }
  }


    this.connessioneRich
      .putRichiesta( this.rich.richiestaId,this.nuovaRichiesta)
      .subscribe((response) => {
        console.log(JSON.stringify(response) + 'questo è da inviare');
      });
  }

  goBack(): void {
    this.location.back();
  }
}
