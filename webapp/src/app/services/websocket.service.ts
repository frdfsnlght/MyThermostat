import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { LogService } from './log.service';

const protocol = window.location.protocol.replace('http', 'ws');
const host = window.location.host;
const endpoint = `${protocol}//${host}/stream/connect`;

const reconnectInterval = 2000;


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: WebSocketSubject<any>;
  private listeners = {};
  private connected = false;

  constructor(private log: LogService) { }

  public connect(): void {
    if (! this.socket || this.socket.closed) {
      this.log.debug('ws connecting...');
      this.socket = webSocket(endpoint);
      this.socket.subscribe(
        (v) => { this.handleMessage(v); },
        (e) => { this.handleError(e); },
        () => { this.handleComplete(); }
      );
      this.socket.next({message: 'connect'});
    }
  }

  private reconnect() {
    if (this.connected) {
      this.connected = false;
      this.emit({message: 'disconnected'})
    }
    this.socket.unsubscribe();
    this.socket.complete();
    this.socket = null;
    setTimeout(() => { this.connect(); }, reconnectInterval);
  }

  private handleMessage(obj: any) {
    this.log.debug('ws received', obj);
    if (! ((typeof obj === 'object' && obj !== null))) {
      this.log.error('invalid message');
      return;
    }
    if (! obj.hasOwnProperty('message')) {
      this.log.error('missing message property');
      return;
    }
    this.emit(obj);
  }

  private handleError(e) {
    this.reconnect();
  }

  private handleComplete() {
    this.log.debug('ws closed');
    this.reconnect();
  }

  private emit(msg) {
    let message = msg.message;
    let data = msg.data;
    if (! (message in this.listeners)) {
      //this.log.warn('no listeners for message', msg);
      return;
    }
    if (message === 'connected')
      this.connected = true;
    this.listeners[message].forEach(l => {
      l(data);
    });
  }

  get isConnected() {
    return this.connected;
  }

  on(msg: string, fun: any) {
    let lList: Array<any> = [];
    if (msg in this.listeners)
      lList = this.listeners[msg];
    if (! (fun in lList))
      lList.push(fun);
    this.listeners[msg] = lList;
  }

  send(message: string, data: any = null) {
    let msg = {message: message};
    if (data !== null)
      msg['data'] = data;
    this.socket.next(msg);
    this.log.debug('ws sent', msg);
  }

}
