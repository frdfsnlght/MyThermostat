import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { State } from './../models/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private log: LogService) { }

  
}
