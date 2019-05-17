import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'itcorpo-fadebox',
  template: `<div class="fade-box" [ngClass]="{'fade-in': fadeIn, 'fade-out': fadeOut}">
  <ng-content></ng-content>
</div>
`,
  styleUrls: ['./fadebox.component.css']
})
export class FadeboxComponent implements OnInit {

  public fadeIn = true
  public fadeOut = false

  constructor() {}

  ngOnInit() {
    // setInterval(() => this.fadeIn = !this.fadeIn, 3000)
    setInterval(() => this.fadeOut = !this.fadeOut, 3000)
  }

}
