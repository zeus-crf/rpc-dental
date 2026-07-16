import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [

 {
    path: '',
    loadComponent: () =>
      import('././components/landing-page/landing-page.component').then(m => m.LandingPageComponent)
  },

];
