import {Component, OnInit} from '@angular/core';

declare const scrollVideo: any;

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css']
})
export class ScrollComponent implements OnInit {

  constructor() {
  }

  animateScroll(){
    scrollVideo();
  }

  ngOnInit(): void {
    this.animateScroll();
  }

}
