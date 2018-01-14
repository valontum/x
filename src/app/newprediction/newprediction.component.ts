import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {fadeInAnimation} from "../core/route-animation/route.animation";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
    selector: 'ms-newprediction',
    templateUrl:'./newprediction-component.html',
    styleUrls: ['./newprediction-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class NewPredictionComponent implements OnInit {

      rows = [];
      temp = [];
      columns = [
        { prop: 'name' },
        { name: 'Company' },
        { name: 'Gender' }
      ];
    public form: FormGroup;
      constructor(private pageTitleService: PageTitleService, private fb: FormBuilder) {
        this.fetch((data) => {
          // cache our list
          this.temp = [...data];

          // push our inital complete list
          this.rows = data;
        });
      }

      ngOnInit() {
        this.pageTitleService.setTitle("New Prediction");
          this.form = this.fb.group({
              fname: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
              email: [null, Validators.compose([Validators.required, CustomValidators.email])],
              range: [null, Validators.compose([Validators.required, CustomValidators.range([5, 9])])],
              url: [null, Validators.compose([Validators.required, CustomValidators.url])],
              date: [null, Validators.compose([Validators.required, CustomValidators.date])],
              creditCard: [null, Validators.compose([Validators.required, CustomValidators.creditCard])],
              phone: [null, Validators.compose([Validators.required, CustomValidators.phone('en-US')])],
              gender: [null, Validators.required],
              password: password,
              confirmPassword: confirmPassword
          });
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



