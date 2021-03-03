import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  displaySidebar = false;
  
  constructor(private titleService: Title) { }

  ngOnInit(): void {
  }

  getTitle() {
    return this.titleService.getTitle();
  }

  openMenu() {
    alert('Open menu');
  }
}
