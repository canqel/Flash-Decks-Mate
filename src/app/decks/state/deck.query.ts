import { QueryEntity } from '@datorama/akita';
import { DeckState, DeckStore } from './deck.store';
import { FlashCard } from './decks.models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DeckQuery extends QueryEntity<DeckState, FlashCard> {
  cards$ = this.selectAll();
  cards = this.getAll();
  activeCardId: number = this.getActiveId();

  constructor(protected store: DeckStore) {
    super(store);
  }
}
