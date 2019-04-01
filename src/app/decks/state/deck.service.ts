import { Injectable } from '@angular/core';
import { FlashCard } from './decks.models';
import { DeckStore } from './deck.store';

@Injectable({ providedIn: 'root' })
export class DeckService {
  private cardIdCache = 0;

  constructor(private deckStore: DeckStore) {
  }

  addCard(): void {
    const state = this.deckStore._value();
    const newCard = new FlashCard(this.cardIdCache++, state.side1Lang, state.side2Lang);

    this.deckStore.add(newCard, { prepend: true });
    this.deckStore.setActive(newCard.id);
  }

  updateCard(id: number, newState: FlashCard): void {
    // deckStore.update() causes problems (id value changes to object).
    this.deckStore.setActive(null);
    // this.deckStore.createOrReplace(id, newState);
    this.deckStore.update(id, newState);
  }
}
