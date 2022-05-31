import { Injectable, EventEmitter } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  RequestMethod,
  Request,
  Connection,
  ConnectionBackend
} from '@angular/http';
import { Helpers } from './helpers';
import { environment } from './../../environments/environment';
import { Session } from './session';
import * as Rx from 'rxjs/Rx';

export enum Action { QueryStart, QueryStop };

@Injectable()
export class AuthRequest {
  process: EventEmitter<any> = new EventEmitter<any>();
  authFailed: EventEmitter<any> = new EventEmitter<any>();
  urlPrefix = environment.backEndHost + '/' + environment.version;

  constructor(
    private _http: Http,
    private _session: Session,
    private _helpers: Helpers
  ) {}

  public get(url: string, options?: RequestOptionsArgs): Rx.Observable<Response> {
    return this._request(RequestMethod.Get, this.urlPrefix + url, null, options);
  }

  public post(url: string, body: string, options?: RequestOptionsArgs): Rx.Observable<Response> {
    return this._request(RequestMethod.Post, this.urlPrefix + url, body, options);
  }

  public put(url: string, body: string, options?: RequestOptionsArgs): Rx.Observable<Response> {
    return this._request(RequestMethod.Put, this.urlPrefix + url, body, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Rx.Observable<Response> {
    return this._request(RequestMethod.Delete, this.urlPrefix + url, null, options);
  }

  public patch(url: string, body: string, options?: RequestOptionsArgs): Rx.Observable<Response> {
    return this._request(RequestMethod.Patch, this.urlPrefix + url, body, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Rx.Observable<Response> {
    return this._request(RequestMethod.Head, this.urlPrefix + url, null, options);
  }

  private _request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Rx.Observable<Response> {
    const requestOptions = new RequestOptions(Object.assign({
      method: method,
      url: url,
      body: body
    }, options));

    if (!requestOptions.headers) {
      requestOptions.headers = new Headers();
    }

    requestOptions.headers.set('Authorization', this._session.token())

    return Rx.Observable.create((observer) => {
      this.process.next(Action.QueryStart);
      this._http.request(new Request(requestOptions))
        .map(this._helpers.getData)
        .finally(() => {
        this.process.next(Action.QueryStop);
      })
        .subscribe(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (err) => {
          switch (err.status) {
            case 401:
              // --- Intercept 401
              this.authFailed.next(err);
              observer.error(err);
              break;
            default:
              observer.error(err);
              break;
          }
        })
    })
  }
}
