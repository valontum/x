import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from '../core/route-animation/route.animation';
import { stackedAreaChartData } from '../data/stackedAreaChart.data';
import {churnPredictionBasedOnCompanies} from '../data/widgetDemoData.data';
import {ChurnPredictionService} from '../services/churnpredictionservices/churnpredictionservice';

@Component({
    selector: 'ms-churnprediction',
    templateUrl:'./churnprediction-component.html',
    styleUrls: ['./churnprediction-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class ChurnPredictionComponent implements OnInit {

      rows = [];
      temp = [];
      columns = [
          { name: 'transactionid' },
        { prop: 'name' },
        { name: 'Company' }

      ];
    pieChartDemoData;
    stackedAreaChartOptions;
    stackedAreaChartData;

    private churnData = null;



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

      constructor(private pageTitleService: PageTitleService, private churnPredictionService: ChurnPredictionService) {

        this.fetch((data) => {
          // cache our list
          this.temp = [...data];

          // push our inital complete list
          this.rows = data;
        });






          this.churnPredictionService.getChurnPredictionData().subscribe((data) => {





              this.churnData = data;

              this.mixedPointChartData = [{
                  data: this.churnData[0]['churnmumberduringmonths'],
                  label: 'Series A',
                  borderWidth: 1,
                  type: 'line',
                  fill: false
              }];



          });




      }

      ngOnInit() {
        this.pageTitleService.setTitle("Bad Debt Predicition");
          this.stackedAreaChartData = stackedAreaChartData;
          this.stackedAreaChartOptions = {
              name: 'Predicted bad debt loss',
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



