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
    icon: 'explore'
  },
    {
        state: 'newprediction',
        name: 'New Prediction',
        type: 'link',
        icon: 'functions'
    },
    {
        state: 'transactions',
        name: 'Transactions',
        type: 'link',
        icon: 'list'
    },
    {
        state: 'predictingoverdues',
        name: 'Overdue Prediction',
        type: 'link',
        icon: 'equalizer'
    },

    {
        state: 'baddebtprediction',
        name: 'Bad Debt Prediction',
        type: 'link',
        icon: 'show_chart'
    },
    {
        state: 'churnprediction',
        name: 'Customer Churn Prediction',
        type: 'link',
        icon: 'arrow_drop_down_circle'
    }





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
