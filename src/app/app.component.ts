import { Component, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ShortcutsService } from './core/services/shortcuts.service';

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
export class AppComponent implements OnInit {

  private keydownEvents = new Subject<KeyboardEvent>();

  constructor(private shortcutsService: ShortcutsService) {
  }

  ngOnInit(): void {
    this.shortcutsService.setup(this.keydownEvents);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.keydownEvents.next(event);
  }
}
