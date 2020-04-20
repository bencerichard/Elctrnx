import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../Authentication.service";
import {first} from "rxjs/operators";
import {debuglog} from "util";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/log-in']);
    }
  }


  ngOnInit(): void {
    this.authenticationService.logout();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get loginData() {
    return this.loginForm.controls;
  }

  log_in(): void {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginData.username.value, this.loginData.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/products']).then();
          this.authenticationService.isLoggedIn = true;
          localStorage.setItem('username', this.loginData.username.value);
        },
        error => {
          this.loading = false;
        });
  }



}
