import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../User.service";
import {first} from "rxjs/operators";
import {Cart} from "../User";

// import {AuthenticationService} from "../authentication.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  returnUrl: string;
  cart: Cart[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    // private authenticationService:AuthenticationService
  ) {
  }

  cancel(): void {
    this.router.navigate(['/log-in'])
  }

  createAccount(): void {
    if (this.registrationData.password.value === this.registrationData.consfirmPassword.value) {
      this.userService.newUser({
        username: this.registrationData.username.value,
        password: this.registrationData.password.value,
        confirmPassword: this.registrationData.confirmPassword.value,
        fullName: this.registrationData.fullName.value,
        emailAddress: this.registrationData.emailAddress.value,
        role: {roleName: 'Client'},
        cart: this.cart,
      }).pipe(first()).subscribe(
        data => this.router.navigate(['/log-in'])
      );
    }
    else{}

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
