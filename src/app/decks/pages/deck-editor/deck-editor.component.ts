import { Component } from '@angular/core';
import { DeckExporterService } from '../../services/deck-exporter.service';
import { MatDialog } from '@angular/material/dialog';
import { DeckExportDialogComponent } from '../../components/deck-export-dialog/deck-export-dialog.component';
import { ShortcutsService, KeyboardShortcut } from 'src/app/core/services/shortcuts.service';
import { DeckStore } from '../../services/deck.store';

@Component({
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.scss']
})
export class DeckEditorComponent {

  constructor(public deckStore: DeckStore,
    private deckExporter: DeckExporterService,
    private dialog: MatDialog,
    shortcutsService: ShortcutsService) {

    const addCardShortcut = new KeyboardShortcut('i', () => this.deckStore.addCard(), true);
    shortcutsService.register(addCardShortcut);
  }

  export(): void {
    const output = this.deckExporter.export(this.deckStore.state.cards);
    this.openExportDialog(output);
  }

  private openExportDialog(output: string): void {
    this.dialog.open(DeckExportDialogComponent, {
      width: '700px',
      data: output
    });
  }
}
