import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPageComponent } from './user-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling,
    withRouterConfig, withViewTransitions } from '@angular/router';
import { appRoutes } from '../../app.routes';
import { By } from '@angular/platform-browser';
import { User } from '../../models/users';

describe('UserPageComponent', () => {

    let component: UserPageComponent;
    let fixture: ComponentFixture<UserPageComponent>;
    let mockUser: User;

    beforeEach(async () => {

        mockUser
            = {
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
            };

        await TestBed.configureTestingModule({
            imports: [UserPageComponent],
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
            )],

        }).compileComponents();

        fixture = TestBed.createComponent(UserPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should navigate to home when back button is clicked', () => {

        const routeToHomeSpy = jest.spyOn(component, 'routeToHome');
        const backButton = fixture.debugElement.query(By.css('button[mat-icon-button]'));
        backButton.triggerEventHandler('click', null);

        expect(routeToHomeSpy).toHaveBeenCalled();

    });

    it('should display the error component when isApiError is true', () => {

        component.isApiError = true;
        fixture.detectChanges();

        const errorComponent = fixture.debugElement.query(By.css('crx-error'));
        expect(errorComponent).toBeTruthy();

    });

    it('should display user details when user is available and isApiError is false', () => {

        component.isApiError = false;
        component.user = mockUser;
        fixture.detectChanges();

        const userName = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
        expect(userName.textContent).toContain('user');

        const userEmail = fixture.debugElement.query(By.css('.details-container .column')).nativeElement;
        expect(userEmail.textContent).toContain('user@gmail');

    });

    it('should show progress bar when isApiInFlight is true', () => {

        component.isApiInFlight = true;
        fixture.detectChanges();
        const progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));
        expect(progressBar).toBeTruthy();

    });

    it('should call toggleFavorite when the favorite button is clicked', () => {

        const toggleFavoriteSpy = jest.spyOn(component, 'toggleFavorite');
        component.user = { ...mockUser, favorite: false };
        component.isApiError = false;
        fixture.detectChanges();

        const favoriteButton = fixture.debugElement.query(By.css('.fav-toggle'));

        expect(favoriteButton).toBeTruthy();

        favoriteButton.triggerEventHandler('click', null);

        expect(toggleFavoriteSpy).toHaveBeenCalledWith(true);

    });

});
