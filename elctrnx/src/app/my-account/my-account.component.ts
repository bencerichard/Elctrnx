import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {UserService} from "../User.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  showModal = false;

  users: User[];
  user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
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
  }


  modalFunction(): void {
    this.showModal = !this.showModal;
  }

  closeModal(): void {
    this.showModal = !this.showModal;
  }
}
