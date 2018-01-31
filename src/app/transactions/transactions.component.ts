import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from "../core/route-animation/route.animation";
import { TransactionsListService } from 'app/services/transactionslist/transactionslist';

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
        { name: 'gender' }

      ];



      constructor(private pageTitleService: PageTitleService, private transactionsListService: TransactionsListService) {
        this.transactionsListService.getChurnData().subscribe((data) => {





         
          this.rows  = data[0]['list'];
          this.temp  = data[0]['list'];




      });
       
      }

      ngOnInit() {
        this.pageTitleService.setTitle("Subscriptions");
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



