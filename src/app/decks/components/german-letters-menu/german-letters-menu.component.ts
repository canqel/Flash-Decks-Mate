import { Component, OnInit, Output, EventEmitter, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { Position } from '../../decks.models';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { KeyboardShortcut, ShortcutsService } from 'src/app/core/services/shortcuts.service';

class Letter {
  value = new BehaviorSubject<string>('');
  private isLowercase = true;

  constructor(private lowercase: string, private uppercase: string) {
    this.updateValue();
  }

  switchCase(): void {
    this.isLowercase = !this.isLowercase;
    this.updateValue();
  }

  private updateValue(): void {
    this.value.next(this.isLowercase ? this.lowercase : this.uppercase);
  }
}

@Component({
  selector: 'fdm-german-letters-menu',
  templateUrl: './german-letters-menu.component.html'
})
export class GermanLettersMenuComponent implements OnInit, OnDestroy {

  @Input() openMenuRequests: Observable<Position>;
  @Output() letterSelect = new EventEmitter<string>();

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  menuPosition = new Position(0, 0);
  aUmlaut = new Letter('ä', 'Ä');
  oUmlaut = new Letter('ö', 'Ö');
  uUmlaut = new Letter('ü', 'Ü');
  eszett = new Letter('ß', 'ẞ');

  private subscriptions: Subscription;
  private switchCaseShortcut: KeyboardShortcut;

  constructor(private shortcutsService: ShortcutsService) {
  }

  ngOnInit(): void {
    this.subscriptions = this.openMenuRequests.subscribe(item => this.openMenu(item));

    this.setupSwitchCaseShortcut();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) this.subscriptions.unsubscribe();
  }

  private openMenu(position: Position): void {
    this.menuPosition = position;
    this.menuTrigger.openMenu();
  }

  private setupSwitchCaseShortcut(): void {
    this.switchCaseShortcut = new KeyboardShortcut('q', () => this.switchLettersCase());

    const subscription2 = this.menuTrigger.menuOpened
      .subscribe(() => this.shortcutsService.register(this.switchCaseShortcut));
    const subscription3 = this.menuTrigger.menuClosed
      .subscribe(() => this.shortcutsService.unregister(this.switchCaseShortcut));

    this.subscriptions.add(subscription2);
    this.subscriptions.add(subscription3);
  }

  private switchLettersCase(): void {
    this.aUmlaut.switchCase();
    this.oUmlaut.switchCase();
    this.uUmlaut.switchCase();
    this.eszett.switchCase();
  }
}
