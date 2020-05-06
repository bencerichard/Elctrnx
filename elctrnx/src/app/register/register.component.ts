import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../User.service";
import {first} from "rxjs/operators";
import {Cart} from "../User";
import {NotifierService} from "angular-notifier";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  returnUrl: string;
  cart: Cart[] = [];
  private readonly notifier: NotifierService;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  cancel(): void {
    this.router.navigate(['/log-in'])
  }

  createAccount(): void {
    if (this.registrationData.password.value === this.registrationData.confirmPassword.value
      && this.registrationData.username.value != '' && this.registrationData.password.value != '') {
      this.userService.newUser({
        username: this.registrationData.username.value,
        password: this.registrationData.password.value,
        confirmPassword: this.registrationData.confirmPassword.value,
        fullName: this.registrationData.fullName.value,
        emailAddress: this.registrationData.emailAddress.value,
        role: {roleName: 'Client'},
        cart: this.cart,
        favorites: []
      }).pipe(first()).subscribe(
        data => {
          this.router.navigate(['/log-in']);
          this.notifier.notify("info", "Account created with success");
        },
        error => {
          if (error.error.message === '1') {
            this.notifier.notify("warning", "Please enter your Full name");
          } else {
            this.notifier.notify("error", "This username is taken");
          }
        }
      );
    } else {
      if (this.registrationData.username.value === '') {
        this.notifier.notify("error", "Enter an username");
      } else {
        if (this.registrationData.password.value === '' || this.registrationData.confirmPassword.value === '') {
          this.notifier.notify("error", "Enter password");
        } else {
          this.notifier.notify("error", "Password doesn't match confirm Password");
        }
      }
    }
  }

  ngOnInit(): void {
    // this.authenticationService.logout();
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get registrationData() {
    return this.registerForm.controls;
  }

}
