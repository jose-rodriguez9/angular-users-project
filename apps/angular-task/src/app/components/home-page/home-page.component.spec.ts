import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter, withComponentInputBinding,
    withRouterConfig, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from '../../app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { By } from '@angular/platform-browser';
import { User } from '../../models/users';
import { signal } from '@angular/core';

describe('HomePageComponent', () => {

    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;
    let mockUsers: User[];

    beforeEach(async () => {

        mockUsers = [
            {
                id: 1,
                name: 'user',
                username: 'user',
                email: 'user@gmail',
                address: {
                    street: '123 Sesame St',
                    suite: 'Apt 1',
                    city: 'LA',
                    zipcode: '55555',
                    geo: { lat: '0', lng: '0' }
                },
                phone: '310-555-5555',
                website: 'user.com',
                company: { name: 'Company One', catchPhrase: '', bs: 'bs' },
                favorite: true
            },
            {
                id: 2,
                name: 'person',
                username: 'person',
                email: 'person@gmail.com',
                address: {
                    street: '123',
                    suite: '123',
                    city: 'OC',
                    zipcode: '555555',
                    geo: { lat: '0', lng: '0' }
                },
                phone: '987-654-3210',
                website: 'person.com',
                company: { name: 'Company', catchPhrase: '', bs: 'bs' },
                favorite: false
            }
        ];

        await TestBed.configureTestingModule({
            imports: [HomePageComponent],
            providers: [provideMockStore({}), provideRouter(
                appRoutes,
                withComponentInputBinding(),
                withRouterConfig({
                    onSameUrlNavigation: 'reload',
                    paramsInheritanceStrategy: 'always',
                }),
                withViewTransitions(),
                withInMemoryScrolling({
                    anchorScrolling: 'enabled',
                    scrollPositionRestoration: 'enabled',
                })
            ),
            provideAnimationsAsync()],
        }).compileComponents();

        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should display error message when isApiError is true', () => {

        component.isApiError = true;
        fixture.detectChanges();
        const errorContainer = fixture.debugElement.query(By.css('.error-container'));
        expect(errorContainer).toBeTruthy();

    });

    it('should show progress bar when isApiInFlight is true', () => {

        component.isApiInFlight = true;
        fixture.detectChanges();
        const progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));
        expect(progressBar).toBeTruthy();

    });

    it('should display error component when isApiError is true', () => {

        component.isApiError = true;
        fixture.detectChanges();

        const errorComponent = fixture.debugElement.query(By.css('crx-error'));
        expect(errorComponent).toBeTruthy();

    });

});
