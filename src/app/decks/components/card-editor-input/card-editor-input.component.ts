import { Component, Input, ChangeDetectionStrategy, OnInit, ViewChild, ContentChild } from '@angular/core';
import { MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { MatMenuTrigger } from '@angular/material/menu';
import { DictionariesService } from '../../services/dictionaries.service';

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

  constructor(private dictionariesService: DictionariesService) { }

  ngOnInit(): void {
    this.field._control = this.fieldControl;
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.openMenu();
  }

  openInDiki() {
    const url = this.dictionariesService.generateUrlForDiki(this.fieldControl.value);
    this.open(url);
  }

  openInGoogleTranslate() {
    const url = this.dictionariesService.generateUrlForGoogleTranslate(this.fieldControl.value);
    this.open(url);
  }

  private open(url: string) {
    if (url == null) return;

    window.open(url, '_blank');
  }
}
