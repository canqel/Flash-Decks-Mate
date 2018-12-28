import { isNullOrWhitespace } from '../shared/string-utils';

export class FlashCard {
  word: FlashCardEntry;
  example: FlashCardEntry;
  clarification: FlashCardEntry;

  constructor(side1Lang: Language, side2Lang: Language) {
    this.word = new FlashCardEntry(side1Lang, side2Lang);
    this.example = new FlashCardEntry(side1Lang, side2Lang);
    this.clarification = new FlashCardEntry(side1Lang, side2Lang);
  }

  replaceValues(anotherCard: FlashCard) {
    this.word = anotherCard.word;
    this.example = anotherCard.example;
    this.clarification = anotherCard.clarification;
  }
}

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
}

export interface LocalizedString {
  lang: Language;
  value: string;
}

export enum Language {
  PL = 'PL',
  DE = 'DE'
}