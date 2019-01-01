import { Component } from '@angular/core';
import { FlashCard, Language } from '../../decks.models';
import { DeckExporterService } from '../../services/deck-exporter.service';
import { MatDialog } from '@angular/material/dialog';
import { DeckExportDialogComponent } from '../../components/deck-export-dialog/deck-export-dialog.component';

@Component({
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.scss']
})
export class DeckEditorComponent {

  cards: FlashCard[] = [];

  private side1Lang = Language.DE;
  private side2Lang = Language.PL;

  constructor(private deckExporter: DeckExporterService,
    private dialog: MatDialog) {
    // TMP:
    const card = new FlashCard(this.side1Lang, this.side2Lang);
    card.word.setValues('Word test DE', 'Word test PL');
    this.cards = [card];
  }

  addCard() {
    this.cards.splice(0, 0, new FlashCard(this.side1Lang, this.side2Lang));
  }

  handleCardChange(card: FlashCard, index: number) {
    console.log(index + ': cardChange handled');

    this.cards[index].replaceValues(card);
  }

  export() {
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
