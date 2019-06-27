import { Component, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ShortcutsService } from './core/services/shortcuts.service';

@Component({
  selector: 'fdm-root',
  template: `
    <div class="mat-display-1 app-header">
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
  onKeydownHandler(event: KeyboardEvent): void {
    this.keydownEvents.next(event);
  }
}
