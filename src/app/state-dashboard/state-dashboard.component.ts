import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-state-dashboard',
  templateUrl: './state-dashboard.component.html',
  styleUrls: ['./state-dashboard.component.css']
})

export class StateDashboardComponent implements OnInit {

  selectedState: string;
  stateFlags:any={};

  stateData:any ={
    stateList:[],
    stats:[],
    total:0,
    active: 0,
    recovered: 0,
    deaths: 0,
    new: ''
  }     
  
  statesData:any={
    stats:[]
  }


  //Grid
  columnDefs = [
    { headerName: 'District Name', field: 'district' ,sortable:true, filter:true},
    { headerName: 'Overall Cases', field: 'confirmed', sortable:true, filter:true},
    { headerName: 'New Cases', field: 'delta.confirmed', sortable:true, filter:true}
  ];

rowData = [];

private gridApi;
private gridColumnApi;
overlayLoadingTemplate;
overlayNoRowsTemplate;
domLayout: string;
RowsPresent: boolean=false;



  constructor(private apiService: ApiService) { 
    this.overlayNoRowsTemplate = "<span ag-overlay-loading-center>This is a custom 'no rows' overlay</span>";
    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  }

  ngOnInit() {
    this.selectedState="All";
    this.getCovidIndianStatesList();
    this.getStateCovidStats();
  }

 

   onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDomLayout('autoHeight');    
  }
 
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  getDistrictsData(stateName: string) {
    this.apiService.getDistrictsCovid19Stats().subscribe((response:any)=>{
      this.statesData.stats=response;
      if (this.statesData.stats && this.statesData.stats.length) {
        this.statesData.stats.map((item, index) => {
          if(item.state==stateName){
            this.statesData.stats=item.districtData;
            if(this.statesData.stats.length>0){
              this.RowsPresent=true;
              this.rowData=  this.statesData.stats          
              }
          }
        });
      }
    });
    }

  getStateCovidStats() {
    this.stateFlags.isStatsLoaded = false;
    this.stateFlags.isError = false;
    this.apiService.getIndianStateCovid19Stats().subscribe((response: any) => {
      this.stateData.stats = response && response.statewise.length ? response.statewise : [];
      this.getStatsByState('Total');
      this.stateFlags.isStatsLoaded = true;
    }, (error) => {
      this.stateFlags.isError = true;
    });
  }

  getStatsByState(stateName: string) {
    if (this.stateData.stats && this.stateData.stats.length) {
      this.stateData.stats.map((item, index) => {
        if (item.state.toLowerCase() === stateName.toLowerCase()) {
          console.log(item);
          this.stateData.total = item.confirmed;
          this.stateData.active = item.active;
          this.stateData.recovered = item.deltarecovered;
          this.stateData.deaths = item.deaths;
          this.stateData.new = item.deltaconfirmed ? item.deltaconfirmed : 0;
          //this.stateData.critical = item.cases.critical ? item.cases.critical : 0;
          this.stateData.newDeaths = item.deltadeaths ? item.deltadeaths : 0;
        }
      })
    }
  }
  

  getCovidIndianStatesList() {
    this.stateFlags.isCountryListLoaded = false;
    this.apiService.getIndianStateCovid19Stats().subscribe((response: any) => {
      this.stateData.stats = response && response.statewise.length ? response.statewise : [];
      if (this.stateData.stats && this.stateData.stats.length) {
          this.stateData.stats.map((item, index) => {
            if(item.state!="Total"){
              this.stateData.stateList.push(item.state);
            }
          }
          )
        }
      this.stateData.stateList.sort();
      this.stateFlags.isCountryListLoaded = true;
    }, (error) => {
      this.stateFlags.isError = true;
    });
  }

  onChangeState() {
    this.rowData=[];
    this.RowsPresent=false;
    this.selectedState=="All"?this.getStatsByState("Total"):this.getStatsByState(this.selectedState);  
    this.selectedState=="All"?null :this.getDistrictsData(this.selectedState);
  }

}
