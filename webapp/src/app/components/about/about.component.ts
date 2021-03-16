import { Component, OnInit } from '@angular/core';
import { InfoService } from './../../services/info.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private infoService: InfoService) { }

  ngOnInit(): void {
  }

  get info() {
    return this.infoService.info;
  }

}
