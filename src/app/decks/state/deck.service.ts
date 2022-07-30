import { Injectable } from '@angular/core';
import { FlashCard, FlashCardEntry } from './decks.models';
import { DeckStore } from './deck.store';
import { createCard, createCardWithWordEntry } from '../services/card.helper';
import { DeckQuery } from './deck.query';
import { StateHistoryPlugin } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class DeckService {
  private cardIdCache = 0;
  private deckStateHistory: StateHistoryPlugin;

  constructor(private deckStore: DeckStore, deckQuery: DeckQuery) {
    this.setup(deckQuery);
  }

  addCard(): void {
    const state = this.deckStore._value();
    const newCard = createCard(this.cardIdCache++, state.side1Lang, state.side2Lang);

    this.deckStore.add(newCard, { prepend: true });
    this.deckStore.setActive(newCard.id);
  }

  addCards(entries: FlashCardEntry[]): void {
    const cards = entries.map(entry => createCardWithWordEntry(this.cardIdCache++, entry));

    this.deckStore.add(cards, { prepend: true });
  }

  updateCard(id: number, newState: FlashCard): void {
    this.deckStore.setActive(id);
    this.deckStore.update(id, newState);
  }

  removeCard(id: number): void {
    this.deckStore.remove(id);
  }

  reset(): void {
    this.deckStore.reset();
  }

  undo(): void {
    if (this.deckStateHistory.hasPast === false) return;

    this.deckStateHistory.undo();
  }

  private setup(deckQuery: DeckQuery): void {
    this.deckStateHistory = new StateHistoryPlugin(deckQuery, { maxAge: 1 });

    const state = this.deckStore._value();
    if (state.ids == null || state.ids.length === 0) return;

    const maxId = Math.max(...<number[]>state.ids);
    if (maxId != null) this.cardIdCache = maxId + 1;
  }
}
