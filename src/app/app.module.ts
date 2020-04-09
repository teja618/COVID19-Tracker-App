import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { StateDashboardComponent } from './state-dashboard/state-dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PatientsDashboardComponent } from './patients-dashboard/patients-dashboard.component';
import { RouterLinkRendererComponent } from './router-link-renderer/router-link-renderer.component';



const appRoutes: Routes = [
  { path: 'home', component: DashboardComponent},
  { path: 'indian-states', component: StateDashboardComponent},
  { path:'patients-data/:district/:stateName',component:PatientsDashboardComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StateDashboardComponent,
    PatientsDashboardComponent,
    RouterLinkRendererComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]),
    AlertModule.forRoot()

  ],
  providers: [ApiService],
  entryComponents:[RouterLinkRendererComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
