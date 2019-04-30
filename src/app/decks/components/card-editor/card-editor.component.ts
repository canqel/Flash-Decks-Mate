import {
  Component, ChangeDetectionStrategy, Input, Output,
  EventEmitter, OnDestroy, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { FlashCard } from '../../state/decks.models';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { DeckQuery } from '../../state/deck.query';
import { createCard } from '../../services/card.helper';

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

  @Output() cardChanged = new EventEmitter<FlashCard>();

  @ViewChild('firstInput') firstInputRef: ElementRef;
  isInEditMode = true;
  form: FormGroup;
  baseTabIndex: number;
  showExample = false;
  showClarification = false;

  word1Control: FormControl;
  word2Control: FormControl;
  example1Control: FormControl;
  example2Control: FormControl;
  clarification1Control: FormControl;
  clarification2Control: FormControl;

  private cardId: number;
  private subscription: Subscription;

  constructor(private deckQuery: DeckQuery) {
  }

  ngAfterViewInit(): void {
    if (this.deckQuery.getActiveCardId() === this.cardId) {
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
    this.clarification1Control = new FormControl(card.clarification.side1.value);
    this.clarification2Control = new FormControl(card.clarification.side2.value);

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
        map(() => this.cloneCard())
      )
      .subscribe(newData => this.cardChanged.emit(newData));
    this.subscription = subscription;
  }

  private cloneCard(): FlashCard {
    const side1Lang = this.deckQuery.getSide1Lang();
    const side2Lang = this.deckQuery.getSide2Lang();

    const card = createCard(this.cardId, side1Lang, side2Lang);
    card.word.setValues(this.word1Control.value, this.word2Control.value);
    card.example.setValues(this.example1Control.value, this.example2Control.value);
    card.clarification.setValues(this.clarification1Control.value, this.clarification2Control.value);

    return card;
  }
}
