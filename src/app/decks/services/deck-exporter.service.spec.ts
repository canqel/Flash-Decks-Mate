import { DeckExporterService, DeckExporterConstants } from './deck-exporter.service';
import { FlashCard, Language } from '../state/decks.models';
import { createCard } from './card.helper';

/* tslint:disable */
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
    executeTestCase(service, new TestCase1());
  });

  it('#export() should return valid result when there is 1 card', () => {
    executeTestCase(service, new TestCase2());
  });

  it('#export() should return valid result when card contains empty value on one side of word, example and clarification', () => {
    executeTestCase(service, new TestCase3());
  });

  it('#export() should return valid result when card contains word and clarification', () => {
    executeTestCase(service, new TestCase4());
  });

  it('#export() should return valid result when card values contain whitespaces', () => {
    executeTestCase(service, new TestCase5());
  });

  it('#export() should return valid result when there are 3 cards', () => {
    executeTestCase(service, new TestCase6());
  });

});

function executeTestCase(service: DeckExporterService, testCase: TestCase): void {
  const result = service.export(testCase.cards);

  expect(result).toEqual(testCase.expectedOutput);
}

interface TestCase {
  cards: FlashCard[];
  expectedOutput: string;
}

// 1 card, only with word
class TestCase1 implements TestCase {
  protected readonly wordSide1 = 'Word1 Test';
  protected readonly wordSide2 = 'Word2 Test';

  protected readonly s = DeckExporterConstants.cardElementSeparator;

  cards = [
    createFlashCard(this.wordSide1, this.wordSide2)
  ];

  expectedOutput = `${this.wordSide1}${this.s}${this.wordSide2}${this.s}${this.s}${this.s}${this.s}${this.s}`;
}

// 1 card with word, example and clarification
class TestCase2 extends TestCase1 {
  protected readonly exampleSide1 = 'example1 Test';
  protected readonly exampleSide2 = 'example2 Test';
  protected readonly clarificationSide1 = 'clarification1 Test';
  protected readonly clarificationSide2 = 'clarification2 Test';

  cards = [
    createFlashCard(this.wordSide1, this.wordSide2, this.exampleSide1, this.exampleSide2,
      this.clarificationSide1, this.clarificationSide2)
  ];

  expectedOutput = `${this.wordSide1}${this.s}${this.wordSide2}${this.s}${this.exampleSide1}${this.s}${this.exampleSide2}${this.s}${this.clarificationSide1}${this.s}${this.clarificationSide2}${this.s}`;
}

// 1 card with empty value on one side of word, example and clarification
class TestCase3 extends TestCase2 {
  cards = [
    createFlashCard(this.wordSide1, '', '', this.exampleSide2, this.clarificationSide1, '')
  ]

  expectedOutput = `${this.wordSide1}${this.s}${this.s}${this.s}${this.exampleSide2}${this.s}${this.clarificationSide1}${this.s}${this.s}`;
}

// 1 card with word and clarification
class TestCase4 extends TestCase2 {
  cards = [
    createFlashCard(this.wordSide1, this.wordSide2, '', '', this.clarificationSide1, this.clarificationSide2)
  ]

  expectedOutput = `${this.wordSide1}${this.s}${this.wordSide2}${this.s}${this.s}${this.s}${this.clarificationSide1}${this.s}${this.clarificationSide2}${this.s}`;
}

// 1 card with whitespaces
class TestCase5 extends TestCase2 {
  cards = [
    createFlashCard(this.wordSide1 + '  ', '  ' + this.wordSide2, '  ', '  ', '     ', ' ')
  ]

  expectedOutput = `${this.wordSide1}${this.s}${this.wordSide2}${this.s}${this.s}${this.s}${this.s}${this.s}`;
}

// 3 cards
class TestCase6 extends TestCase1 {
  private readonly card2Word1 = "Card2Word1";
  private readonly card2Word2 = "Card2Word2";
  private readonly card3Word1 = "Card3Word1";
  private readonly card3Word2 = "Card3Word2";

  private readonly cardSep = DeckExporterConstants.cardSeparator;
  private readonly card1Output = `${this.wordSide1}${this.s}${this.wordSide2}${this.s}${this.s}${this.s}${this.s}${this.s}`;
  private readonly card2Output = `${this.card2Word1}${this.s}${this.card2Word2}${this.s}${this.s}${this.s}${this.s}${this.s}`;
  private readonly card3Output = `${this.card3Word1}${this.s}${this.card3Word2}${this.s}${this.s}${this.s}${this.s}${this.s}`;

  cards = [
    createFlashCard(this.wordSide1, this.wordSide2),
    createFlashCard(this.card2Word1, this.card2Word2),
    createFlashCard(this.card3Word1, this.card3Word2)
  ];

  expectedOutput = `${this.card1Output}${this.cardSep}${this.card2Output}${this.cardSep}${this.card3Output}`;
}

function createFlashCard(word1: string, word2: string,
  example1 = '', example2 = '', clarification1 = '', clarification2 = ''): FlashCard {

  const card = createCard(0, Language.DE, Language.PL);
  card.word.side1.value = word1;
  card.word.side2.value = word2;
  card.example.side1.value = example1;
  card.example.side2.value = example2;
  card.clarification.side1.value = clarification1;
  card.clarification.side2.value = clarification2;

  return card;
}
