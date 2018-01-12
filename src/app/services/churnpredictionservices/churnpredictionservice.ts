import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";





@Injectable()
export class ChurnPredictionService {





    private dataSubject = new ReplaySubject<any>(1);

    private churnData: Observable<any> = null;




    constructor(private _http: HttpClient)  {



    }


    reFetch()
    {
        this.fetch();
    }

    private fetch() {

        this.churnData = this.dataSubject.asObservable();
        this._http.get('http://localhost:3000/api/churninfo').subscribe(res => this.dataSubject.next(res));
    }



    getChurnPredictionData()    {

        if(this.churnData == null)
        {
            this.fetch();
        }

        return  this.churnData;

    }





}
