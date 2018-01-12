import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Headers} from '@angular/http';
import {ActivatedRoute, Router} from "@angular/router";




@Injectable()
export class AuthService {




    constructor(private _http: HttpClient, private router: Router)  {

    }


    login(data) {

        window.localStorage.setItem('auth_key', data["user"].token);
        this.isloggedIn  = true;

    }

    logout()
    {
        window.localStorage.removeItem('auth_key');
        this.isloggedIn = false;
        this.router.navigateByUrl('/login');


    }

    authenticated(email: string, password: string){




        return this._http.post('http://localhost:3000/api/authenticate', {'password':password, 'email':email});
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
