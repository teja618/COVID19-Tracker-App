import { Component, OnInit, Input } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-router-link-renderer',
  template: '<a [routerLink]="[params.inRouterLink, params.value,backToStateName]" >{{params.value}} </a>',
  styleUrls: ['./router-link-renderer.component.css']
})
export class RouterLinkRendererComponent implements AgRendererComponent {

  backToStateName:string;
  constructor(private apiService:ApiService) { 

  }

  ngOnInit() {
    this.backToStateName=this.apiService.backToStateName;
  }

  
  params: any;

  agInit(params: any): void {
    this.params = params;
    console.log("backtostate"+params.inRouterLink)
  }

  refresh(params: any): boolean {
    return false;
  }



}
