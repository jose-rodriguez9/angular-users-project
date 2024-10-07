import { createAction, props } from '@ngrx/store';
import { User } from '../models/users';

export const getUsers = createAction('[User] Get Users');
export const getUsersSuccess = createAction('[User] Get Users Success', (users: User[]) => ({ users }));
export const getUsersError = createAction('[User] Get Users Error', props<{ isApiError: boolean }>());
export const clearState = createAction('[User] Cleaer State');
export const updateUser = createAction('[User] Update User', (user: User) => ({ user }));
