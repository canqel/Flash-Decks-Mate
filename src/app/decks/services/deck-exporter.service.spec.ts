import { DeckExporterService, DeckExporterConstants } from "./deck-exporter.service";
import { FlashCard, Language } from '../decks.models';

describe('DeckExporterService', () => {
  let service: DeckExporterService;
  beforeEach(() => { service = new DeckExporterService(); });

  it('#export() should return empty string when there are no cards', () => {
    const result1 = service.export(null);
    const result2 = service.export([]);

    expect(result1).toEqual('');
    expect(result2).toEqual('');
  });

  it('#export() should return valid result when there is 1 card, only with word', () => {
    const testCase1 = new TestCase1();
    const result = service.export(testCase1.cards);

    expect(result).toEqual(testCase1.expectedOutput);
  });

  it('#export() should return valid result when there is 1 card', () => {
    const testCase2 = new TestCase2();
    const result = service.export(testCase2.cards);

    expect(result).toEqual(testCase2.expectedOutput);
  });

  // TODO: What about entry with one empty side?

});

// 1 card, only with word
class TestCase1 {
  private readonly wordSide1 = 'Word1 Test';
  private readonly wordSide2 = 'Word2 Test';

  private readonly s = DeckExporterConstants.cardElementSeparator;

  cards = [
    createFlashCard(this.wordSide1, this.wordSide2)
  ];

  expectedOutput = `${this.wordSide1}${this.s}${this.wordSide2}${this.s}`;
}

// 1 card with word, example and clarification
// TODO: inherit
class TestCase2 {
  private readonly wordSide1 = 'Word1 Test';
  private readonly wordSide2 = 'Word2 Test';
  private readonly exampleSide1 = 'example1 Test';
  private readonly exampleSide2 = 'example2 Test';
  private readonly clarificationSide1 = 'clarification1 Test';
  private readonly clarificationSide2 = 'clarification2 Test';

  private readonly s = DeckExporterConstants.cardElementSeparator;

  cards = [
    createFlashCard(this.wordSide1, this.wordSide2, this.exampleSide1, this.exampleSide2,
      this.clarificationSide1, this.clarificationSide2)
  ];

  expectedOutput = `${this.wordSide1}${this.s}${this.wordSide2}${this.s}${this.exampleSide1}${this.s}${this.exampleSide2}${this.s}${this.clarificationSide1}${this.s}${this.clarificationSide2}`;
}

function createFlashCard(word1: string, word2: string,
  example1 = '', example2 = '', clarification1 = '', clarification2 = ''): FlashCard {

  const card = new FlashCard(Language.DE, Language.PL);
  card.word.side1.value = word1;
  card.word.side2.value = word2;
  card.example.side1.value = example1;
  card.example.side2.value = example2;
  card.clarification.side1.value = clarification1;
  card.clarification.side2.value = clarification2;

  return card;
}