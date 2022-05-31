import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { MdSnackBar } from '@angular/material';
import { Session } from '../../../services/session';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  constructor(
    private router: Router,
    private snackBar: MdSnackBar,
    private session: Session,
    private authService: AuthService
  ) {}

  submit = function (user) {
    this.authService.signUp({ user: user })
                    .subscribe(
                      data => {
                        this.session.store(data.data.attributes);
                        this.router.navigate(['/']);
                        this.snackBar.open('You successfully signed up!', null, { duration: 3000 });
                      },
                      errors =>  {
                        this.snackBar.open(errors.messages, 'Undo', { duration: 5000 });
                      }
                    );
  }

}
