
import { Component, ElementRef, Input, OnInit, ViewChild, viewChild } from '@angular/core';
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
    private connessioneComm: ConnessioneCommesseService,
    private fb: FormBuilder
  ) {}

  @ViewChild('applicativoInput') applicativoInput: ElementRef;

  public richieste: richiesta[] = [];
  public applicativi: applicativo[] = [];
  public commesse: commessa[] = [];
  public richiesteCONSAP: richiestaCONSAP[] = [];
  public approvazioniConsap: approvazioneCONSAP[] = [];
  public richiesteOS: richiestaOS[] = [];
  public approvazioniOS: approvazioneOS[] = [];
  nuovaRichiesta: any = {};
  ticketRich: any;
  minDate: string = '';
  endDate: string = '';
  today = new Date();
  minDateEnd: Date = new Date(this.today.getTime() + 5 * 24 * 60 * 60 * 1000);

  idCommessa: number;
  idApplicativo: number;
  idAppCONSAP: number;
  idAppOS: number;
  idStatoCONSAP: number;
  idStatoOS: number;

  ngOnInit(): void {
    this.getApplicativi();
    this.getRichiesteCONSAP();
    this.getApprovazioniCONSAP();
    this.getRichiesteOS();
    this.getApprovazioniOS();
    this.getCommesse();
    console.log(this.applicativi);
    this.minDate = this.today.toISOString().slice(0, 16);
    this.endDate = this.minDateEnd.toISOString().slice(0, 16);
  }

  isFormValid(): boolean {
    const ticketInput = (<HTMLInputElement>document.getElementById('ticketInput')).value;
    const oggettoInput = (<HTMLInputElement>document.getElementById('oggettoInput')).value;
    const dataCreazioneInput = (<HTMLInputElement>document.getElementById('dataCreazioneInput')).value;
    const applicativoInput = (<HTMLSelectElement>document.getElementById('applicativoInput')).value;
    const richiestaConsapInput = (<HTMLSelectElement>document.getElementById('richiestaConsapInput')).value;
    const richiestaOsInput = (<HTMLSelectElement>document.getElementById('richiestaOsInput')).value;
    const approvazioneConsapInput = (<HTMLSelectElement>document.getElementById('approvazioneConsapInput')).value;
    const approvazioneOsInput = (<HTMLSelectElement>document.getElementById('approvazioneOsInput')).value;
    const stimaDataFineInput = (<HTMLInputElement>document.getElementById('stimaDataFineInput')).value;
    const importoInput = (<HTMLInputElement>document.getElementById('importoInput')).value;
    const commessaOsInput = (<HTMLSelectElement>document.getElementById('commessaOsInput')).value;
  
    return (
      ticketInput.trim() !== '' &&
      oggettoInput.trim() !== '' &&
      dataCreazioneInput.trim() !== '' &&
      applicativoInput.trim() !== '' &&
      richiestaConsapInput.trim() !== '' &&
      richiestaOsInput.trim() !== '' &&
      approvazioneConsapInput.trim() !== '' &&
      approvazioneOsInput.trim() !== '' &&
      stimaDataFineInput.trim() !== '' &&
      importoInput.trim() !== '' &&
      commessaOsInput.trim() !== ''
    );
  }
  
  showInvalidMessage: boolean = false;

  public saveRichiesta() {

    const ticketInputValue = (<HTMLInputElement>document.getElementById('ticketInput')).value;

if (ticketInputValue.length > 5) {
    this.nuovaRichiesta.richiestaNumeroTicket = parseInt(ticketInputValue.slice(0, 5));
} else {
    this.nuovaRichiesta.richiestaNumeroTicket = parseInt(ticketInputValue);
}
    this.nuovaRichiesta.richiestaNumeroTicket = parseInt(
      (<HTMLInputElement>document.getElementById('ticketInput')).value
    );
    this.nuovaRichiesta.richiestaOggetto = (<HTMLInputElement>(
      document.getElementById('oggettoInput')
    )).value;
    this.nuovaRichiesta.richiestaDataCreazione = (<HTMLInputElement>(
      document.getElementById('dataCreazioneInput')
    )).value;
    this.nuovaRichiesta.richiestaDataStimaFine = (<HTMLInputElement>(
      document.getElementById('stimaDataFineInput')
    )).value;

    if (
      this.idApplicativo !== null ||
      typeof this.idApplicativo !== undefined
    ) {
      this.nuovaRichiesta.applicativo = {
        applicativoId: this.idApplicativo,
      };
    } else {
      this.nuovaRichiesta.applicativo = '';
    }

    this.nuovaRichiesta.statoRichiestaCONSAP = {
      statoRichiestaCONSAPId: this.idStatoCONSAP,
    };

    this.nuovaRichiesta.statoRichiestaOS = {
      statoRichiestaOSId: this.idStatoOS,
    };

    this.nuovaRichiesta.statoApprovazioneCONSAP = {
      statoApprovazioneCONSAPId: this.idAppCONSAP,
    };
    this.nuovaRichiesta.statoApprovazioneOS = {
      statoApprovazioneOSId: this.idAppOS,
    };
    this.nuovaRichiesta.importo = (<HTMLInputElement>(
      document.getElementById('importoInput')
    )).value;

    this.nuovaRichiesta.commessaOS = {
      commessaOSId: this.idCommessa,
    };

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

  getSelectedApplicativoId(event: any): void {
    this.idApplicativo = event.target.value;
  }

  getSelectedRichiestaOsId(event: any): void {
    this.idStatoOS = event.target.value;
  }

  getSelectedRichiestaConsapId(event: any): void {
    this.idStatoCONSAP = event.target.value;
  }

  getSelectedApprovazioneConsapId(event: any): void {
    this.idAppCONSAP = event.target.value;
    console.log('Valore selezionato:', this.idAppCONSAP);
  }

  getSelectedApprovazioneOsId(event: any): void {
    this.idAppOS = event.target.value;
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


  showToast1: boolean = false;

  showToast() {
    this.showToast1 = true; 
    setTimeout(() => {
      this.showToast1 = false;
    }, 3000); // 10 secondi
  }
  
}
