import { Injectable } from '@angular/core';
import { DeckState, FlashCard } from '../decks.models';
import { Store } from 'src/app/core/services/store';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class DeckStore extends Store<DeckState> {
  cards$: Observable<FlashCard[]>;

  private cardIdCache = 0;

  constructor() {
    super(new DeckState());
    this.cards$ = this.state$.pipe(map(item => item.cards));
  }

  addCard(): void {
    const newCard = new FlashCard(this.cardIdCache++, this.state.side1Lang, this.state.side2Lang);
    const cards = [
      newCard,
      ...this.state.cards
    ];

    this.patchState({ cards: cards, activeCardId: newCard.id });
  }

  changeCard(newData: FlashCard, cardIndex: number): void {
    // It mutates the state directly, but it needs to be done this way, 
    // as the card editor should not be re-rendered.
    this.state.cards[cardIndex].replaceValues(newData);

    this.patchState({ activeCardId: newData.id });
  }
}
