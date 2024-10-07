import { Component, computed, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getUsers, updateUser } from '../../store/actions';
import { AppState, userApiInFlightSelector, userErrorSelector, userSelector } from '../../store/reducer';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HomePageQueryParams, User } from '../../models/users';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { toSignal } from '@angular/core/rxjs-interop';
import { ErrorComponent } from '../error/error.component';

@Component({
    selector: 'crx-home-page',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule,
        ReactiveFormsModule, MatButtonModule, MatIconModule, MatProgressBarModule, ErrorComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy {

    user$: Observable<User[]>;
    isApiError$: Observable<boolean>;
    isApiInFlight$: Observable<boolean>;
    private ngUnsubscribe = new Subject<void>();
    textFilterCtrl: FormControl;
    isApiError: boolean;
    isApiInFlight: boolean;
    queryParams: HomePageQueryParams;

    isFavFilter = signal(false);
    textFilter: Signal<string> = signal('');
    usersFiltered = computed(() => this._filter(
        this.textFilter(),
        this.isFavFilter() && this.users() ? this.users().filter((user) => user.favorite === true) : this.users()
    ));
    users: WritableSignal<User[]> = signal([]);

    constructor (private store: Store<AppState>, private router: Router, private activatedRoute: ActivatedRoute) {

        this.isApiError = false;
        this.isApiInFlight = false;
        this.queryParams = <HomePageQueryParams>this.activatedRoute.snapshot.queryParams;
        this.router.navigate([], {
            queryParams: { textFilter: null, isFavFilter: null },
            queryParamsHandling: 'merge'
        });
        this.textFilterCtrl = new FormControl(this.queryParams.textFilter ? this.queryParams.textFilter : '');

        this.isFavFilter.set(this.queryParams.isFavFilter === 'true' ? true : false);
        this.textFilter = toSignal(this.textFilterCtrl.valueChanges, { initialValue: this.textFilterCtrl.value });

        this.user$ = this.store.select(userSelector);
        this.isApiError$ = this.store.select(userErrorSelector);
        this.isApiInFlight$ = this.store.select(userApiInFlightSelector);

    }

    ngOnInit (): void {

        this.setUsersSub();

        this.setApiErrorSub();

        this.setApiInFlightSub();

        if(this.users().length === 0) {

            this.getUsers();

        }

    }

    ngOnDestroy (): void {

        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();

    }

    getUsers () {

        this.store.dispatch(getUsers());

    }

    routeToUser (user: User) {

        const queryParams: HomePageQueryParams = {};
        if(this.textFilterCtrl.value) {

            queryParams.textFilter = this.textFilterCtrl.value;

        }
        if(this.isFavFilter()) {

            queryParams.isFavFilter = this.isFavFilter();

        }
        this.router.navigate(['user', user.id],{ queryParams });

    }

    toggleFav (user: User) {

        const updatedUser: User = JSON.parse(JSON.stringify(user));
        updatedUser.favorite = !updatedUser.favorite;
        this.store.dispatch(updateUser(updatedUser));

    }

    favoriteFilter (favValue: boolean) {

        this.isFavFilter.set(favValue);

    }

    setApiInFlightSub () {

        this.isApiInFlight$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {

            this.isApiInFlight = res;

        });

    }

    setApiErrorSub () {

        this.isApiError$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {

            this.isApiError = res;

        });

    }

    setUsersSub () {

        this.user$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {

            this.users.set(res);

        });

    }

    private _filter (value: string, userArr: User[]): User[] {

        const filterValue = value.toLowerCase();

        return userArr.filter((user) => user.name.toLowerCase().indexOf(filterValue) !== -1);

    }

}
