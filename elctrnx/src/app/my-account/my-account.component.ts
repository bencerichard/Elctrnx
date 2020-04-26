import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {UserService} from "../User.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../Product.service";
import {AuthenticationService} from "../Authentication.service";
import {ProductsComponent} from "../products/products.component";
import {Observable} from "rxjs";

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

  prepareClientName (){
    this.userNav.subscribe( user => {
      let userArray = user.fullName.split(" ",2);
      this.clientName = userArray[1].charAt(0).toUpperCase().concat(userArray[0].charAt(0).toUpperCase())
    } );
  }

  accountEditForm   = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  users: User[] = [];
  user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              ) {
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
      user=>{
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
    this.userService.getUserByUsername(localStorage.getItem('username')).subscribe(data => {
      this.accountEditForm = new FormGroup({
        username: new FormControl(
          data.username,
          [
            Validators.required,
            Validators.minLength(1)
          ]
        ),

        fullName: new FormControl(data.fullName,
          [
            Validators.required,
            Validators.minLength(4)
          ]
        ),
        email: new FormControl(data.emailAddress,
          [
            Validators.required,
            Validators.minLength(5)
          ]),
      });
    });
    this.getUsers();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.prepareClientName();
    this.getUser(localStorage.getItem('username'));
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
}











