import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Helpers {

  constructor() { }

  getData(res: Response) {
    return res.text() ? res.json() : {};
  }

  getErrors (error: Response | any) {
    let errArr: string[];
    if (error instanceof Response) {
      // const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      errArr = error.json().errors;
    } else {
      errArr = error.message ? [error.message] : [error.toString()];
    }
    return Observable.throw(errArr);
  }

}
