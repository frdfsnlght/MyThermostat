import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogService } from './log.service';
import { Settings } from './../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _settings: Settings;
  settings: Observable<Settings> = null;

  constructor(private log: LogService) { }

  beginEdit() {
    //this.settings = this._settings;
  }

  commitEdit() {
    if (! this.isEditing()) {
      this.log.error('Unable to commit settings because they`re not being edited!');
      return;
    }
    // socket.io call to send the new settings
  }

  cancelEdit() {
    this.settings = null;
  }

  isEditing(): boolean {
    return this.settings != null;
  }

}
