import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../service/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isError: boolean;
  body: any;
  subscription: Subscription = new Subscription();
  constructor(private authServices: AuthServices, private router: Router) {}

  ngOnInit(): void {
    this.cleanForm();
    this.isError = false;
  }

  Login() {
    this.body = this.form.value;
    this.authServices.checkLogin(this.body);
    this.subscription.add(
      this.authServices.getResponseLogin().subscribe(
        (response) => {
          this.isError = false;
          localStorage.setItem('token', response.token);
          this.router.navigate(['home']);
        },
        (err) => {
          localStorage.removeItem('token');
          this.isError = true;
        }
      )
    );
    this.subscription.unsubscribe();
  }

  private cleanForm() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
}
