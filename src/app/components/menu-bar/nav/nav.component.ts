import { Component, OnInit } from '@angular/core';
import { DbBackupService } from 'src/app/services/db-backup.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(public dbbs: DbBackupService) {}

  ngOnInit() {}
}
