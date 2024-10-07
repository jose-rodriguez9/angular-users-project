import { createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../models/users';
import { clearState, getUsers, getUsersError, getUsersSuccess, updateUser } from './actions';

export interface AppState {
    userState: UserState
}

export interface UserState {
    users: User[];
    isApiError: boolean;
    isApiInFlight: boolean;
}

const initialState: UserState = {
    users: [],
    isApiError: false,
    isApiInFlight: false
};

export const userReducer = createReducer(
    initialState,
    on(getUsers, (state) => ({
        ...state,
        isApiInFlight: true
    })),
    on(getUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        isApiError: false,
        isApiInFlight: false
    })),
    on(clearState, (() => initialState)),
    on(updateUser, (state, { user }) => {

        const updatedUsers: User[] = state.users.map((ogUser) => user.id === ogUser.id ? user : ogUser);

        return {
            ...state,
            users: updatedUsers };

    }),
    on(getUsersError, (state,{ isApiError }) => ({
        ...state,
        users: [],
        isApiError,
        isApiInFlight: false
    }))
);

export const selectUser = (state: AppState) => state.userState;
export const userSelector = createSelector(
    selectUser,
    (state: UserState) => state.users
);

export const userByIdSelector = (id: number) => createSelector(
    selectUser,
    (state: UserState) => {

        if (state.users.length > 0) {

            return state.users.find((user) => user.id === id);

        } else {

            return null;

        }

    }

);

export const userErrorSelector = createSelector(selectUser, (state: UserState) => state.isApiError);
export const userApiInFlightSelector = createSelector(selectUser,(state: UserState) => state.isApiInFlight);
