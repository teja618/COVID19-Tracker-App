import { Component, OnInit, Input } from '@angular/core';
import {Route,Router, ActivatedRoute, ParamMap} from '@angular/router'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-patients-dashboard',
  templateUrl: './patients-dashboard.component.html',
  styleUrls: ['./patients-dashboard.component.css']
})
export class PatientsDashboardComponent implements OnInit {

  backToStateName:string;
  districtName:any;
  patientsData: any;
  districtArray:any=[];
  
private gridApi;
private gridColumnApi;
overlayLoadingTemplate;
overlayNoRowsTemplate;
domLayout: string;
RowsPresent: boolean=false;

  //Grid
  columnDefs = [
    { headerName: 'Patient ID', field: 'statepatientnumber' ,sortable:true, resizable: true},
    { headerName: 'Information', field: 'notes', sortable:true, resizable: true},

    { headerName: 'Area', field: 'detectedcity', sortable:true, resizable: true},
    { headerName: 'Current Status', field: 'currentstatus', sortable:true, resizable: true}

    /* ,
    { headerName: 'Status Updated Date', field: 'statuschangedate', sortable:true, filter:true},  
    { headerName: 'Current Status', field: 'currentstatus', sortable:true, filter:true}
  
    { headerName: 'Date Found', field: 'dateannounced' ,sortable:true, filter:true},    
    { headerName: 'Gender', field: 'gender', sortable:true, filter:true} */
  ];

rowData = [];

  constructor(private router:Router,route:ActivatedRoute,private apiService: ApiService) { 
    route.paramMap.subscribe((params : ParamMap)=> {  
      this.districtName=params.get('district');  
      this.backToStateName=params.get('stateName');      
    });
  }

  ngOnInit() {
    this.apiService.getPatientsData().subscribe((response1:any)=>{
      this.patientsData=response1;
      this.patientsData.raw_data.map((item)=>{
          if(item.detecteddistrict==this.districtName){
            this.districtArray.push(item);
          }
        })
        if(this.districtArray.length>0){
          this.rowData=this.districtArray;

        }

    }) 
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDomLayout('autoHeight');    
  }
 
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  goBack=()=>{
    this.router.navigate(['../indian-states',{ id: this.backToStateName }]);
  }

}
