import { ChangeDetectorRef, Component } from '@angular/core';
import { SelectPeriodComponent } from "../select-period/select-period.component";
import { IataTableComponent } from "../iata-table/iata-table.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnaliserService } from '../analiser.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, SelectPeriodComponent, IataTableComponent, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  loadingSubscription: Subscription | undefined;
  constructor(public analiserService: AnaliserService, private cdr: ChangeDetectorRef) { }


  async ngOnInit() {
    this.loadingSubscription = this.analiserService.loadingSubject.subscribe(data => {
      this.analiserService.loading = data;
    });
    try {
      await this.analiserService.setPeriod('DAY');
    } catch (er) {
      console.log(er);
    }
  }


  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}