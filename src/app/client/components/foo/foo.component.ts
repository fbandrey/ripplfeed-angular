import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AuthRequest } from '../../../services/auth-request';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  textToBeVoiced = '';
  redirectUrl = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private snackBar: MdSnackBar,
    private request: AuthRequest
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.textToBeVoiced = params['text'];
      this.redirectUrl = params['url'];
    });
  }

  submit = function () {
    this.request.post('/items', { text: this.textToBeVoiced })
                .subscribe(
                  data => {
                    window.location.href = this.redirectUrl;
                  },
                  error =>  {
                    this.snackBar.open('Something went wrong, try again later!', 'Undo', { duration: 5000 });
                    console.log('===> Error:');
                    console.log(error);
                  }
                );
  }
}
