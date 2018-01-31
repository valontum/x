import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'DASHBOARD',
    type: 'link',
    icon: 'dashboard'
  },
    //{
     //   state: 'newprediction',
     //   name: 'New Prediction',
     //   type: 'link',
    //    icon: 'functions'
   // },
  // {
   // state: 'nlp',
   // name: 'NLP',
   // type: 'link',
    //icon: 'texture'
//},
    {
        state: 'transactions',
        name: 'Subscriptions',
        type: 'link',
        icon: 'list'
    },
    {
        state: 'predictingsubscriptions',
        name: 'Subscription Prediction',
        type: 'link',
        icon: 'equalizer'
    },

   // {
   //     state: 'baddebtprediction',
   //     name: 'Bad Debt Prediction',
   //     type: 'link',
   //     icon: 'show_chart'
   // },
    {
        state: 'churnprediction',
        name: 'Subscription Churn Prediction',
        type: 'link',
        icon: 'arrow_drop_down_circle'
    },

   
      {
        state: 'readerchurn',
       name: 'Reader Churn',
       type: 'link',
       icon: 'trending_down'
    }
 // {  state: 'results',
  // name: 'Results',
  // type: 'link',
  // icon: 'attach_money'
//}





];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
