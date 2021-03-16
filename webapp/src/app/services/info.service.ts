import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { WebSocketService } from './websocket.service';
import { Info } from './../models/info';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private _info: Info;

  get info() {
    return this._info;
  }

  constructor(private log: LogService, private ws: WebSocketService) {
    this.ws.on('connected', () => { this.connected(); });
    this.ws.on('disconnected', () => { this.disconnected(); });
    this.ws.on('info', (data) => { this.setInfo(data); });
    this._info = new Info();

    if (this.ws.isConnected)
      this.connected();
  }

  private connected() {
    this.ws.send('getInfo');
  }

  private disconnected() {
  }

  private setInfo(data) {
    this.log.info('setInfo', data);
    this._info.deserialize(data);
  }

}
