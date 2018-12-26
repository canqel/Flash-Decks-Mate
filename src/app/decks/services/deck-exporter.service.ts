import { Injectable } from '@angular/core';
import { FlashCard } from '../decks.models';

@Injectable({
  providedIn: 'root'
})
export class DeckExporterService {

  constructor() { }

  export(cards: FlashCard[]) {
    // TODO
  }
}
