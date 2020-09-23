import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  baseUrl = "https://covid19.mathdro.id/api/"
  getGlobalDetails()
  {
    return this.httpClient.get("https://covid19.mathdro.id/api/");
  }

  getData(country:string) {
    return this.httpClient.get(
      `${this.baseUrl}countries/${country}`
    );
  }

  getCountry = () => {
    return this.httpClient.get(
      `${this.baseUrl}countries`
    )
  }

constructor(private httpClient:HttpClient) { }

}
