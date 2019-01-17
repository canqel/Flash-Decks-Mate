import { Component } from '@angular/core';
import { FlashCard, Language } from '../../decks.models';
import { DeckExporterService } from '../../services/deck-exporter.service';
import { MatDialog } from '@angular/material/dialog';
import { DeckExportDialogComponent } from '../../components/deck-export-dialog/deck-export-dialog.component';
import { ShortcutsService, KeyboardShortcut } from 'src/app/core/services/shortcuts.service';

@Component({
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.scss']
})
export class DeckEditorComponent {

  cards: FlashCard[] = [];

  private side1Lang = Language.DE;
  private side2Lang = Language.PL;

  constructor(private deckExporter: DeckExporterService,
    private dialog: MatDialog,
    shortcutsService: ShortcutsService) {
    // TMP:
    const card = new FlashCard(this.side1Lang, this.side2Lang);
    card.word.setValues('Word test DE', 'Word test PL');
    this.cards = [card];

    const addCardShortcut = new KeyboardShortcut('i', () => this.addCard(), true);
    shortcutsService.register(addCardShortcut);
  }

  addCard(): void {
    this.cards.splice(0, 0, new FlashCard(this.side1Lang, this.side2Lang));
  }

  handleCardChange(card: FlashCard, index: number): void {
    this.cards[index].replaceValues(card);
  }

  export(): void {
    const output = this.deckExporter.export(this.cards);
    this.openExportDialog(output);
  }

  private openExportDialog(output: string): void {
    this.dialog.open(DeckExportDialogComponent, {
      width: '700px',
      data: output
    });
  }
}
