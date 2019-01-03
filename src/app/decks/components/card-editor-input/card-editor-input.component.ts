import { Component, Input, ChangeDetectionStrategy, OnInit, ViewChild, ContentChild } from '@angular/core';
import { MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'fdm-card-editor-input',
  templateUrl: './card-editor-input.component.html',
  styleUrls: ['./card-editor-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditorInputComponent implements OnInit {
  @Input() label: string;

  @ContentChild(MatFormFieldControl) fieldControl: MatFormFieldControl<any>;
  @ViewChild(MatFormField) field: MatFormField;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor() { }

  ngOnInit(): void {
    this.field._control = this.fieldControl;
  }

  onContextMenu(event: MouseEvent, item: string) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': this.fieldControl.value };
    this.contextMenu.openMenu();
  }

  onContextMenuAction1(item: string) {
    console.log(`Click on Action 1 for ${item}`);
  }

  onContextMenuAction2(item: string) {
    console.log(`Click on Action 2 for ${item}`);
  }
}
