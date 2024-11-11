import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

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
  loading = false

  constructor(private http: HttpClient) { }


  async fetchAnalisedRequests(period: string) {
    try {
      const url = 'http://localhost/request_controller/'
      const body = {
        time_period: period
      }
      return await lastValueFrom(this.http.post<any[]>(url, body));
    } catch (er) {
      console.log('error:', er);
      return [];
    }
  }


  async setPeriod(period: string) {
    if (this.periods[period].length === 0) {
      this.loadingSubject.next(true);
      this.periods[period] = await this.fetchAnalisedRequests(period);
      this.requestAnaliser = this.periods[period];
      this.loadingSubject.next(false);
    } else {
      this.loadingSubject.next(true);
      this.requestAnaliser = this.periods[period];
      setTimeout(() => {
        this.loadingSubject.next(false);
      }, 300);
    }

  }

}
