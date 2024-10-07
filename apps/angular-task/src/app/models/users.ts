export class User implements IUser {

    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddress;
    phone: string;
    website: string;
    company: UserCompany;
    favorite: boolean;

    constructor (user: IUser) {

        this.id = user.id;
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
        this.address = user.address;
        this.phone = user.phone;
        this.website = user.website;
        this.company = user.company;
        this.favorite = false;

    }

}

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddress;
    phone: string;
    website: string;
    company: UserCompany;
}

export interface UserAddress {
    street: string;
    suite: string
    city: string;
    zipcode: string;
    geo: UserAddressGeo
}

export interface UserAddressGeo {
    lat: string;
    lng: string
}

export interface UserCompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface HomePageQueryParams {
    textFilter?: string;
    isFavFilter?: boolean | string;
}
