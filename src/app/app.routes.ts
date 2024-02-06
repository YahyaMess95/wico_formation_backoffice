import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CardsComponent } from './cards/cards.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'training', component: CardsComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Services', component: ServicesComponent },
  { path: 'Contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
