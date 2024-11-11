import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnaliserService } from '../analiser.service';
interface PeriodOfTime {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select-period',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './select-period.component.html',
  styleUrl: './select-period.component.scss'
})
export class SelectPeriodComponent {
  defaultValue = 'DAY'

  constructor(public analiserService: AnaliserService) {
  }

  pof: PeriodOfTime[] = [
    { value: 'DAY', viewValue: 'in letzten 24 Std.' },
    { value: 'WEEK', viewValue: 'in letzter Woche' },
    { value: 'MONTH', viewValue: 'in letztem Monat' },
    { value: 'YEAR', viewValue: 'in letztem Jahr' },
  ];



}
