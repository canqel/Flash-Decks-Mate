import { Component, OnInit, Output, EventEmitter, ViewChild, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
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
  templateUrl: './german-letters-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GermanLettersMenuComponent implements OnInit, OnDestroy {

  @Input() openMenuRequests: Observable<void>;
  @Output() letterSelected = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  aUmlaut = new Letter('ä', 'Ä');
  oUmlaut = new Letter('ö', 'Ö');
  uUmlaut = new Letter('ü', 'Ü');
  eszett = new Letter('ß', 'ẞ');

  private subscriptions: Subscription;
  private switchCaseShortcut: KeyboardShortcut;

  constructor(private shortcutsService: ShortcutsService) {
  }

  ngOnInit(): void {
    this.subscriptions = this.openMenuRequests.subscribe(() => this.openMenu());

    this.setupSwitchCaseShortcut();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) this.subscriptions.unsubscribe();
  }

  handleMenuClosed(): void {
    this.closed.emit();
  }

  private openMenu(): void {
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
