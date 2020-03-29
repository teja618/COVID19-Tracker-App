import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { StateDashboardComponent } from './state-dashboard/state-dashboard.component';

const appRoutes: Routes = [
  { path: 'home', component: DashboardComponent},
  {  path: 'indian-states', component: StateDashboardComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StateDashboardComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
