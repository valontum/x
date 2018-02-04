import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from '../core/route-animation/route.animation';
import { stackedAreaChartData } from '../data/stackedAreaChart.data';
import {churnPredictionBasedOnCompanies} from '../data/widgetDemoData.data';
import {ReaderChurnService} from '../services/readerchurn/readerchurnservice'
import { HttpClient } from '@angular/common/http';
import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
    selector: 'ms-nlp',
    templateUrl:'./nlp-component.html',
    styleUrls: ['./nlp-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class NLPComponent implements OnInit {

      rows = [];
      temp = [];
      columns = [
          { name: 'opinion' }
        
        

      ];
    pieChartDemoData;
    stackedAreaChartOptions;
    stackedAreaChartData;

    public churnData = null;

    public percentage = [];


    //Mixed Chart
    public mixedChartLabels:Array<any> = ['1', '2', '3', '4', '5', '6', '7'];
    public mixedChartLegend:boolean = false;

    mixedChartColors: Array <any> = [{
        backgroundColor: 'rgba(67, 210, 158, 1)',
        borderColor: 'rgba(67, 210, 158, 1)',
        pointBackgroundColor: 'rgba(67, 210, 158, 1)',
        pointBorderColor: 'rgba(67, 210, 158, 1)',
        pointHoverBackgroundColor: 'rgba(67, 210, 158, 1)',
        pointHoverBorderColor: 'rgba(67, 210, 158, 1)'
    }, {
        backgroundColor: 'rgba(240, 242, 247, 1)',
        borderColor: 'rgba(240, 242, 247, 1)',
        pointBackgroundColor: 'rgba(240, 242, 247, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(240, 242, 247, 1)'
    }];

    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    public lineChartLegend: boolean = false;



    //Mixed Chart
    mixedPointChartData: Array <any>;

    mixedChartOptions: any = {
        responsive: true,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'rgba(0,0,0,0.02)',
                    zeroLineColor: 'rgba(0,0,0,0.02)'
                }
            }],
            yAxes: [{
                gridLines: {
                    color: 'rgba(0,0,0,0.02)',
                    zeroLineColor: 'rgba(0,0,0,0.02)'
                },
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 9,
                }
            }]
        }
    };

      constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private readerChurnService: ReaderChurnService, private _http: HttpClient) {



        this.percentage = [
            {
                "label": "Pro",
                "value": 17
            },
            {
                "label": "Contra",
                "value": 21
            }
        ];




          this.readerChurnService.getChurnData().subscribe((data) => {





              this.churnData = data;
              //this.rows  = data[0]['churnlist'];

              //this.temp = data[0]['churnlist']

              this.mixedPointChartData = [{
                  data: this.churnData[0]['churnmumberduringmonths'],
                  label: 'Series A',
                  borderWidth: 1,
                  type: 'line',
                  fill: false
              }];



          });




      }
      public form: FormGroup;

      ngOnInit() {
        this.pageTitleService.setTitle("NLP Analysis");
          this.stackedAreaChartData = stackedAreaChartData;
          this.stackedAreaChartOptions = {
              name: 'Predicted bad debt loss',
          };


          this.form = this.fb.group({
            fname: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            range: [null, Validators.compose([Validators.required, CustomValidators.range([5, 9])])],
            url: [null, Validators.compose([Validators.required, CustomValidators.url])],
            date: [null, Validators.compose([Validators.required, CustomValidators.date])],
            creditCard: [null, Validators.compose([Validators.required, CustomValidators.creditCard])],
            phone: [null, Validators.compose([Validators.required, CustomValidators.phone('en-US')])],
            gender: [null, Validators.required]
           
        });


      }

     

      updateFilter(event) {
        const val = event.target.value;

      
        this.getArticles(val);
  
      
      
        

       
      }


      

      getArticles(query)
      {


        var temRes= [];


        this._http.get('http://ec2-18-194-232-155.eu-central-1.compute.amazonaws.com:1234/api/stat?polarity=positive&query='+query+'&page=1').subscribe((data) => {

            


            this.percentage = [
                {
                    "label": "Pro "+query,
                    "value": data["meta"]["pro"]
                },
                {
                    "label": "Contra " +query,
                    "value": data["meta"]["contra"]
                }
            ];


            data["data"].forEach(element => {

                    element["sentences"].forEach(element1 => {
                        if('keys' in element1 && temRes.indexOf({"opinion":element1["sentence"]})==-1)
                        {
                            console.log(element1);
                            temRes.push({"opinion":element1["sentence"]});
                        }
                    });
                
            });


            this.rows = temRes;
            console.log( temRes);
           
            


        });



      }








}



