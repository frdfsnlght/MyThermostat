import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { LogService } from './../../services/log.service';
import { WebSocketService } from './../../services/websocket.service';
import { environment } from '../../../environments/environment';

import { DisconnectedDialog } from './../../dialogs/disconnected-dialog/disconnected-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displaySidenav: boolean = false;

  private disconnectedDialogRef = null;

  constructor(private titleService: Title, private router: Router, private ws: WebSocketService, private log: LogService, private dialog: MatDialog) {
    this.log.info(this.titleService.getTitle() + ' starting...');
    
    titleService.setTitle(environment.appName);
    ws.on('connected', () => { this.hideDisconnectedDialog(); });
    ws.on('disconnected', () => { this.showDisconnectedDialog(); });
    this.showDisconnectedDialog();
    ws.connect();
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  routeTo(url: string): void {
    this.displaySidenav = false;
    this.router.navigateByUrl(url);
  }

  showDisconnectedDialog(): void {
    this.disconnectedDialogRef = this.dialog.open(DisconnectedDialog, { });
  }

  hideDisconnectedDialog(): void {
    if (this.disconnectedDialogRef !== null) {
      this.disconnectedDialogRef.close();
      this.disconnectedDialogRef = null;
    }
  }

}
