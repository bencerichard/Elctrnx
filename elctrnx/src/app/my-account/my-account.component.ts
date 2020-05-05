import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {UserService} from "../User.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../Authentication.service";
import {Observable} from "rxjs";
import {Location} from "@angular/common";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  showModal = false;
  returnUrl: string;
  id: number;
  userNav: Observable<User> = this.userService.getUserByUsername(localStorage.getItem('username'));
  clientName: string;

  prepareClientName() {
    this.userNav.subscribe(user => {
      let userArray = user.fullName.split(" ", 2);
      this.clientName = userArray[1].charAt(0).toUpperCase().concat(userArray[0].charAt(0).toUpperCase())
    });
  }

  accountEditForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  users: User[] = [];
  user: User;
  hoar: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private location: Location) {
  }

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

  newUser(user: User): void {
    this.userService.newUser(user).subscribe();
  }

  updateUser(user: User): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.updateUser(id, user).subscribe();
  }

  deleteUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.deleteUser(id).subscribe();
  }

  ngOnInit(): void {
    this.authenticationService.isLoggedIn = true;
    this.userService.getUserByUsername(localStorage.getItem('username')).subscribe(data => {
      this.accountEditForm = this.formBuilder.group({
        username: [
          data.username,
          Validators.required,
          Validators.minLength(1)
        ],


        fullName: [
          data.fullName,
          Validators.required,
          Validators.minLength(4)
        ],
        email: [
          data.emailAddress,
          Validators.required,
          Validators.minLength(5)
        ],
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
  }


  modalFunction(): void {
    this.showModal = !this.showModal;
  }

  closeModal(): void {
    this.showModal = !this.showModal;
  }

  logout(): void {
    this.authenticationService.logout();
  }

  goBack(): void {
    this.authenticationService.isLoggedIn = true;
    this.location.back();
  }
}











