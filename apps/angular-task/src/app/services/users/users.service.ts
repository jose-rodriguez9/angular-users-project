import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, } from 'rxjs';
import { IUser, User } from '../../models/users';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    url = 'https://jsonplaceholder.typicode.com';

    constructor (private http: HttpClient) { }

    getUsers ():Observable<User[]> {

        const url = `${this.url}/users`;
        return this.http.get<IUser[]>(url).pipe(map((res) => {

            const users: User[] = res.map((iUser) => {

                const user: User = new User(iUser);
                user.favorite = false;
                return user;

            });
            return users;

        }));

    }

}
