import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Helpers } from './helpers';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  constructor(
    private http: Http,
    private helpers: Helpers
  ) {}

  signUp(params) {
    return this.http.post(environment.backEndHost + '/v1/sign_up', params)
                    .map(this.helpers.getData)
                    .catch(this.helpers.getErrors);
  }

  signIn(params) {
    return this.http.post(environment.backEndHost + '/v1/sign_in', params)
                    .map(this.helpers.getData)
                    .catch(this.helpers.getErrors);
  }

}
