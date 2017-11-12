import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Materialize from 'materialize-css';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  type: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      type: this.type
    };

    // required fields
    if (!this.validateService.validateRegister(user)) {
      Materialize.toast('Please fill in all the fields!', 4000);
      // this.flashMessage.show('Please fill in all the fields!', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // validate email
    if (!this.validateService.validateEmail(user.email)) {
      Materialize.toast('Please insert a valid email!', 4000);
      // this.flashMessage.show('Please insert a valid email!', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        Materialize.toast('You are now registered. You can Log In now!', 4000);
        // this.flashMessage.show('You are now registered. You can Log In now!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        Materialize.toast('Somethin went wrong!', 4000);
        // this.flashMessage.show('Somethin went wrong!', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
}
