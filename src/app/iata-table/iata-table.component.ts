import { Component, OnInit } from '@angular/core';
import { AnaliserService } from '../analiser.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-iata-table',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './iata-table.component.html',
  styleUrl: './iata-table.component.scss'
})
export class IataTableComponent implements OnInit {
  noRequestsSubscription: Subscription | undefined;

  constructor(public analiserService: AnaliserService) {
  }
  ngOnInit(): void {
    this.noRequestsSubscription = this.analiserService.noRequestsFoundSubject.subscribe(data => {
      this.analiserService.noRequestsFound = data;
    });
  }


}
