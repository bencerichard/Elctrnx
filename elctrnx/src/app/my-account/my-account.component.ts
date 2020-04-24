import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {UserService} from "../User.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../Product.service";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  showModal = false;
  returnUrl: string;
  id: number;

  accountEditForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required]),
  });


  users: User[] = [];
  user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
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
    debugger;
    this.userService.getUserByUsername(username).subscribe(
      user=>{
        this.user = user;
        debugger;
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
    this.id = +this.route.snapshot.paramMap.get('id');
    this.userService.getSingleUser(this.id).subscribe(data => {
      this.accountEditForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
        email: new FormControl('', [Validators.required]),
      });
    });
    this.getUsers();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.getUser(localStorage.getItem('username'));
    debugger;
  }


  modalFunction(): void {
    this.showModal = !this.showModal;
    debugger;
  }

  closeModal(): void {
    this.showModal = !this.showModal;
  }
}











