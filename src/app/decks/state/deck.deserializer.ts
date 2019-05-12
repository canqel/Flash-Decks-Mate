import { DeckState } from './deck.store';
import { FlashCardEntry, Language } from './decks.models';

interface State {
  deck: DeckState;
}

export class DeckStateDeserializer {
  static deserialize(data: string): State {
    const state = <State>JSON.parse(data);

    const deck = state.deck;
    for (const loopKey in deck.entities) {
      if (deck.entities.hasOwnProperty(loopKey)) {
        const item = deck.entities[loopKey];

        item.word = DeckStateDeserializer.createCorrectCardEntry(item.word, deck.side1Lang, deck.side2Lang);
        item.example = DeckStateDeserializer.createCorrectCardEntry(item.example, deck.side1Lang, deck.side2Lang);
        item.clarification = DeckStateDeserializer.createCorrectCardEntry(item.clarification, deck.side1Lang, deck.side2Lang);
      }
    }

    return state;
  }

  private static createCorrectCardEntry(shallowEntry: FlashCardEntry, side1Lang: Language, side2Lang: Language): FlashCardEntry {
    const entry = new FlashCardEntry(side1Lang, side2Lang);
    entry.setValues(shallowEntry.side1.value, shallowEntry.side2.value);

    return entry;
  }
}
