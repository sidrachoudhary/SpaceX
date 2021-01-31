import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

   apiURL = environment.baseAPIUrl;

  constructor(
    private http: HttpClient
  ) { }

  getDataOnAppLaunch() : Observable<any> {
    return this.http.get<any>(`${this.apiURL}/launches?limit=100`)
  }
  getYearFilterData(year): Observable<any> {
  return this.http.get<any>(`${this.apiURL}/launches?launch_year=${year}`)
  }
  getLaunchSuccessData(launchSuccess): Observable<any> {
    return this.http.get <any>(`${this.apiURL}/launches?launch_success=${launchSuccess}`)
  }
  getLaunchAndLandData(launchSuccess, landSuccess): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/launches?limit=100&launch_success=${launchSuccess}&land_success=${landSuccess}`)
  }
  getLaunchesLandData(landSuccess): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/launches?land_success=${landSuccess}`);
  }
  getAllFilterAppliedData(launchYear, launchSuccess, landSuccess): Observable<any> {
    return  this.http.get<any>(`${this.apiURL}/launches?limit=100&launch_year=${launchYear}&launch_success=${launchSuccess}&land_success=${landSuccess}`)
  }
}
