import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { finished } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class AnaliserService {

  periods: any = {
    'DAY': [],
    'WEEK': [],
    'MONTH': [],
    'YEAR': []
  };
  requestAnaliser: any = []
  loadingSubject = new BehaviorSubject<boolean>(false);
  noRequestsFoundSubject = new BehaviorSubject<boolean>(false);
  loading = false
  noRequestsFound = false
  constructor(private http: HttpClient) { }


  async fetchAnalisedRequests(period: string) {
    try {
      const url = 'http://localhost/request_controller/'
      const body = {
        time_period: period
      }
      let result = await lastValueFrom(this.http.post<any[]>(url, body));
      this.noRequestsFoundSubject.next(result.length === 0);
      return result
    } catch (er) {
      console.log('error:', er);
      return [];
    }
  }


  async setPeriod(period: string) {
    if (this.periods[period].length === 0) {
      this.loadingSubject.next(true);
      this.periods[period] = await this.fetchAnalisedRequests(period);
      this.loadingSubject.next(false);
      this.requestAnaliser = this.periods[period];

    } else {
      this.loadingSubject.next(true);
      setTimeout(() => {
        this.requestAnaliser = this.periods[period];
        this.noRequestsFoundSubject.next(this.requestAnaliser.length === 0);
        this.loadingSubject.next(false);
      }, 300);
    }

  }

}
