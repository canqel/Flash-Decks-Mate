import { Injectable } from '@angular/core';
import { FlashCard, Language } from './decks.models';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface DeckState extends EntityState<FlashCard> {
  side1Lang: Language;
  side2Lang: Language;
}

const initialState: DeckState = {
  side1Lang: Language.DE,
  side2Lang: Language.PL
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'deck', resettable: true })
export class DeckStore extends EntityStore<DeckState, FlashCard> {
  constructor() {
    super(initialState);
  }
}
