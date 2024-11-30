import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnaliserService {


  requestAnaliser: any[] = []
  loadingSubject = new BehaviorSubject<boolean>(false);
  noRequestsFoundSubject = new BehaviorSubject<boolean>(false);
  loading = false
  noRequestsFound = false
  constructor(private http: HttpClient) { }


  async fetchAnalisedRequests(period: string) {
    try {
      const url = './backend/controller.php'  /////prod
/*       const url = 'http://localhost/request_controller/index.php'
 */      const body = {
        time_period: period
      }
      let result = await lastValueFrom(this.http.post<any>(url, body));
      this.noRequestsFoundSubject.next(result.statistics.length === 0);
      return result
    } catch (er) {
      console.log('error:', er);
      return [];
    }
  }


  async setPeriod(period: string) {
    this.loadingSubject.next(true);
    let response = await this.fetchAnalisedRequests(period)
    this.requestAnaliser = response['statistics']
    this.loadingSubject.next(false);
  }


}
