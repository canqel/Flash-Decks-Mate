import { isNullOrWhitespace } from '../../shared/string-utils';

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
}

export enum Language {
  PL = 'PL',
  DE = 'DE'
}

export interface LocalizedString {
  lang: Language;
  value: string;
}
