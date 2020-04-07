import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {stateData} from '../model/stateData.model';
import { districtModel } from '../model/district.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  flags: any = {};
  stateFlags:any={};
  updateFlag: boolean;
  selectedCountry: string;
  selectedState: string;

  data: any = {
    countryList: [],
    stats: [],
    total: 0,
    active: 0,
    recovered: 0,
    deaths: 0,
    new: ''
  };

stateData:any ={
  stateList:[],
  stats:[],
  total:0,
  active: 0,
  recovered: 0,
  deaths: 0,
  new: ''

}     
 
  stateInfo:stateData[];
  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.selectedCountry = "All";
    this.getCovidCountryList();
    this.getCovidIndianStatesList();
    this.getCovidStats();
    this.getStateCovidStats();
  }

  

  getStateCovidStats() {
    this.stateFlags.isStatsLoaded = false;
    this.stateFlags.isError = false;
    this.apiService.getIndianStateCovid19Stats().subscribe((response: any) => {
      console.log(response.statewise);
      this.stateData.stats = response && response.statewise.length ? response.statewise : [];
      this.stateFlags.isStatsLoaded = true;
    }, (error) => {
      this.stateFlags.isError = true;
    });
  }



  getCovidIndianStatesList() {
    this.stateFlags.isCountryListLoaded = false;
    this.apiService.getIndianStateCovid19Stats().subscribe((response: any) => {
      this.stateData.stats = response && response.statewise.length ? response.statewise : [];
      this.stateData.stateList.push("All")
      if (this.stateData.stats && this.stateData.stats.length) {
          this.stateData.stats.map((item, index) => {
            if(item.state!="Total"){
              this.stateData.stateList.push(item.state);
            }
          })
        }
        console.log('StateList:'+this.stateData.stateList);
      this.stateFlags.isCountryListLoaded = true;
    }, (error) => {
      this.stateFlags.isError = true;
    });
  }



  getCovidCountryList() {
    this.flags.isCountryListLoaded = false;
    this.apiService.getCovid19CountryList().subscribe((response: any) => {
      this.data.countryList = response && response.response.length ? response.response : [];
      this.flags.isCountryListLoaded = true;
    })
  }

  getCovidStats() {
    this.flags.isStatsLoaded = false;
    this.flags.isError = false;
    this.apiService.getCovid19Stats().subscribe((response: any) => {
      this.data.stats = response && response.response && response.response.length ? response.response : [];
      this.getStatsByCountry('All');
      this.flags.isStatsLoaded = true;
    }, (error) => {
      this.flags.isError = true;
    });
  }

  getStatsByCountry(country: string) {
    if (this.data.stats && this.data.stats.length) {
      this.data.stats.map((item, index) => {
        if (item.country.toLowerCase() == country.toLowerCase()) {
          console.log(item);
          this.data.total = item.cases.total;
          this.data.active = item.cases.active;
          this.data.recovered = item.cases.recovered;
          this.data.deaths = item.deaths.total;
          this.data.new = item.cases.new ? item.cases.new : 0;
          this.data.critical = item.cases.critical ? item.cases.critical : 0;
          this.data.newDeaths = item.deaths.new ? item.deaths.new : 0;
        }
      })
    }
  }



  onChangeCountry() {
    this.getStatsByCountry(this.selectedCountry);
  }

}
