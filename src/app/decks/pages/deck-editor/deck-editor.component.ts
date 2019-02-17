import { Component } from '@angular/core';
import { DeckExporterService } from '../../services/deck-exporter.service';
import { MatDialog } from '@angular/material/dialog';
import { DeckExportDialogComponent } from '../../components/deck-export-dialog/deck-export-dialog.component';
import { ShortcutsService, KeyboardShortcut } from 'src/app/core/services/shortcuts.service';
import { DeckService } from '../../state/deck.service';
import { DeckQuery } from '../../state/deck.query';
import { FlashCard } from '../../state/decks.models';

@Component({
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.scss']
})
export class DeckEditorComponent {

  constructor(public deckService: DeckService,
    public deckQuery: DeckQuery,
    private deckExporter: DeckExporterService,
    private dialog: MatDialog,
    shortcutsService: ShortcutsService) {

    const addCardShortcut = new KeyboardShortcut('i', () => this.deckService.addCard(), true);
    shortcutsService.register(addCardShortcut);
  }

  export(): void {
    const output = this.deckExporter.export(this.deckQuery.getCards());
    this.openExportDialog(output);
  }

  update(card: FlashCard): void {
    this.deckService.updateCard(card.id, card);
  }

  private openExportDialog(output: string): void {
    this.dialog.open(DeckExportDialogComponent, {
      width: '700px',
      data: output
    });
  }
}
