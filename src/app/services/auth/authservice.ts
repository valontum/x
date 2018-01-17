import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Headers} from '@angular/http';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from '../../../environments/environment';




@Injectable()
export class AuthService {


    public user;


    constructor(private _http: HttpClient, private router: Router)  {

    }


    login(data) {

        this.user = data["user"];
        window.localStorage.setItem('auth_key', data["user"].token);
        window.localStorage.setItem('id', data["user"].id);
        window.localStorage.setItem('name', data["user"].name);
        this.isloggedIn  = true;

    }

    logout()
    {
        window.localStorage.removeItem('auth_key');
        window.localStorage.removeItem('name');
        window.localStorage.removeItem('id');
        this.isloggedIn = false;
        this.user = null;
        this.router.navigateByUrl('/login');


    }

    authenticated(email: string, password: string){     




        return this._http.post(environment.address+'/authenticate', {'password':password, 'email':email});
    }




    private redirectUrl: string = '/';
    private loginUrl: string = '/login';
    private isloggedIn: boolean = false;



    isUserLoggedIn(): boolean {

        this.isKey();
        return this.isloggedIn;
    }

    isKey()
    {
        var key = window.localStorage.getItem('auth_key');

        if(key!=null)
        {
            this.isloggedIn = true;
        }else
        {
            this.isloggedIn = false;
        }
    }

    public getToken()
    {
        return window.localStorage.getItem('auth_key');
    }

    public getName()
    {
        return window.localStorage.getItem('name');
    }

    public getId()
    {
        return window.localStorage.getItem('id');
    }

    getRedirectUrl(): string {
        return this.redirectUrl;
    }
    setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }
    getLoginUrl(): string {
        return this.loginUrl;
    }

    logoutUser(): void{
        this.isloggedIn = false;
    }

}
