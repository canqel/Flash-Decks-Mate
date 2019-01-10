import { Injectable } from '@angular/core';

export class KeyboardShortcut {
  key: string;
  ctrlKey: boolean;
  action: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ShortcutsService {
  shortcuts: KeyboardShortcut[] = [];

  handleKeyDown(event: KeyboardEvent) {
    const shortcut = this.shortcuts
      .find(item => item.key === event.key && item.ctrlKey === event.ctrlKey);

    if (shortcut) shortcut.action();
  }

  registerShortcut(shortcut: KeyboardShortcut) {
    this.shortcuts.push(shortcut);
  }

  unregisterShortcut(shortcut: KeyboardShortcut) {
    const index = this.shortcuts.findIndex(item => item === shortcut);
    if (index >= 0) this.shortcuts.splice(index, 1);
  }
}