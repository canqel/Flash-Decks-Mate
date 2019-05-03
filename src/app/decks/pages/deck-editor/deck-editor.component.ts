import { Component } from '@angular/core';
import { DeckExporterService } from '../../services/deck-exporter.service';
import { MatDialog } from '@angular/material/dialog';
import { DeckExportDialogComponent } from '../../components/deck-export-dialog/deck-export-dialog.component';
import { ShortcutsService, KeyboardShortcut } from 'src/app/core/services/shortcuts.service';
import { DeckService } from '../../state/deck.service';
import { DeckQuery } from '../../state/deck.query';
import { FlashCard } from '../../state/decks.models';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.scss']
})
export class DeckEditorComponent {
  private readonly snackBarConfig: MatSnackBarConfig = {
    duration: 8 * 1000,
    horizontalPosition: 'left'
  };

  constructor(public deckService: DeckService,
    public deckQuery: DeckQuery,
    private deckExporter: DeckExporterService,
    private dialog: MatDialog,
    shortcutsService: ShortcutsService,
    private snackBar: MatSnackBar) {

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

  // tslint:disable-next-line:no-unused
  trackByFn(index: number, item: FlashCard): any {
    return item.id;
  }

  resetDeck(): void {
    this.deckService.reset();
    const snackBarRef = this.snackBar.open('The deck has been reseted.', 'Undo', this.snackBarConfig);
    snackBarRef.onAction().subscribe(() => {
      this.deckService.undo();
    });
  }

  private openExportDialog(output: string): void {
    this.dialog.open(DeckExportDialogComponent, {
      width: '700px',
      data: output
    });
  }
}
