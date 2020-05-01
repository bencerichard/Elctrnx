import {Component, OnInit} from '@angular/core';

declare const scrollPlay: any;

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css']
})
export class ScrollComponent implements OnInit {

  constructor() {
  }

  animateScroll(){
    scrollPlay();
  }

  ngOnInit(): void {
    this.animateScroll();
  }

}
