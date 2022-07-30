import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { generateFlashCardEntries } from '../../services/import.helper';
import { DeckQuery } from '../../state/deck.query';
import { DeckService } from '../../state/deck.service';

@Component({
  selector: 'fdm-deck-import-dialog',
  templateUrl: './deck-import-dialog.component.html'
})
export class DeckImportDialogComponent {
  inputData: string;

  constructor(private dialogRef: MatDialogRef<DeckImportDialogComponent>,
    private deckService: DeckService,
    private deckQuery: DeckQuery) { }

  import(): void {
    const flashCards = generateFlashCardEntries(this.inputData,
      this.deckQuery.getSide1Lang(), this.deckQuery.getSide2Lang());

    if (flashCards != null && flashCards.length > 0) {
      this.deckService.addCards(flashCards);
      this.dialogRef.close();
    }
  }
}
