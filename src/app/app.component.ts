import { Component } from '@angular/core';

@Component({
  selector: 'fdm-root',
  template: `
    <div style="text-align:center">
      <h1>
        Flash Decks Mate
      </h1>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}
