import { NgModule} from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { CalendarModule } from 'angular-calendar';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { QuillModule } from 'ngx-quill';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SortablejsModule, SortablejsOptions} from "angular-sortablejs";
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { CKEditorModule } from 'ng2-ckeditor';
import {ColorPickerModule} from 'ngx-color-picker';
import { MdNativeDateModule } from '@angular/material';
import {Ng2BreadcrumbModule, BreadcrumbService} from 'ng2-breadcrumb/ng2-breadcrumb';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { TreeModule as NgTreeModule } from 'ng2-tree';
import { TreeModule } from 'angular-tree-component';
import { TourMdMenuModule } from 'ngx-tour-md-menu';
import 'hammerjs';

import { GeneAppComponent} from './app.component';
import { RoutingModule } from "./app-routing.module";
import { MainComponent }   from './main/main.component';
import { MenuToggleModule } from './core/menu/menu-toggle.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { PageTitleService } from './core/page-title/page-title.service';
import { D3ChartService } from "./core/nvD3/nvD3.service";
import { nvD3 } from "./core/nvD3/nvD3.component";

import { DashboardComponent } from './dashboard/dashboard-v1/dashboard.component';
import { DashboardOneComponent } from './dashboard/dashboard-v2/dashboard1.component';

import { InboxComponent } from './inbox/inbox.component';
import { MailService } from "./inbox/mail.service";
import { InboxComposeComponent } from './inbox/inbox-compose/inbox-compose.component';


import { MaterialIconComponent}  from './material-icons/icons.component';
import {TransactionsComponent} from './transactions/transactions.component';
import { ChartComponent}  from './chart/ng2-charts/chart.component';
import { EasyPieChartComponent}  from './chart/easy-pie-chart/easy-pie-chart.component';
import {PredictingOverduesComponent} from './predictingoverdues/predictingoverdues.component';

import { LoginComponent } from './session/login/login.component';
import { RegisterComponent } from './session/register/register.component';
import { ForgotPasswordComponent } from './session/forgot-password/forgot-password.component';
import { LockScreenComponent } from './session/lockscreen/lockscreen.component';

import { LineChartComponent } from './widgets/line-chart/line-chart.component';
import { PieChartComponent } from './widgets/pie-chart/pie-chart.component';
import { StackedAreaChartComponent } from './widgets/stacked-area-chart/stacked-area-chart.component';


import {BadDebtPredictionComponent} from './bad debt prediction/baddebtprediction.component';
import {ChurnPredictionComponent} from './churnprediction/churnprediction.component';
import {NewPredictionComponent} from './newprediction/newprediction.component';
import {AuthService} from './services/auth/authservice';
import {AuthGuardService} from './services/auth/authcheck';

import {ChurnPredictionService} from './services/churnpredictionservices/churnpredictionservice';
import {Overduepredictionservice} from './services/overduepredictionservice/overduepredictionservice';
import {BadDeptPredictionService} from './services/baddeptpredictionservice/baddeptpredictionservice';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './services/auth/token.interceptor';
import { ReaderChurnComponent } from 'app/readerchurn/readerchurn.component';
import { ReaderChurnService } from 'app/services/readerchurn/readerchurnservice';
import {TransactionsListService} from './services/transactionslist/transactionslist';
import {ResultsComponent} from './results/results.component';
import {NLPComponent} from './nlp/nlp.component';


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const sortablejsConfig: SortablejsOptions = {
	animation: 300
};

@NgModule({
	imports: [
        HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		Ng2DeviceDetectorModule.forRoot(),
		RoutingModule,
		FlexLayoutModule,
		NgbModalModule.forRoot(),
		CalendarModule.forRoot(),
		Ng2BreadcrumbModule.forRoot(),
		TourMdMenuModule.forRoot(),
		AgmCoreModule.forRoot({apiKey: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk'}),
		QuillModule,
      CKEditorModule,
		DragulaModule,
		SortablejsModule,
		FileUploadModule,
		NgxDatatableModule,
		MdNativeDateModule,
		TreeModule,
		NgTreeModule,
		ChartsModule,
		EasyPieChartModule,
		ColorPickerModule,
		PerfectScrollbarModule.forRoot(perfectScrollbarConfig),
		MenuToggleModule,
		HttpModule,
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [Http]
		}),
	],
	declarations: [
		ResultsComponent,
		GeneAppComponent, 
		MainComponent,
        DashboardComponent,
        DashboardOneComponent,
        InboxComponent,
        InboxComposeComponent,
		NLPComponent,
		PredictingOverduesComponent,
        BadDebtPredictionComponent,
        ChurnPredictionComponent,
        MaterialIconComponent,
		TransactionsComponent,
        ChartComponent,
        NewPredictionComponent,
        EasyPieChartComponent,
		
        ReaderChurnComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        LockScreenComponent,
        LineChartComponent,
		PieChartComponent,
		StackedAreaChartComponent,
		nvD3
		
	],
	entryComponents: [
	
		InboxComposeComponent,
	],
	bootstrap: [GeneAppComponent],
	providers:[
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
		},
		TransactionsListService,
		ReaderChurnService,
        BadDeptPredictionService,
        Overduepredictionservice,
		ChurnPredictionService,
		AuthService,
		AuthGuardService,
		MailService,
		D3ChartService,
		MenuItems,
		BreadcrumbService,
		PageTitleService
	]
})
export class GeneAppModule { }
