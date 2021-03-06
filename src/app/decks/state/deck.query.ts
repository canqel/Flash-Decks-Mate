import { QueryEntity } from '@datorama/akita';
import { DeckState, DeckStore } from './deck.store';
import { FlashCard, Language } from './decks.models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DeckQuery extends QueryEntity<DeckState, FlashCard> {
  cards$ = this.selectAll();

  constructor(protected store: DeckStore) {
    super(store);
  }

  getCards(): FlashCard[] {
    return this.getAll();
  }

  getActiveCardId(): number {
    return this.getActiveId();
  }

  getSide1Lang(): Language {
    return this.getValue().side1Lang;
  }

  getSide2Lang(): Language {
    return this.getValue().side2Lang;
  }
}
