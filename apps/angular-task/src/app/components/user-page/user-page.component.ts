import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HomePageQueryParams, User } from '../../models/users';
import { AppState, userApiInFlightSelector, userByIdSelector, userErrorSelector } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { getUsers, updateUser } from '../../store/actions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorComponent } from '../error/error.component';

@Component({
    selector: 'crx-user-page',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule,
        MatProgressBarModule, MatSnackBarModule, ErrorComponent],
    templateUrl: './user-page.component.html',
    styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit, OnDestroy {

    user$: Observable<User | null | undefined>;
    userId: number;
    user: User | null | undefined = null;
    queryParams: HomePageQueryParams;
    isApiInFlight: boolean;
    isApiError: boolean | null;
    isApiError$: Observable<boolean>;
    isApiInFlight$: Observable<boolean>;
    private ngUnsubscribe = new Subject<void>();

    constructor (
        private activatedRoute: ActivatedRoute, private store: Store<AppState>,
        private router: Router, private snackBar: MatSnackBar
    ) {

        this.isApiInFlight = false;
        this.isApiError = false;
        this.userId = parseInt(this.activatedRoute.snapshot.params['id']);
        this.queryParams = this.activatedRoute.snapshot.queryParams;

        this.user$ = this.store.select(userByIdSelector(this.userId));
        this.isApiError$ = this.store.select(userErrorSelector);
        this.isApiInFlight$ = this.store.select(userApiInFlightSelector);

    }

    ngOnInit (): void {

        this.setApiInFlightSub();

        this.setApiErrorSub();

        this.setUsersSub();

        if(this.user === null) {

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

    toggleFavorite (value:boolean) {

        const updatedUser: User = JSON.parse(JSON.stringify(this.user));
        updatedUser.favorite = value;
        this.store.dispatch(updateUser(updatedUser));

    }

    userNotFound () {

        this.snackBar.open('User does not exist', undefined, { duration: 6000 });
        this.routeToHome();

    }

    routeToHome () {

        this.router.navigate(['home/'], { queryParams: this.queryParams });

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

        this.user$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((user) => {

            this.user = user;
            if(this.user === undefined) {

                this.userNotFound();

            }

        });

    }

}
