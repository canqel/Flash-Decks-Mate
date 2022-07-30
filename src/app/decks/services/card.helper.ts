import { Language, FlashCard, FlashCardEntry } from '../state/decks.models';

export function createCard(id: number, side1Lang?: Language, side2Lang?: Language): FlashCard {
  return <FlashCard>{
    id: id,
    word: new FlashCardEntry(side1Lang, side2Lang),
    example: new FlashCardEntry(side1Lang, side2Lang),
    clarification: new FlashCardEntry(side1Lang, side2Lang)
  };
}

export function createCardWithWordEntry(id: number, wordEntry: FlashCardEntry): FlashCard {

  const side1Lang = wordEntry.side1.lang;
  const side2Lang = wordEntry.side2.lang;

  return <FlashCard>{
    id: id,
    word: wordEntry,
    example: new FlashCardEntry(side1Lang, side2Lang),
    clarification: new FlashCardEntry(side1Lang, side2Lang)
  };
}
