import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { WebSocketService } from './websocket.service';
import { State } from './../models/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state: State;

  get state() {
    return this._state;
  }

  constructor(private log: LogService, private ws: WebSocketService) {
    this.ws.on('connected', () => { this.connected(); });
    this.ws.on('disconnected', () => { this.disconnected(); });
    this.ws.on('state', (data) => { this.setState(data); });
    this._state = new State();

    if (this.ws.isConnected)
      this.connected();
  }

  private connected() {
    this.ws.send('getState');
  }

  private disconnected() {
  }

  private setState(data: object) {
    this.log.info('setState', data);
    this._state.deserialize(data);
  }
  
}
