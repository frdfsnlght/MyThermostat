import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private titleService: Title) {
    titleService.setTitle(environment.appName);
  }

}
