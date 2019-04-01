import { isNullOrWhitespace } from '../shared/string-utils';

export class FlashCardEntry {
  side1: LocalizedString;
  side2: LocalizedString;

  constructor(side1Lang: Language, side2Lang: Language) {
    this.side1 = { lang: side1Lang, value: '' };
    this.side2 = { lang: side2Lang, value: '' };
  }

  isEmpty(): boolean {
    return isNullOrWhitespace(this.side1.value) && isNullOrWhitespace(this.side2.value);
  }

  setValues(side1: string, side2: string): void {
    this.side1.value = side1;
    this.side2.value = side2;
  }
}

export class FlashCard {
  id: number;
  word: FlashCardEntry;
  example: FlashCardEntry;
  clarification: FlashCardEntry;

  constructor(id: number, side1Lang: Language, side2Lang: Language) {
    this.id = id;
    this.word = new FlashCardEntry(side1Lang, side2Lang);
    this.example = new FlashCardEntry(side1Lang, side2Lang);
    this.clarification = new FlashCardEntry(side1Lang, side2Lang);
  }

  replaceValues(anotherCard: FlashCard): void {
    this.word = anotherCard.word;
    this.example = anotherCard.example;
    this.clarification = anotherCard.clarification;
  }
}

export class DeckState {
  cards: FlashCard[] = [];
  side1Lang = Language.DE;
  side2Lang = Language.PL;
  activeCardId?: number = null;
}

export interface LocalizedString {
  lang: Language;
  value: string;
}

export enum Language {
  PL = 'PL',
  DE = 'DE'
}
