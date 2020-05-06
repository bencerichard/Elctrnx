import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {UserService} from "../User.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../Authentication.service";
import {Observable} from "rxjs";
import {Location} from "@angular/common";
import {first} from "rxjs/operators";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  returnUrl: string;
  id: number;
  userNav: Observable<User> = this.userService.getUserByUsername(localStorage.getItem('username'));
  clientName: string;
  isEditingEnabled = false;
  isAdmin : boolean;
  private readonly notifier: NotifierService;
  users: User[] = [];
  user: User;
  allUsernames : string[];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private notifierService: NotifierService,
              private router: Router,
  ) {
    this.notifier = notifierService;
  }

  prepareClientName() {
    this.userNav.subscribe(user => {
      let userArray = user.fullName.split(" ", 2);
      this.clientName = userArray[1].charAt(0).toUpperCase().concat(userArray[0].charAt(0).toUpperCase())
      this.isAdmin = user.role.roleName === 'Admin';
    } );
  }

  accountEditForm   = new FormGroup({
    username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3)
      ]),
    fullName: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z]+ [A-Z][a-z]+$/)
      ]),
    email: new FormControl('',
      [
      Validators.required,
      Validators
        .pattern(
          /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
    ]),
    address: new FormControl('',
      [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('',
      [
      Validators.required,
        Validators.minLength(3)
      ]),
    confirmPassword: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
      ])
  });

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      }
    )
  }

  getSingleUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getSingleUser(id).subscribe(
      user => {
        this.user = user;
      }
    )
  }

  getUser(username: string): void {
    this.userService.getUserByUsername(username).subscribe(
      user => {
        this.user = user;
      }
    )
  }

  ngOnInit(): void {
    this.authenticationService.isLoggedIn = true;
    this.userService.getUserByUsername(localStorage.getItem('username')).subscribe(data => {
      this.accountEditForm = this.formBuilder.group({
        username: [
          data.username,
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ),
        fullName: new FormControl(data.fullName,
          [
            Validators.required,
            Validators.pattern(/^[A-Z][a-z]+ [A-Z][a-z]+$/)
          ]
        ),
        email: new FormControl(data.emailAddress,
          [
            Validators.required,
            Validators
              .pattern(
                /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
          ]),
        address: new FormControl(data.fullName,
          [
            Validators.required,
            Validators.minLength(4)
          ]),
        password: new FormControl(data.password,
          [
            Validators.required,
            Validators.minLength(3)
          ]),
        passwordConfirm: new FormControl(data.password,
          [
            Validators.required,
            Validators.minLength(3)
          ]),
      });
    });
    this.getUsers();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.prepareClientName();
    this.getUser(localStorage.getItem('username'));

    this.userService.getCustomerHoar(localStorage.getItem('username')).subscribe(
      hoar => {
        this.hoar = hoar
      }
    )
    this.getAllUsernames();
  }

  getAllUsernames(){
    this.userService.getAllUsernames(localStorage.getItem('username')).subscribe(
      usernames => this.allUsernames = usernames
    ) ;

  }

  updateUser(): void {

    let ok=1;

    this.allUsernames.forEach(
      username => {
        if(username === this.editedData.username.value) {
          this.notifier.notify("error", "This username is taken");
          ok = 0;
        }
      }
    );

      if ( ok === 1 && this.editedData.password.value === this.editedData.passwordConfirm.value
      && this.editedData.username.value != '' && this.editedData.password.value != '') {
      this.userService.updateUser(localStorage.getItem('username'),{
        username: this.editedData.username.value,
        password: this.editedData.password.value,
        confirmPassword: this.editedData.passwordConfirm.value,
        fullName: this.editedData.fullName.value,
        emailAddress: this.editedData.email.value,
        role: this.isAdmin === true ? {roleName: 'Admin'} : {roleName: 'Client'},
        cart: [],
        favorites: []
      }).pipe(first()).subscribe(
        data => {
          localStorage.setItem('username',this.editedData.username.value);
          // this.router.navigate(['/products']);
          location.reload();
          this.notifier.notify("info", "Account updated with success");
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
      if (this.editedData.username.value === '' && ok === 1) {
        this.notifier.notify("error", "Enter an username");
      } else {
        if (this.editedData.password.value === '' || this.editedData.passwordConfirm.value === '' && ok === 1) {
          this.notifier.notify("error", "Enter password");
        } else if(ok === 1) {
          this.notifier.notify("error", "Password doesn't match confirm Password");
        }
      }
    }
  }

  get editedData() {
    return this.accountEditForm.controls;
  }

  enableEdit(){
    this.isEditingEnabled = true;
  }

  disableEdit(){
    this.isEditingEnabled = false;
  }

   findInvalidControls(name: string) {
    if (this.accountEditForm.get(name).invalid) {
      return true;
    }
  }

  goBack(): void {
    this.authenticationService.isLoggedIn = true;
    this.location.back();
  }
}











