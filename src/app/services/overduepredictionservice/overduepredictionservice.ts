import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";





@Injectable()
export class Overduepredictionservice {





    private dataSubject = new ReplaySubject<any>(1);

    private overdueData: Observable<any> = null;




    constructor(private _http: HttpClient)  {



    }


    reFetch()
    {
        this.fetch();
    }

    private fetch() {
   
        this.overdueData = this.dataSubject.asObservable();
        this._http.get('http://localhost:3000/api/overdueinfo').subscribe(res => this.dataSubject.next(res));
    }



    getOverduePredictionData()    {

        if(this.overdueData == null)
        {
            this.fetch();
        }

        return  this.overdueData;

    }





}
