import { AfterViewInit, Component, HostListener, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { KeyboardShortcut, ShortcutsService } from 'src/app/core/services/shortcuts.service';
import { DeckExportDialogComponent } from '../../components/deck-export-dialog/deck-export-dialog.component';
import { DeckExporterService } from '../../services/deck-exporter.service';
import { DeckQuery } from '../../state/deck.query';
import { DeckService } from '../../state/deck.service';
import { FlashCard } from '../../state/decks.models';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckEditorComponent implements AfterViewInit, OnDestroy {
  stickyFooter = false;

  private readonly snackBarConfig: MatSnackBarConfig = {
    duration: 8 * 1000,
    horizontalPosition: 'left'
  };

  private destroy = new Subject();

  constructor(public deckService: DeckService,
    public deckQuery: DeckQuery,
    private deckExporter: DeckExporterService,
    private dialog: MatDialog,
    shortcutsService: ShortcutsService,
    private snackBar: MatSnackBar) {

    const addCardShortcut = new KeyboardShortcut('i', () => this.deckService.addCard(), true);
    shortcutsService.register(addCardShortcut);

    deckQuery.selectCount()
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.updateFooterStickyState());
  }

  ngAfterViewInit(): void {
    this.updateFooterStickyState();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(): void {
    this.updateFooterStickyState();
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

  private updateFooterStickyState(): void {
    const currentWindowBottomEdgeY = window.pageYOffset + window.innerHeight;
    const documentFullHeight = document.body.scrollHeight;
    const footerBottomMargin = 32;

    this.stickyFooter = (documentFullHeight - footerBottomMargin) > currentWindowBottomEdgeY;
  }

  private openExportDialog(output: string): void {
    this.dialog.open(DeckExportDialogComponent, {
      width: '700px',
      data: output
    });
  }
}
