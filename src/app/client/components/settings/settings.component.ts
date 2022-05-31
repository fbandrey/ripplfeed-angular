import { Component, OnInit } from '@angular/core';
import { AuthRequest } from '../../../services/auth-request';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private request: AuthRequest
  ) {}

  ngOnInit() {
    this.request.get('/users/self')
                .subscribe(
                  data => {
                    console.log('Success:');
                    console.log(data);
                  },
                  error =>  {
                    console.log('Error:');
                    console.log(error);
                  }
                );
  }

}
