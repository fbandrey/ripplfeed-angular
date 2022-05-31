import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { MdSnackBar } from '@angular/material';
import { Session } from '../../../services/session';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  prevUrl = null;

  constructor(
    private router: Router,
    private snackBar: MdSnackBar,
    private session: Session,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.prevUrl = this.session.getPrevUrl();
  }

  submit = function (user) {
    this.authService.signIn({ user: user })
                    .subscribe(
                      data => {
                        this.session.store(data.data.attributes);
                        this.session.cleanPrevUrl();
                        // this.router.navigate([eval(this.prevUrl) || '/']);
                        window.location.href = '/#' + (this.prevUrl || '/');
                        this.snackBar.open('You successfully signed in!', null, { duration: 3000 });
                      },
                      errors =>  {
                        this.snackBar.open(errors.messages, 'Undo', { duration: 5000 });
                      }
                    );
  }

}
