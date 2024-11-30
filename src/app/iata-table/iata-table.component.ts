import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { AnaliserService } from '../analiser.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-iata-table',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './iata-table.component.html',
  styleUrl: './iata-table.component.scss',
  providers: [DatePipe]
})
export class IataTableComponent implements OnInit {
  noRequestsSubscription: Subscription | undefined;

  constructor(public analiserService: AnaliserService, private datePipe: DatePipe) {
  }


  ngOnInit(): void {
    this.noRequestsSubscription = this.analiserService.noRequestsFoundSubject.subscribe(data => {
      this.analiserService.noRequestsFound = data;
    });
    this.sortMarkedIATAs()
  }


  calculatePercentage(iataRequest: any) {
    let result = Math.round(
      ((iataRequest.requests - iataRequest.prequests) / iataRequest.prequests) * 100
    );
    if (iataRequest.prequests == null) { result = 100 }
    return result
  }


  sortMarkedIATAs() {

    this.analiserService.requestAnaliser.sort((a, b) => {
      const aMarkedOver = this.isMarkedOver(a);
      const bMarkedOver = this.isMarkedOver(b);
      const aMarkedUnder = this.isMarkedUnder(a);
      const bMarkedUnder = this.isMarkedUnder(b);

      if (aMarkedOver && !bMarkedOver) return -1;
      if (!aMarkedOver && bMarkedOver) return 1;

      if (aMarkedUnder && !bMarkedUnder) return -1;
      if (!aMarkedUnder && bMarkedUnder) return 1;

      return 0;
    });
  }
  

  isMarkedOver(iataRequest: any): boolean {
    return (
      this.calculatePercentage(iataRequest) >= 50 &&
      iataRequest.requests - iataRequest.prequests > 50
    );
  }


  isMarkedUnder(iataRequest: any): boolean {
    return (
      this.calculatePercentage(iataRequest) < -50 &&
      iataRequest.prequests - iataRequest.requests > 50
    );
  }


  getFormattedDate(date: string | null): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }
}
