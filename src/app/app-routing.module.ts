import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent }   from './main/main.component';
import { DashboardComponent }  from './dashboard/dashboard-v1/dashboard.component';
import { DashboardOneComponent }  from './dashboard/dashboard-v2/dashboard1.component';
import { InboxComponent }  from './inbox/inbox.component';


import { MaterialIconComponent}  from './material-icons/icons.component';
import { ChartComponent }  from './chart/ng2-charts/chart.component';
import { EasyPieChartComponent }  from './chart/easy-pie-chart/easy-pie-chart.component';

import { LoginComponent }  from './session/login/login.component';
import { RegisterComponent }  from './session/register/register.component';
import { ForgotPasswordComponent }  from './session/forgot-password/forgot-password.component';
import { LockScreenComponent }  from './session/lockscreen/lockscreen.component';

import {TransactionsComponent} from './transactions/transactions.component';
import {PredictingOverduesComponent} from './predictingoverdues/predictingoverdues.component';
import {BadDebtPredictionComponent} from './bad debt prediction/baddebtprediction.component';
import {ChurnPredictionComponent} from './churnprediction/churnprediction.component';
import {NewPredictionComponent} from './newprediction/newprediction.component';
import { AuthGuardService } from './services/auth/authcheck';
import {ReaderChurnComponent} from './readerchurn/readerchurn.component';
import {ResultsComponent} from './results/results.component';
import { NLPComponent } from 'app/nlp/nlp.component';


const appRoutes: Routes = [
	{	
		path: 'login',
		component: LoginComponent,
	},{	
		path: 'session/register',
		component: RegisterComponent,
	},{	
		path: 'session/forgot-password',
		component: ForgotPasswordComponent,
	},{	
		path: 'session/lockscreen',
		component: LockScreenComponent,
	},{
	 	path: '',
	 	component: MainComponent,
        canActivate: [ AuthGuardService ],
	 	children: [



            { path: 'dashboard', component: DashboardOneComponent },
        
			{ path: 'results', component: ResultsComponent },
          
            { path: 'nlp', component: NLPComponent },
            { path: 'transactions', component: TransactionsComponent },
			{ path: 'predictingsubscriptions', component: PredictingOverduesComponent },
			{ path: 'readerchurn', component: ReaderChurnComponent },
            { path: 'newprediction', component: NewPredictionComponent },
            { path: 'baddebtprediction', component: BadDebtPredictionComponent },
            { path: 'churnprediction', component: ChurnPredictionComponent },           			
			{ path: '', component: DashboardOneComponent },
			{ path: 'dashboard1', component: DashboardComponent }
	 	]
  	}
];

@NgModule({
  	imports: [RouterModule.forRoot(appRoutes)],
 	exports: [RouterModule],
  	providers: []
})
export class RoutingModule { }
