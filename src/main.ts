import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { persistState, enableAkitaProdMode } from '@datorama/akita';
import { DeckStateDeserializer } from './app/decks/state/deck.deserializer';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

persistState({
  deserialize: DeckStateDeserializer.deserialize
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
