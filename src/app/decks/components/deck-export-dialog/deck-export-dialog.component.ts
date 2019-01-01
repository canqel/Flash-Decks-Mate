import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fdm-deck-export-dialog',
  templateUrl: './deck-export-dialog.component.html',
  styleUrls: ['./deck-export-dialog.component.scss']
})
export class DeckExportDialogComponent {

  @ViewChild('textArea') textArea: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DeckExportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public output: string) {
  }

  copyToClipboard(): void {
    this.textArea.nativeElement.select();
    document.execCommand("copy");
  }

}
