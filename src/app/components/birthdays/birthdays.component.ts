import { Component, OnInit } from '@angular/core';
import BirthdaysService from '../../services/birthdays.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss'],
})
export class BirthdaysComponent implements OnInit {
  public isUpcomingOpen = false;

  constructor(public birthdaysService: BirthdaysService) {}

  ngOnInit() {}
}
