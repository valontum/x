import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from '../core/route-animation/route.animation';
import { stackedAreaChartData } from '../data/stackedAreaChart.data';
import {BadDeptPredictionService} from "../services/baddeptpredictionservice/baddeptpredictionservice";

@Component({
    selector: 'ms-baddebtprediction',
    templateUrl:'./baddebtprediction-component.html',
    styleUrls: ['./baddebtprediction-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class BadDebtPredictionComponent implements OnInit {






    // lineChart
    public lineChartData:Array<any> = [
        [23563, 31212,  61163,  10573, 10123, 6876, 25678, 28565, 73235, 69786, 18764, 8544]

    ];

    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    public lineChartType:string = 'line';
    public pieChartType:string = 'pie';

    // Pie
    public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData:number[] = [300, 500, 100];

    public randomizeType():void {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
        this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    }

    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
























      rows = [];
      temp = [];
      columns = [
          { name: 'transactionid' },
        { prop: 'name' },
        { name: 'Company' }

      ];

    stackedAreaChartOptions;
    stackedAreaChartData;
    private badDebtData = null;


      constructor(private pageTitleService: PageTitleService, private badDeptPredictionService: BadDeptPredictionService) {

          this.badDeptPredictionService.getBadDebtPredictionData().subscribe((data) => {





              this.badDebtData = data;


              this.rows  = this.badDebtData[0]['baddebtlist'];
              //this.stackedAreaChartData = this.badDebtData[0]['predictedlos'];
              this.stackedAreaChartData = stackedAreaChartData;




          });
      }

      ngOnInit() {
        this.pageTitleService.setTitle("Bad Debt Predicition");

          this.stackedAreaChartOptions = {
              name: 'Predicted bad debt losses',
          };
      }

      fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/company.json`);

        req.onload = () => {
          cb(JSON.parse(req.response));
        };

        req.send();
      }

      updateFilter(event) {
        const val = event.target.value;

        // filter our data
        const temp = this.temp.filter(function(d) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
      }

}



