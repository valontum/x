import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from "../core/route-animation/route.animation";

@Component({
    selector: 'ms-transactions',
    templateUrl:'./transactions-component.html',
    styleUrls: ['./transactions-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class TransactionsComponent implements OnInit {

      rows = [];
      temp = [];
      columns = [
          { name: 'transactionid' },
        { prop: 'name' },
        { name: 'Company' }

      ];

      constructor(private pageTitleService: PageTitleService) {
        this.fetch((data) => {
          // cache our list
          this.temp = [...data];

          // push our inital complete list
          this.rows = data;
        });
      }

      ngOnInit() {
        this.pageTitleService.setTitle("Transactions");
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



