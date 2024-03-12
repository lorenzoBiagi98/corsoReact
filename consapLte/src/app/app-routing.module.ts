import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { TabellaRichiesteGetAllComponent } from './componenti/tabella-richieste-get-all/tabella-richieste-get-all.component';
import { TabellaRichiesteVisualizzaComponent } from './componenti/tabella-richieste-visualizza/tabella-richieste-visualizza.component';
import { TabellaRichiesteInserisciComponent } from './componenti/tabella-richieste-inserisci/tabella-richieste-inserisci.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './componenti/home/home.component';
import { TabellaRichiesteModificaComponent } from './componenti/tabella-richieste-modifica/tabella-richieste-modifica.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'home' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'tabellaRichieste', component: TabellaRichiesteGetAllComponent },
      {
        path: 'tabellaRichieste/inserisci',
        component: TabellaRichiesteInserisciComponent
      },
      {
        path: 'tabellaRichieste/visualizza',
        component: TabellaRichiesteVisualizzaComponent
      },
      {
        path:'tabellaRichieste/modifica',
        component: TabellaRichiesteModificaComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
