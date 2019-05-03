import { Injectable } from '@angular/core';
import { FlashCard } from './decks.models';
import { DeckStore } from './deck.store';
import { createCard } from '../services/card.helper';
import { DeckQuery } from './deck.query';
import { StateHistoryPlugin } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class DeckService {
  private cardIdCache = 0;
  private deckStateHistory: StateHistoryPlugin;

  constructor(private deckStore: DeckStore, deckQuery: DeckQuery) {
    this.deckStateHistory = new StateHistoryPlugin(deckQuery, { maxAge: 1 });
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

  undo(): void {
    if (this.deckStateHistory.hasPast === false) return;

    this.deckStateHistory.undo();
  }
}
