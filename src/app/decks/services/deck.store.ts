import { Injectable } from '@angular/core';
import { DeckState, FlashCard } from '../decks.models';
import { Store } from 'src/app/core/services/store';

@Injectable({
  providedIn: 'root'
})
export class DeckStore extends Store<DeckState> {
  constructor() {
    super(new DeckState());
  }

  addCard(): void {
    const newState = {
      ...this.state,
      cards: [
        new FlashCard(this.state.side1Lang, this.state.side2Lang),
        ...this.state.cards
      ]
    };

    this.setState(newState);
  }

  changeCard(newData: FlashCard, cardIndex: number): void {
    this.state.cards[cardIndex].replaceValues(newData);

    this.setState(this.state);
  }
}