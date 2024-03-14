import { Component, OnInit } from '@angular/core';
import { ConnessioneRichiestaService } from '../../servizi/connessione-richiesta.service';
import { richiesta } from '../../modelli/richiesta';
import { catchError, throwError } from 'rxjs';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { applicativo } from '../../modelli/applicativo';
import { ConnessioneApplicativoService } from '../../servizi/connessione-applicativo.service';
import { ConnessioneCommesseService } from '../../servizi/connessione-commesse.service';
import { commessa } from '../../modelli/commessa';
import { DataServiceService } from '../../servizi/data-service.service';
import { app } from '../../../../server';
import { response } from 'express';
import { ConnessioneConsapService } from '../../servizi/connessione-consap.service';
import { richiestaCONSAP } from '../../modelli/richiestaCONSAP';
import { approvazioneCONSAP } from '../../modelli/approvazioneCONSAP';
import { richiestaOS } from '../../modelli/richiestaOS';
import { ConnessioneOsService } from '../../servizi/connessione-os.service';
import { approvazioneOS } from '../../modelli/approvazioneOS';

@Component({
  selector: 'app-tabella-richieste-get-all',
  templateUrl: './tabella-richieste-get-all.component.html',
  styleUrl: './tabella-richieste-get-all.component.css',
})
export class TabellaRichiesteGetAllComponent implements OnInit {
  public richieste: richiesta[] = [];
  public richiesteFiltro: richiesta[] = [];
  public applicativi: applicativo[] = [];
  public commesse: commessa[] = [];
  public richiesteCONSAP: richiestaCONSAP[] = [];
  public approvazioneCONSAP: approvazioneCONSAP[] = [];
  public richiesteOS: richiestaOS[] = [];
  public approvazioniOS: approvazioneOS[] = [];
  richCONSAP:number = 0;
  richOS:number = 0;
  appCONSAP:number = 0;
  appOS:number = 0;
  oggettoDesc:string = "";
  commessaId: number = 0;
  numeroTicket: number;
  applicativoId: number = 0;
  pippo: any;
  idDelete : number = 0;
  constructor(
    private connessioneRichiesta: ConnessioneRichiestaService,
    private connessioneApplicativo: ConnessioneApplicativoService,
    private connessioneCommessa: ConnessioneCommesseService,
    private connessioneCONSAP: ConnessioneConsapService,
    private connessioneOS:ConnessioneOsService,
    private router: Router,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    this.getRichieste();
    this.getApplicativi();
    this.getCommesse();
    this.inviaRichieste();
    this.getRichiesteCONSAP();
    this.getApprovazioniCONSAP();
    this.getRichiesteOS();
    this.getApprovazioniOS();
  }

  getIdToDelete(id:number):number{
    this.idDelete = id;
    return this.idDelete;
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
  public getRichieste(): void {
    this.connessioneRichiesta
      .getRichieste()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      )
      .subscribe((response: richiesta[]) => {
        this.richieste = response;
      });
  }

  public getRichiesteByFiltro(): void {
    if(this.applicativoId != null && this.applicativoId > 0 && this.commessaId!= null && this.commessaId>0 && 
      this.numeroTicket!= null && this.numeroTicket>0){
    this.connessioneRichiesta
      .getRichiesteByFiltro(
        this.applicativoId,
        this.commessaId,
        this.numeroTicket
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      )
      .subscribe((response: richiesta[]) => {
        this.richiesteFiltro = response;
        console.log(JSON.stringify(this.richiesteFiltro) + 'richiesteFiltro');
      });
    }else if((this.applicativoId == null || this.applicativoId == 0) && (this.commessaId == null || this.commessaId==0)){
      console.log("sono qui1!!")
      console.log(this.applicativoId);
      console.log(this.commessaId);
      console.log(this.numeroTicket);
      this.connessioneRichiesta.getRichiestaByTicket(this.numeroTicket)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      ).subscribe((response: richiesta[]) => {
        this.richiesteFiltro = response;
        console.log(JSON.stringify(this.richiesteFiltro) + 'richiesteFiltro');
      });
    }else if((this.applicativoId == null || this.applicativoId == 0) && (this.numeroTicket == null || this.numeroTicket==0)){

      this.connessioneRichiesta.getRichiestaByCommessa(this.commessaId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      ).subscribe((response: richiesta[]) => {
        this.richiesteFiltro = response;
        console.log(JSON.stringify(this.richiesteFiltro) + 'richiesteFiltro');
      });
    }else if((this.commessaId == null || this.commessaId == 0) && (this.numeroTicket == null || this.numeroTicket==0)){

      this.connessioneRichiesta.getRichiestaByApplicativo(this.applicativoId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      ).subscribe((response: richiesta[]) => {
        this.richiesteFiltro = response;
        console.log(JSON.stringify(this.richiesteFiltro) + 'richiesteFiltro');
      });
    }else if((this.commessaId == null || this.commessaId == 0)){
      this.connessioneRichiesta.getRichiesteByApplicativiTicket(this.applicativoId, this.numeroTicket)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      ).subscribe((response: richiesta[]) => {
        this.richiesteFiltro = response;
        console.log(JSON.stringify(this.richiesteFiltro) + 'richiesteFiltro');
      });
    }else if((this.numeroTicket == null || this.numeroTicket == 0)){
      this.connessioneRichiesta.getRichiesteByApplicativoCommessa(this.applicativoId, this.commessaId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      ).subscribe((response: richiesta[]) => {
        this.richiesteFiltro = response;
        console.log(JSON.stringify(this.richiesteFiltro) + 'richiesteFiltro');
      });
    }else if((this.applicativoId == null || this.applicativoId == 0)){
      console.log(this.commessaId + "commessaID + sono qui!")
      console.log(this.numeroTicket)
      this.connessioneRichiesta.getRichiesteByCommessaTicket(this.commessaId, this.numeroTicket)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Si è verificato un errore', error);
          return throwError(error);
        })
      ).subscribe((response: richiesta[]) => {
        this.richiesteFiltro = response;
        console.log(JSON.stringify(this.richiesteFiltro) + 'richiesteFiltro');
      });
    }
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

  deleteRichiesta(idRichiesta: number): void {
    this.connessioneRichiesta.deleteRichiesta(idRichiesta).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Errore durante l\'eliminazione della richiesta', error);
        return throwError(error);
      })
    )
    .subscribe((response) => {
      console.log('Richiesta eliminata con successo:', response);
      setTimeout(() => {
        window.location.reload();
      },4000); // 3000 millisecondi = 3 secondi
    },
    (error) => {
      console.error('Errore durante l\'eliminazione della richiesta', error);
    });
  
    console.log('ID da eliminare:', idRichiesta);
  }
  
  
  
  public getCommesse(): void {
    this.connessioneCommessa
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

  redirect(richiesta: any) {
    this.router.navigate(['/home/tabellaRichieste/visualizza'], {
      queryParams: { pippo: JSON.stringify(richiesta) },
    });
  }

  redirect1(richiesta: richiesta) {
    this.router.navigate(['/home/tabellaRichieste/modifica'], {
      queryParams: { pippo: JSON.stringify(richiesta) },
    });
  }

  inserisci() {
    this.router.navigate(['/home/tabellaRichieste/inserisci']);
  }


  inviaRichieste() {
    // Aggiungi gli elementi degli array uno per uno
    this.richieste.forEach((richiesta) => {
      this.dataService.arrayRichieste.push(richiesta);
      console.log(richiesta + 'ciò che arriva');
    });

    this.commesse.forEach((commessa) => {
      this.dataService.arrayCommesse.push(commessa);
    });

    this.applicativi.forEach((applicativo) => {
      this.dataService.arrayApplicativi.push(applicativo);
    });
  }

  showToast1: boolean = false;

  showToast() {
    this.showToast1 = true; 
    setTimeout(() => {
      this.showToast1 = false;
    }, 3000); // 10 secondi
  }
  
}
