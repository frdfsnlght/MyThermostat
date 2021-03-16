// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router'

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';

// Local imports
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SidebarButtonComponent } from './components/sidebar-button/sidebar-button.component';

import { LogService } from './services/log.service';
import { WebSocketService } from './services/websocket.service';
import { InfoService } from './services/info.service';
import { StateService } from './services/state.service';
import { SettingsService } from './services/settings.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SettingsComponent,
    ScheduleComponent,
    SidebarButtonComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    SidebarModule,
    DialogModule
  ],
  providers: [
    Title,
    LogService,
    WebSocketService,
    InfoService,
    StateService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
