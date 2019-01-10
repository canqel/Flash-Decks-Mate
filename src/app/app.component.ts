import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'fdm-root',
  template: `
    <div class="mat-display-1" style="text-align:center; margin:2rem 0 3rem 0;">
      Flash Decks Mate
    </div>
    <div class="page-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      // Do things
    }
  }
}
