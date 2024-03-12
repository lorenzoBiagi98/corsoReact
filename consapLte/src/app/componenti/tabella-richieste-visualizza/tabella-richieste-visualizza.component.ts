import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabella-richieste-visualizza',
  templateUrl: './tabella-richieste-visualizza.component.html',
  styleUrl: './tabella-richieste-visualizza.component.css'
})
export class TabellaRichiesteVisualizzaComponent implements OnInit {

rich:any

  constructor(private route:ActivatedRoute,
    private location:Location){}
  ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
      this.rich = JSON.parse(params['pippo']);
  });

}

goBack():void{
this.location.back();
}
}
