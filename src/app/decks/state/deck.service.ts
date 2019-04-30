import { Injectable } from '@angular/core';
import { FlashCard } from './decks.models';
import { DeckStore } from './deck.store';
import { createCard } from '../services/card.helper';

@Injectable({ providedIn: 'root' })
export class DeckService {
  private cardIdCache = 0;

  constructor(private deckStore: DeckStore) {
  }

  addCard(): void {
    const state = this.deckStore._value();
    const newCard = createCard(this.cardIdCache++, state.side1Lang, state.side2Lang);

    this.deckStore.add(newCard, { prepend: true });
    this.deckStore.setActive(newCard.id);
  }

  updateCard(id: number, newState: FlashCard): void {
    this.deckStore.setActive(id);
    this.deckStore.update(id, newState);
  }

  reset(): void {
    this.deckStore.reset();
  }
}
