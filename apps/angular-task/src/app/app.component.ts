import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    standalone: true,
    imports: [RouterModule, HomePageComponent, MatToolbarModule],
    selector: 'crx-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    title = 'angular-task';

}
