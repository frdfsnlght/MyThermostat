import { JsonPipe } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { isString } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  log(...data: any[]) { console.log(...data); }
  info(...data: any[]) { console.info(...data); }
  warn(...data: any[]) { console.warn(...data); }
  error(...data: any[]) { console.error(...data); }
  debug(...data: any[]) { console.debug(...data); }
  dir(...data: any[]) { console.dir(...data); }
  trace(...data: any[]) { console.trace(...data); }

  group(...data: any[]) { console.group(...data); }
  groupCollapsed(...data: any[]) { console.groupCollapsed(...data); }
  groupEnd() { console.groupEnd(); }

  table(data?: any, properties?: string[]) { console.table(data, properties); }

}
