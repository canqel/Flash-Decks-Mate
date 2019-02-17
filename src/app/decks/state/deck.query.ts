import { QueryEntity } from '@datorama/akita';
import { DeckState, DeckStore } from './deck.store';
import { FlashCard } from './decks.models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DeckQuery extends QueryEntity<DeckState, FlashCard> {
  cards$ = this.selectAll();

  constructor(protected store: DeckStore) {
    super(store);

    this.cards$.subscribe(item => {
      console.table(item);
    });
  }

  getCards(): FlashCard[] {
    return this.getAll();
  }

  getActiveCardId(): number {
    return this.getActiveId();
  }
}
