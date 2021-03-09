import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { LogService } from './../../services/log.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displaySidebar: boolean = false;

  constructor(private titleService: Title, private router: Router, private log: LogService) {
    titleService.setTitle(environment.appName);
  }

  ngOnInit(): void {
    this.log.info(this.titleService.getTitle() + ' starting...');
  }

  getTitle() {
    return this.titleService.getTitle();
  }

  routeTo(url: string) {
    this.displaySidebar = false;
    this.router.navigateByUrl(url);
  }

}
