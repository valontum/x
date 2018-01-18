import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from '../core/route-animation/route.animation';
import {pieChartDemoData, lineChartDemoDataGenerator} from "../data/widgetDemoData.data";
import {Overduepredictionservice} from '../services/overduepredictionservice/overduepredictionservice';

@Component({
    selector: 'ms-predictingoverdues',
    templateUrl:'./predictingoverdues-component.html',
    styleUrls: ['./predictingoverdues-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class PredictingOverduesComponent implements OnInit {
      pieChartDemoData;
      rows = [];
      temp = [];
      columns = [
          { name: 'transactionid' },
        { prop: 'name' },
        { name: 'gender' }

      ];


    public overdueData = null;
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
    mixedPointChartData: Array <any> ;
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


    constructor(private pageTitleService: PageTitleService, private overduepredictionservice:Overduepredictionservice) {


        this.overduepredictionservice.getOverduePredictionData().subscribe((data) => {





            this.overdueData = data;

            this.barChartLabels = this.overdueData[0]['predictedoverdues']['labels'];
            this.barChartData =   [
                {data: this.overdueData[0]['predictedoverdues']['data'], label: 'Predicted Subscription '}

            ];

            this.rows  = this.overdueData[0]['overduelist'];

            this.mixedPointChartData =  [{
                data: this.overdueData[0]['overduepredictionpermonth'],
                label: 'Series A',
                borderWidth: 1,
                type: 'line',
                fill: false
            }];


        });




      }

      ngOnInit() {
        this.pageTitleService.setTitle("Subscription Prediction");
        this.pieChartDemoData = pieChartDemoData;
      }

      fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/company.json`);

        req.onload = () => {
          cb(JSON.parse(req.response));
        };

        req.send();
      }

    public barChartData:any[];

    public barChartLabels:string[] = ['on time', 'after 10d', 'after 20d', 'after 30d'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = false;
    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    barChartColors: Array <any> = [{
        backgroundColor: 'rgba(59, 85, 230, 1)',
        borderColor: 'rgba(59, 85, 230, 1)',
        pointBackgroundColor: 'rgba(59, 85, 230, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 85, 230, 1)'
    }, {
        backgroundColor: 'rgba(235, 78, 54, 1)',
        borderColor: 'rgba(235, 78, 54, 1)',
        pointBackgroundColor: 'rgba(235, 78, 54, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(235, 78, 54, 1)'
    },{
        backgroundColor: 'rgba(67, 210, 158, 0.2)',
        borderColor: 'rgba(67, 210, 158, 1)',
        pointBackgroundColor: 'rgba(67, 210, 158, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(67, 210, 158, 0.8)'
    }];






      updateFilter(event) {
        const val = event.target.value;

        // filter our data
        const temp = this.temp.filter(function(d) {
          return (d.name.toLowerCase().indexOf(val) !== -1);
        });

        // update the rows
        this.rows = temp;
      }







}



