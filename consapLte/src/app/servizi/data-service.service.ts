import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  arrayRichieste:any[] = [];
  arrayCommesse:any[] = [];
  arrayApplicativi:any[] = [];

  constructor() { }
}
