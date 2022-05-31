import { Injectable } from '@angular/core';

@Injectable()
export class Session {
  prevUrl: string;

  constructor() { }

  store(data) {
    localStorage.setItem('ripplUser', JSON.stringify(data));
  }

  clean() {
    localStorage.removeItem('ripplUser');
  }

  user() {
    return JSON.parse(localStorage.getItem('ripplUser'));
  }

  token() {
    const _user = this.user()
    return _user && _user.token;
  }

  setPrevUrl(url) {
    if (url.length > 0) {
      this.prevUrl = url;
    }
  }

  getPrevUrl() {
    return this.prevUrl;
  }

  cleanPrevUrl() {
    this.prevUrl = null;
  }

}
