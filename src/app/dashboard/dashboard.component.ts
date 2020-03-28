import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  flags: any = {};
  updateFlag: boolean;
  selectedCountry: string;
  data: any = {
    countryList: [],
    stats: [],
    total: 0,
    active: 0,
    recovered: 0,
    deaths: 0,
    new: ''
  };


  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.selectedCountry = "All";
    this.getCovidCountryList();
    this.getCovidStats();
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
