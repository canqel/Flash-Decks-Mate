import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckEditorComponent } from './pages/deck-editor/deck-editor.component';
import { DecksRoutingModule } from './decks-routing.module';

@NgModule({
  declarations: [DeckEditorComponent],
  imports: [
    CommonModule,
    DecksRoutingModule
  ],
  entryComponents: [DeckEditorComponent]
})
export class DecksModule { }
