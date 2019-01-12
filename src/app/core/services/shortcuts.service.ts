import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export class KeyboardShortcut {
  key: string;
  ctrlKey: boolean;
  action: () => void;

  constructor(key: string, action: () => void, ctrlKey = false) {
    this.key = key;
    this.action = action;
    this.ctrlKey = ctrlKey;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ShortcutsService {
  shortcuts: KeyboardShortcut[] = [];

  setup(keydownEvents: Observable<KeyboardEvent>): void {
    // TODO: destroy subscription.
    keydownEvents.subscribe(event => this.handleKeyDown(event));
  }

  register(shortcut: KeyboardShortcut): void {
    this.shortcuts.push(shortcut);
  }

  unregister(shortcut: KeyboardShortcut): void {
    const index = this.shortcuts.findIndex(item => item === shortcut);
    if (index >= 0) this.shortcuts.splice(index, 1);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const shortcut = this.shortcuts
      .find(item => item.key === event.key && item.ctrlKey === event.ctrlKey);

    if (shortcut) { 
      event.preventDefault();
      event.stopPropagation();
      shortcut.action();
    }
  }
}
