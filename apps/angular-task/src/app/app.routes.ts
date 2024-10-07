import { Route } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';

export const appRoutes: Route[] = [
    { path: 'home' , component: HomePageComponent },
    { path: 'user/:id', component: UserPageComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];
