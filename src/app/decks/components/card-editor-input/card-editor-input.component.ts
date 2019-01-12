import { Component, Input, ChangeDetectionStrategy, OnInit, ViewChild, ContentChild, ElementRef, OnDestroy } from '@angular/core';
import { MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { MatMenuTrigger } from '@angular/material/menu';
import { DictionariesService } from '../../services/dictionaries.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { KeyboardShortcut, ShortcutsService } from 'src/app/core/services/shortcuts.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatInput } from '@angular/material/input';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

class Position {
  x: string;
  y: string;

  constructor(xValue: number, yValue: number) {
    this.x = xValue + 'px';
    this.y = yValue + 'px';
  }
}

class Char {
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
  selector: 'fdm-card-editor-input',
  templateUrl: './card-editor-input.component.html',
  styleUrls: ['./card-editor-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditorInputComponent implements OnInit, OnDestroy {
  @Input() label: string;

  @ContentChild(MatFormFieldControl) fieldControl: MatFormFieldControl<any>;
  @ContentChild(MatInput) input: MatInput;
  @ViewChild(MatFormField) field: MatFormField;
  @ViewChild('contextMenuTrigger') contextMenuTrigger: MatMenuTrigger;
  @ViewChild('germanCharsMenuTrigger') germanCharsMenuTrigger: MatMenuTrigger;

  menuPosition = new Position(0, 0);

  aUmlaut = new Char('ä', 'Ä');
  oUmlaut = new Char('ö', 'Ö');
  uUmlaut = new Char('ü', 'Ü');
  eszett = new Char('ß', 'ẞ');

  private showContextMenuShortcut: KeyboardShortcut;
  private showGermanCharsMenuShortcut: KeyboardShortcut;
  private switchGermanCharsCaseShortcut: KeyboardShortcut;
  private subscription: Subscription;

  constructor(private dictionariesService: DictionariesService,
    private shortcutsService: ShortcutsService) {

    const spaceKey = ' ';
    this.showContextMenuShortcut = new KeyboardShortcut(spaceKey, () => this.contextMenuTrigger.openMenu(), true);
    this.showGermanCharsMenuShortcut = new KeyboardShortcut('q', () => this.germanCharsMenuTrigger.openMenu(), true);
    this.switchGermanCharsCaseShortcut = new KeyboardShortcut('q', () => this.switchGermanCharsCase());
  }

  ngOnInit(): void {
    this.field._control = this.fieldControl;

    const focusedChanges = this.fieldControl.stateChanges
      .pipe(
        map(() => this.fieldControl.focused),
        distinctUntilChanged()
      );

    this.subscription = focusedChanges
      .subscribe(value => this.handleFocusChanged(value));

    const subscription2 = this.germanCharsMenuTrigger.menuOpened
      .subscribe(() => this.shortcutsService.register(this.switchGermanCharsCaseShortcut));
    const subscription3 = this.germanCharsMenuTrigger.menuClosed
      .subscribe(() => this.shortcutsService.unregister(this.switchGermanCharsCaseShortcut));

    this.subscription.add(subscription2);
    this.subscription.add(subscription3);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.menuPosition = new Position(event.clientX, event.clientY);
    this.contextMenuTrigger.openMenu();
  }

  openInDiki(): void {
    const url = this.dictionariesService.generateUrlForDiki(this.fieldControl.value);
    this.open(url);
  }

  openInGoogleTranslate(): void {
    const url = this.dictionariesService.generateUrlForGoogleTranslate(this.fieldControl.value);
    this.open(url);
  }

  addCharacter(character: string): void {
    this.input.value = this.input.value + character;
    this.input.focus();
  }

  private open(url: string): void {
    if (url == null) return;

    window.open(url, '_blank');
  }

  private handleFocusChanged(isFocused: boolean): void {
    this.menuPosition = this.getDefaultPosition(this.field._elementRef);
    const shortcuts = [this.showContextMenuShortcut, this.showGermanCharsMenuShortcut];

    if (isFocused) {
      this.shortcutsService.register(...shortcuts);
    } else {
      this.shortcutsService.unregister(...shortcuts);
    }
  }

  private getDefaultPosition(elementRef: ElementRef<any>): Position {
    const rect = elementRef.nativeElement.getBoundingClientRect();

    return new Position(rect.left, rect.bottom - 15);
  }

  private switchGermanCharsCase(): void {
    this.aUmlaut.switchCase();
    this.oUmlaut.switchCase();
    this.uUmlaut.switchCase();
    this.eszett.switchCase();
  }
}
