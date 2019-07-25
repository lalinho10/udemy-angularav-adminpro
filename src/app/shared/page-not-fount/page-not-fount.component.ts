import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-page-not-fount',
  templateUrl: './page-not-fount.component.html',
  styles: []
})

export class PageNotFountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
