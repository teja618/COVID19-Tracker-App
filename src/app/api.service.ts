import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  backToStateName:string;
  baseUrl: string = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/";
  covidGlobalUrl = "https://covid-193.p.rapidapi.com/";
  covidIndiaURL="https://api.covid19india.org/";

  constructor(private http: HttpClient) { }

  getPatientsData(){
    return this.http.get(this.covidIndiaURL+"raw_data.json");
  }

  getDistrictsCovid19Stats(){
    return this.http.get(this.covidIndiaURL+"v2/state_district_wise.json"
    );
  }

  getIndianStateCovid19Stats() {
    return this.http.get(this.covidIndiaURL+"data.json");
  }

  getCovid19Data() {
    return this.http.get(this.baseUrl + 'stats', {
      headers: {
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "13571a8f1emsh5d9a4378d9148b4p16f583jsn1c27fb55ea82"
      }
    });
  }

  getCovid19CountryList() {
    return this.http.get(this.covidGlobalUrl + "countries", {
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "13571a8f1emsh5d9a4378d9148b4p16f583jsn1c27fb55ea82"
      }
    });
  }

   getCovid19Stats() {
    return this.http.get(this.covidGlobalUrl + "statistics", {
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "13571a8f1emsh5d9a4378d9148b4p16f583jsn1c27fb55ea82"
      }
    });
  } 

}
