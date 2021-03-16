import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { LogService } from './../../services/log.service';
import { WebSocketService } from './../../services/websocket.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displaySidebar: boolean = false;
  displayDisconnectedDialog: boolean = true;

  constructor(private titleService: Title, private router: Router, private ws: WebSocketService, private log: LogService) {
    this.log.info(this.titleService.getTitle() + ' starting...');
    
    titleService.setTitle(environment.appName);
    ws.on('connected', () => { this.displayDisconnectedDialog = false; });
    ws.on('disconnected', () => { this.displayDisconnectedDialog = true; });
    ws.connect();
  }

  ngOnInit(): void {
  }

  getTitle() {
    return this.titleService.getTitle();
  }

  routeTo(url: string) {
    this.displaySidebar = false;
    this.router.navigateByUrl(url);
  }

}
