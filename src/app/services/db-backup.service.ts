import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';
import { dbBackupUrl } from '../../../keys';

@Injectable({
  providedIn: 'root',
})
export class DbBackupService {
  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private spinner: SpinnerService
  ) {}

  async requestDatabaseBackups(): Promise<void> {
    this.spinner.show();
    try {
      await this.http.get(dbBackupUrl).toPromise();
      this.alert.show('Backup email sent successfully.', 'success');
    } catch (error) {
      console.log(error);
      this.alert.show('An error occurred during backup request.', 'danger');
    } finally {
      this.spinner.hide();
    }
  }
}
