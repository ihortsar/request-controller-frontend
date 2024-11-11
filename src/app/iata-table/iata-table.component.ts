import { Component } from '@angular/core';
import { AnaliserService } from '../analiser.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-iata-table',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './iata-table.component.html',
  styleUrl: './iata-table.component.scss'
})
export class IataTableComponent {

  constructor(public analiserService: AnaliserService) {
  }

}
