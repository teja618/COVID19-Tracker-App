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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.selectedState="All";
    this.getCovidIndianStatesList();
    this.getStateCovidStats();

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
          this.stateData.recovered = item.recovered;
          this.stateData.deaths = item.deaths;
          this.stateData.new = item.delta.confirmed ? item.delta.confirmed : 0;
          //this.stateData.critical = item.cases.critical ? item.cases.critical : 0;
          this.stateData.newDeaths = item.delta.deaths ? item.delta.deaths : 0;
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
          })
        }
      this.stateFlags.isCountryListLoaded = true;
    }, (error) => {
      this.stateFlags.isError = true;
    });
  }

  onChangeState() {
    this.selectedState=="All"?this.getStatsByState("Total"):this.getStatsByState(this.selectedState);    
  }

}
