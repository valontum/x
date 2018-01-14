import * as moment from 'moment';

let today = moment().minutes(0).valueOf();


export const lineChartDemoValues = [
  55,128,155,26,37,136,91,12,7,184,88,107,128,153,59,24,135,26,85,123,161,53,116,134
];

export let lineChartDemoDataGenerator = () => {
  let temp = [
    {
      key: 'Visits',
      values: [ ]
    }
  ];

  lineChartDemoValues.forEach((value, index) => {
    temp[0].values.unshift({
      "date": today - 1000*60*60*24*index,
      "value": value
    });
  });

  return temp;
};


export let pieChartDemoData = [
  {
    "label" : "On Time",
    "value" : 59
  },
  {
    "label" : "Overdues",
    "value" : 41
  }
];



export let churnPredictionBasedOnCompanies = [
    {
        "label" : "BMW",
        "value" : 170
    },
    {
        "label" : "Allianz",
        "value" : 321
    },
    {
        "label" : "Osram",
        "value" : 245
    },
    {
        "label" : "Other",
        "value" : 123
    }
];
