import { Injectable } from '@angular/core';
import { DeckState, FlashCard } from '../decks.models';
import { Store } from 'src/app/core/services/store';

@Injectable({
  providedIn: 'root'
})
export class DeckStore extends Store<DeckState> {
  private cardIdCache = 0;

  constructor() {
    super(new DeckState());
  }

  addCard(): void {
    const newCard = new FlashCard(this.cardIdCache++, this.state.side1Lang, this.state.side2Lang);
    const newState = {
      ...this.state,
      cards: [
        newCard,
        ...this.state.cards
      ],
      addedCardId: newCard.id
    };

    this.setState(newState);
  }

  changeCard(newData: FlashCard, cardIndex: number): void {
    this.state.cards[cardIndex].replaceValues(newData);
    this.state.addedCardId = null;

    this.setState(this.state);
  }
}