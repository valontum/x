import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";





@Injectable()
export class BadDeptPredictionService {





    private dataSubject = new ReplaySubject<any>(1);

    private baddeptData: Observable<any> = null;




    constructor(private _http: HttpClient)  {



    }


    reFetch()
    {
        this.fetch();
    }

    private fetch() {
   
        this.baddeptData = this.dataSubject.asObservable();
        this._http.get('http://localhost:3000/api/baddebtinfo').subscribe(res => this.dataSubject.next(res));
    }



    getBadDebtPredictionData()    {

        if(this.baddeptData == null)
        {
            this.fetch();
        }

        return  this.baddeptData;

    }





}
