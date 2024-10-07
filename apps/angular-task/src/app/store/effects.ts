import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users/users.service';
import { getUsers, getUsersError, getUsersSuccess } from './actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AppState } from './reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffects {

    action$ = inject(Actions);

    constructor (private store: Store<AppState>, private userService: UsersService) { }

    getUsers$ = createEffect(() =>
        this.action$.pipe(
            ofType(getUsers),
            exhaustMap(() =>
                this.userService.getUsers().pipe(map((user) => getUsersSuccess(user)))),
            catchError(() => of(getUsersError({ isApiError: true })))
        ));

}
