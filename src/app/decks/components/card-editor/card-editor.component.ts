import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter,
  OnDestroy, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { FlashCard, Language } from '../../decks.models';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { DeckStore } from '../../services/deck.store';

@Component({
  selector: 'fdm-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditorComponent implements OnDestroy, AfterViewInit {

  @Input() set card(newValue: FlashCard) {
    this.initForm(newValue);
  }

  @Input() set index(newValue: number) {
    this.baseTabIndex = newValue * 10;
  }

  @Output() cardChange = new EventEmitter<FlashCard>();

  @ViewChild('firstInput') firstInputRef: ElementRef;
  isInEditMode = true;
  form: FormGroup;
  baseTabIndex: number;
  showExample = false;
  showClarification = false;

  private subscription: Subscription;
  private side1Lang: Language;
  private side2Lang: Language;

  private word1Control: FormControl;
  private word2Control: FormControl;
  private example1Control: FormControl;
  private example2Control: FormControl;
  private clarification1Control: FormControl;
  private clarification2Control: FormControl;
  private cardId: number;

  constructor(private deckStore: DeckStore) {
  }

  ngAfterViewInit(): void {
    if (this.deckStore.state.activeCardId === this.cardId) {
      // TODO: Better solution?
      setTimeout(() => {
        this.firstInputRef.nativeElement.focus();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private initForm(card: FlashCard): void {
    this.cardId = card.id;
    this.word1Control = new FormControl(card.word.side1.value);
    this.word2Control = new FormControl(card.word.side2.value);
    this.example1Control = new FormControl(card.example.side1.value);
    this.example2Control = new FormControl(card.example.side2.value);
    this.clarification1Control = new FormControl(card.example.side1.value);
    this.clarification2Control = new FormControl(card.example.side2.value);

    this.form = new FormGroup({
      word1: this.word1Control,
      word2: this.word2Control,
      example1: this.example1Control,
      example2: this.example2Control,
      clarification1: this.clarification1Control,
      clarification2: this.clarification2Control
    }, { updateOn: 'blur' });

    const subscription = this.form.valueChanges
      .pipe(
        map(() => this.createCard())
      )
      .subscribe(newData => this.cardChange.emit(newData));
    this.subscription = subscription;
  }

  private createCard(): FlashCard {
    const card = new FlashCard(this.cardId, this.side1Lang, this.side2Lang);
    card.word.setValues(this.word1Control.value, this.word2Control.value);
    card.example.setValues(this.example1Control.value, this.example2Control.value);
    card.clarification.setValues(this.clarification1Control.value, this.clarification2Control.value);

    return card;
  }
}
