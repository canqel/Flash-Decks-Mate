import { Component } from '@angular/core';
import { FlashCard, Language } from '../../decks.models';

@Component({
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.scss']
})
export class DeckEditorComponent {

  cards: FlashCard[] = [];

  private side1Lang = Language.DE;
  private side2Lang = Language.PL;

  constructor() { }

  addCard() {
    this.cards.splice(0, 0, new FlashCard(this.side1Lang, this.side2Lang));
  }

  handleCardChange(card: FlashCard, index: number) {
    console.log(index + ': cardChange handled');

    this.cards[index].replaceValues(card);
  }
}
