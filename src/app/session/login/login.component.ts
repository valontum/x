import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from '../../services/auth/authservice';
import { HttpClient } from '@angular/common/http';
import {Headers} from '@angular/http';

@Component({
   selector: 'ms-login-session',
   templateUrl:'./login-component.html',
   styleUrls: ['./login-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
	
  email: string;
  password: string;


  private moreInfo: string;
  private routeData = null;
  private status = {1: 'Incorrect Email or Password', 2 :  'User doesn\'t exist!', 3 : 'Success'};
  constructor(
      private authService: AuthService, private router: Router, private _http: HttpClient, private route: ActivatedRoute
  ) {
      this.routeData = this.route.snapshot.params['routeData'];
      console.log(this.routeData);
  }

  login() {

      this.moreInfo = "";

      this.authService.authenticated(this.email, this.password).subscribe((data) => {



          if(data["status"]==3)
          {

              this.authService.login(data);
              this.navigate();
              this.moreInfo = "";

          }else
          {

              this.moreInfo = "Incorrect Email or Password!";
          }


      });


  }



    navigate()
    {

        console.log(this.routeData == null || this.routeData =="");
        if(this.routeData == null || this.routeData =="")
        {
            this.router.navigateByUrl('/dashboard');
        }
        else
        {

            this.router.navigateByUrl(this.routeData);
        }
    }
	
}



