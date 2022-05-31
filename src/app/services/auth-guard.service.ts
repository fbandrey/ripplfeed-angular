import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Session } from './session';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private session: Session
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.session.user()) {
      return true;
    }

    this.session.setPrevUrl(state.url);
    this.router.navigate(['/signin']);
    return false;
  }

}
