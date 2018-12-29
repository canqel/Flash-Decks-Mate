import { Injectable } from '@angular/core';
import { FlashCard, FlashCardEntry } from '../decks.models';

export const DeckExporterConstants = {
  cardElementSeparator: ';'
};

@Injectable({
  providedIn: 'root'
})
export class DeckExporterService {

  constructor() { }

  export(cards: FlashCard[]): string {
    if (!cards || cards.length === 0) return '';

    let result = '';
    cards.forEach(loopCard => {
      result += this.createOutputForCard(loopCard);
    });

    return result;
  }

  private createOutputForCard(card: FlashCard): string {
    const wordEntry = this.createOutputForCardEntry(card.word);
    const exampleEntry = this.createOutputForCardEntry(card.example);
    const clarificationEntry = this.createOutputForCardEntry(card.clarification);

    return `${wordEntry}${exampleEntry}${clarificationEntry}`;
  }

  private createOutputForCardEntry(entry: FlashCardEntry): string {
    const value1 = entry.side1.value.trim();
    const value2 = entry.side2.value.trim();
    const separator = DeckExporterConstants.cardElementSeparator;

    return `${value1}${separator}${value2}${separator}`;
  }
}
