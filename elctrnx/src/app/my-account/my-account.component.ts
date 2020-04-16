import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  showModal = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  modalFunction(): void{
     this.showModal = !this.showModal;
  }

  closeModal():void{
    this.showModal = !this.showModal;
  }
}
