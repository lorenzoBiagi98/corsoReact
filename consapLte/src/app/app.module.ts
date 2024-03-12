import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './componenti/login/login.component';
import { HomeComponent } from './componenti/home/home.component';
import { TabellaRichiesteGetAllComponent } from './componenti/tabella-richieste-get-all/tabella-richieste-get-all.component';
import { TabellaRichiesteVisualizzaComponent } from './componenti/tabella-richieste-visualizza/tabella-richieste-visualizza.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TabellaRichiesteInserisciComponent } from './componenti/tabella-richieste-inserisci/tabella-richieste-inserisci.component';
import { TabellaRichiesteModificaComponent } from './componenti/tabella-richieste-modifica/tabella-richieste-modifica.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TabellaRichiesteGetAllComponent,
    TabellaRichiesteVisualizzaComponent,
    TabellaRichiesteInserisciComponent,
    TabellaRichiesteModificaComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
