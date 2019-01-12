import { Component, Input, ChangeDetectionStrategy, OnInit, ViewChild, ContentChild, ElementRef, OnDestroy } from '@angular/core';
import { MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { MatMenuTrigger } from '@angular/material/menu';
import { DictionariesService } from '../../services/dictionaries.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { KeyboardShortcut, ShortcutsService } from 'src/app/core/services/shortcuts.service';
import { Subscription } from 'rxjs/internal/Subscription';

class Position {
  x: string;
  y: string;

  constructor(xValue: number, yValue: number) {
    this.x = xValue + 'px';
    this.y = yValue + 'px';
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
  @ViewChild(MatFormField) field: MatFormField;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  contextMenuPosition = new Position(0, 0);

  private showContextMenuShortcut: KeyboardShortcut;
  private subscription: Subscription;

  constructor(private dictionariesService: DictionariesService,
    private shortcutsService: ShortcutsService) {

    const spaceKey = ' ';
    this.showContextMenuShortcut = new KeyboardShortcut(spaceKey, () => this.contextMenu.openMenu(), true);
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
    this.contextMenuPosition = new Position(event.clientX, event.clientY);
    this.contextMenu.openMenu();
  }

  openInDiki(): void {
    const url = this.dictionariesService.generateUrlForDiki(this.fieldControl.value);
    this.open(url);
  }

  openInGoogleTranslate(): void {
    const url = this.dictionariesService.generateUrlForGoogleTranslate(this.fieldControl.value);
    this.open(url);
  }

  private open(url: string): void {
    if (url == null) return;

    window.open(url, '_blank');
  }

  private handleFocusChanged(isFocused: boolean): void {
    this.contextMenuPosition = this.getDefaultPosition(this.field._elementRef);

    if (isFocused) {
      this.shortcutsService.register(this.showContextMenuShortcut);
    } else {
      this.shortcutsService.unregister(this.showContextMenuShortcut);
    }
  }

  private getDefaultPosition(elementRef: ElementRef<any>): Position {
    const rect = elementRef.nativeElement.getBoundingClientRect();

    return new Position(rect.left, rect.bottom - 15);
  }
}
