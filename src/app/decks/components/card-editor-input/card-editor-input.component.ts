import { Component, Input, ChangeDetectionStrategy, OnInit, ViewChild, ContentChild, OnDestroy } from '@angular/core';
import { MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { KeyboardShortcut, ShortcutsService } from 'src/app/core/services/shortcuts.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatInput } from '@angular/material/input';
import { Subject } from 'rxjs/internal/Subject';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fdm-card-editor-input',
  templateUrl: './card-editor-input.component.html',
  styleUrls: ['./card-editor-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditorInputComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() control: FormControl;

  @ContentChild(MatFormFieldControl) fieldControl: MatFormFieldControl<any>;
  @ContentChild(MatInput) input: MatInput;
  @ViewChild(MatFormField) field: MatFormField;

  openGermanLettersMenuRequests = new Subject<void>();
  openContextMenuRequests = new Subject<string>();

  private showContextMenuShortcut: KeyboardShortcut;
  private showGermanLettersMenuShortcut: KeyboardShortcut;
  private subscription: Subscription;

  constructor(private shortcutsService: ShortcutsService) {
    const spaceKey = ' ';
    this.showContextMenuShortcut = new KeyboardShortcut(spaceKey, () => this.showContextMenu(), true);
    this.showGermanLettersMenuShortcut = new KeyboardShortcut('q', () => this.showGermanLettersMenu(), true);
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
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.showContextMenu();
  }

  addCharacter(character: string): void {
    if (!this.control) return;

    const newValue = this.control.value + character;
    this.control.setValue(newValue);
  }

  private handleFocusChanged(isFocused: boolean): void {
    const shortcuts = [this.showContextMenuShortcut, this.showGermanLettersMenuShortcut];

    if (isFocused) {
      this.shortcutsService.register(...shortcuts);
    } else {
      this.shortcutsService.unregister(...shortcuts);
    }
  }

  private showGermanLettersMenu(): void {
    this.openGermanLettersMenuRequests.next();
  }

  private showContextMenu(): void {
    this.openContextMenuRequests.next(this.fieldControl.value);
  }
}
