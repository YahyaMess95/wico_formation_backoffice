import { NgModule, isDevMode } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { CardDetailsComponent } from './card-details/card-details.component';
import { MatChipsModule } from '@angular/material/chips';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { AuthenticationCardComponent } from './authentication-card/authentication-card.component';
import { CardsComponent } from './cards/cards.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { provideTransloco } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    CarouselComponent,
    CardComponent,
    AboutComponent,
    ContactComponent,
    ServicesComponent,
    NotFoundComponent,
    FooterComponent,
    CardDetailsComponent,
    AuthenticationCardComponent,
    CardsComponent,
    ForgetPasswordComponent,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideTransloco({
      config: {
        availableLangs: ['En', 'Fr'],
        defaultLang: 'En',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
  bootstrap: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatChipsModule,
    HttpClientModule,
    TranslocoRootModule,
  ],
})
export class AppModule {}
