// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout';

// Material imports

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// Component imports
import { AppComponent } from './components/app/app.component';
import { IconComponent } from './components/icon/icon.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DisconnectedDialog } from './dialogs/disconnected-dialog/disconnected-dialog.component';

// Service imports
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
    IconComponent,
    HomeComponent,
    AboutComponent,
    SettingsComponent,
    ScheduleComponent,
    DisconnectedDialog

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatProgressSpinnerModule
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
